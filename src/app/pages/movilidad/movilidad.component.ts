import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ModalidadService } from '@app/services/modalidad.service';


@Component({
  selector: 'app-movilidad',
  templateUrl: './movilidad.component.html',
  styleUrls: ['./movilidad.component.css']
})
export class MovilidadComponent implements OnInit {
  id!: any;

  data!: any[];
  displayedColumns: string[] = ['tipo_mov', 'clase_mov', 'facultad','programa','fecha','semestre'];
  
  dataSource!: any;
 

  constructor(private route:ActivatedRoute, private movilidadSvc:ModalidadService){
   
  }

   currencyFormatter(currency: any, value: number | bigint) {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency
    }) 
    return formatter.format(value)
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
      this.movilidadSvc.getMovilidadById(this.id).subscribe(res=>{
      this.data = res;


      const fecha1 = new Date(this.data[0].anio_mov).toLocaleDateString('es-CO', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
      this.data[0].anio_mov = fecha1;

      const fecha2 = new Date(this.data[0].actor.fecha_expedicion).toLocaleDateString('es-CO', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
      this.data[0].actor.fecha_expedicion = fecha2;

      const fecha3 = new Date(this.data[0].actor.fecha_nac).toLocaleDateString('es-CO', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
      this.data[0].actor.fecha_nac = fecha3;

      this.dataSource = new MatTableDataSource<any>(this.data);

      let valor_fin_nacio = this.currencyFormatter("COP",this.data[0].valor_fin_nacional);
      this.data[0].valor_fin_nacional = valor_fin_nacio;

       valor_fin_nacio = this.currencyFormatter("COP",this.data[0].valor_fin_internacional);
      this.data[0].valor_fin_internacional = valor_fin_nacio;
     
     
    })
  }

  

}
