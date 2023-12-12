
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BackgroundService } from '@app/services/background.service';
import { ExporterAllService } from '@app/services/exporter-all.service';
import { ExporterService } from '@app/services/exporter.service';
import { ModalidadService } from '@app/services/modalidad.service';

@Component({
  selector: 'app-ver-todas',
  templateUrl: './ver-todas.component.html',
  styleUrls: ['./ver-todas.component.css']
})
export class VerTodasComponent {
  ELEMENT_DATA!: any[];
  
  clickedRows = new Set<any>();
  movilidades: any;
  displayedColumns: string[] = ['id', 'tipo_mov', 'clase_mov', 'codigo_estudiante','actor','opciones'];
  dataSource:any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 classIs: boolean | undefined;

  constructor(private backSvc:BackgroundService, private modalidadSvc:ModalidadService, private router:Router, private expSvc:ExporterService, private expASvc:ExporterAllService){
    
  }

  ngOnInit(): void {
    
    this.classIs=this.backSvc.getIsActiveClase();
   this.modalidadSvc.getAllMovilidad().subscribe((data) => {
    this.ELEMENT_DATA = data;
    
  this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  this.dataSource.paginator = this.paginator;
  })

  }

  ngAfterViewInit(): void {
    
  }

  
navigateTo(value: any){
this.router.navigateByUrl(`movilidad/${value}`);
}

downloadAll(){
  let dataActor:any[];
  let dataTemp;
  let arrayData: any[];

  this.modalidadSvc.getAllMovilidad().subscribe(res=>{
  // this.expSvc.exportToExcel(res[0],"reporte");
  dataTemp = res;
  console.log(dataTemp[0]);
   this.expASvc.exportToExcel(dataTemp, "movilidades");
  })
}

download(id:any){
   let dataActor:any[];
   let dataTemp;
   let arrayData: any[];

   this.modalidadSvc.getMovilidadById(id).subscribe(res=>{
   // this.expSvc.exportToExcel(res[0],"reporte");
   dataTemp = res[0];
    

    for (var clave in res[0]){
      // eliminando actor
      if (res[0].hasOwnProperty(clave)) {
        if(clave=="actor"){
      dataActor= res[0].actor;
      delete res[0].actor
        break;
        }
        
      }
    }
    arrayData = res[0];
    console.log("data"+dataActor);
    this.expSvc.exportToExcel(dataActor, arrayData, "movilidad-"+res[0].codigo_actor);
   })
}

applyFilter(event: any){
let valor = event.value;
  this.dataSource.filter = valor.trim().toLowerCase();
}
}
