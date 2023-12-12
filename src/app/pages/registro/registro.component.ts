import { AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FacultadResponse } from '@app/models/facultad.interface';
import { CountryService } from '@app/services/country.service';
import { FacultadService } from '@app/services/facultad.service';
import Swal from 'sweetalert2';
import * as intlTelInput from 'intl-tel-input';
import { DatePipe } from '@angular/common';
import { ModalidadService } from '@app/services/modalidad.service';
import { ActorService } from '@app/services/actor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, AfterViewInit {
  private isValidEmail = /\S+@\S+\.\S+/;
  private isValidNumber = /^\d+$/;
  disabled = true;
  convenioDisabled = true;
  selected = 'Colombia';

  programasUni: FacultadResponse[] = [];
  codigos: any[] = [];
  paises: any[] = [];
  inputElement: any;
  actorForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    codigo: [115, [Validators.required, Validators.pattern(this.isValidNumber)]],
    nombres: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    tipo_doc: ['', [Validators.required]],
    numero_doc: ['', [Validators.required, Validators.pattern(this.isValidNumber)]],
    expedido_en: ['', [Validators.required]],
    email_inst: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    fecha_expedicion: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    est_civil:['', [Validators.required]],
    fecha_nac: ['', [Validators.required]],
    pais_nac:['', [Validators.required]],
    departamento:['', [Validators.required]],
    municipio:['', [Validators.required]],
    celular: ['', [Validators.required]],
    
  })

  movilidadForm = this.fb.group({
    tipo_mov: ['', [Validators.required]],
    clase_mov: ['', [Validators.required]],
    facultad: ['', [Validators.required]],
    programa: ['', [Validators.required]],
    anio_mov:['', [Validators.required]],
    semestre_mov: ['', [Validators.required]],
    actividad_mov: [''],
    descrip_act_mov: ['', [Validators.required]],
    otroActividad: [''],
    inst_origen:['', [Validators.required]],
    direccion_origen:['', [Validators.required]],
    pais_origen:['', [Validators.required]],
    depart_origen: ['', [Validators.required]],
    municipio_origen:['', [Validators.required]],
    inst_destino:['', [Validators.required]],
    direccion_destino:['', [Validators.required]],
    pais_destino:['', [Validators.required]],
    depart_destino:['', [Validators.required]],
    municipio_destino:['', [Validators.required]],
    numero_dias_mov:[0, [Validators.required]],
    mov_convenio:[''],
    fuent_fin_nacional:['', [Validators.required]],
    valor_fin_nacional: ['', [Validators.required]],
    fuent_fin_internacional:['', [Validators.required]],
    pais_fin_internacional:['', [Validators.required]],
    valor_fin_internacional:['', [Validators.required]],
    codigo_actor:[0],
    rol: ['', [Validators.required]],
    numero_convenio_mov: [''],
    
  })
  myDatepipe!: DatePipe;

  constructor(private fb: FormBuilder, private renderer2: Renderer2, private facSvc: FacultadService, private coSvc: CountryService, private actSvc: ActorService, private movSvc: ModalidadService) {
    this.myDatepipe = new DatePipe("es-CO");
  }


  ngAfterViewInit(): void {

  }


  ngOnInit(): void {

  

     const input = document.getElementById("phone")

    if (input) {

    this.inputElement =  intlTelInput(input, {
        initialCountry: 'CO',
        separateDialCode: true,
        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
        autoPlaceholder: 'polite',
        autoInsertDialCode:true
      });
    }


    this.coSvc.getPaises().subscribe((dataPaises) => {


      let claves = Object.keys(dataPaises);
      for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];

        this.paises.push(dataPaises[clave]);

      }

      this.paises.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    })

  }


  mostrarOtro(value: any) {
    if (value == "Otro" && this.disabled == true) {
      this.disabled = false;
    } else { this.disabled = true; }



  }


  mostrarInputConvenio(value: any) {
    if (value == 1 && this.convenioDisabled == true) {
      this.convenioDisabled = false;
    } else { this.convenioDisabled = true; }


  }


  onSubmit(): void {
    const fecha_exp = this.myDatepipe.transform(this.actorForm.value.fecha_expedicion, 'yyyy-MM-dd');
    const fecha_nac = this.myDatepipe.transform(this.actorForm.value.fecha_nac, 'yyyy-MM-dd');
    let codigoString:any = this.actorForm.value.codigo;
    this.actorForm.value.codigo = parseInt(codigoString);
    let numero_dias:any = this.movilidadForm.value.numero_dias_mov;
   // let valor_financiacion_nac = this.movilidadForm.value.valor_fin_nacional;
   // let valor_financiacion_internac = this.movilidadForm.value.valor_fin_internacional;
    this.movilidadForm.value.numero_dias_mov = parseInt(numero_dias);





    if (this.actorForm.invalid || this.movilidadForm.invalid ) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Formulario invalido',
        text: 'Uno o mas campos no son correctos!'
      })

      return;
    } else {

      let countryData =   this.inputElement.getSelectedCountryData();
      let celular = "+"+countryData.dialCode+this.actorForm.value.celular;

      if(this.movilidadForm.value.mov_convenio==''||this.movilidadForm.value.mov_convenio==null){
        this.movilidadForm.value.mov_convenio="N/A";
        this.movilidadForm.value.numero_convenio_mov="N/A";
      }
  
      if(this.movilidadForm.value.actividad_mov=='Otro'){
        this.movilidadForm.value.actividad_mov=this.movilidadForm.value.otroActividad;
      }

      this.actorForm.value.celular = celular;
      
      this.movilidadForm.value.codigo_actor=this.actorForm.value.codigo;
      const actorFormValue = this.actorForm.value;

      const movFormValue = this.movilidadForm.value;

      console.log(actorFormValue);
      console.log(movFormValue);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

         this.actSvc.registrar(actorFormValue).subscribe({ error:(error)=>{
          return;
         },complete:()=>{
          
          this.movSvc.registrar(movFormValue).subscribe(res=>{
            if(res){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
               Toast.fire({
                icon: 'success',
                title: 'Exito al Guardar',
                text:'Se guardo el estudiante y su movilidad'
              })

              this.actorForm.reset();
              this.movilidadForm.reset();
              this.actorForm.clearValidators();
              this.movilidadForm.clearValidators();
              this.actorForm.untouched;
              this.movilidadForm.untouched;
            }else{
              return;
            }
    
        });


         } });

    }
  }


  listar(facultad: any) {
    let idInt=0;
if(facultad=="Ciencias Agrarias y del Ambiente"){
  idInt = 1;
}

if(facultad=="Ciencias Básicas"){
  idInt = 2;
}


if(facultad=="Ciencias Empresariales"){
 idInt = 3;
}

if(facultad=="Ciencias de la Salud"){
  idInt = 4;
}

if(facultad=="Educación, Artes y Humanidades"){
  idInt = 5;
}

if(facultad=="Ingenieria"){
  idInt = 6;
}

   
    this.facSvc.getProgramasByFacultadId(idInt).subscribe((data) => {

      try {
        this.programasUni.length = 0;
      } catch (error) {

      }


      for (let programa of data[0].programas) {
        this.programasUni.push(programa);
      }

    })

  }

  listarCodigos() {


    this.coSvc.getCodigos().subscribe((data) => {


      for (let codes of data) {
        this.codigos.push(codes);
        console.log(codes);
      }

    })
  }

  applyFilter(event: any){
    let dataTemp;
    
    this.actSvc.getActorById(event.value).subscribe(res=>{
      dataTemp= res;  

      

      const nombre = document.getElementById('nombre') as HTMLInputElement;
      nombre.value = dataTemp[0].nombres;
      console.log(dataTemp[0].nombres);
      
      const apellido = document.getElementById('apellido') as HTMLInputElement;
      apellido.value = dataTemp[0].apellidos;
      console.log(dataTemp[0].apellidos);
      
      const cod = document.getElementById('cod') as HTMLInputElement;
      cod.value = dataTemp[0].codigo;
      console.log(dataTemp[0].codigo);
      
      const email = document.getElementById('email') as HTMLInputElement;
      email.value = dataTemp[0].email;
      console.log(dataTemp[0].email);
      
      const email_inst = document.getElementById('email_inst') as HTMLInputElement;
      email_inst.value = dataTemp[0].email_inst;
      console.log(dataTemp[0].email_inst);
      
      const tipo_doc = document.getElementById('tipo_doc') as HTMLInputElement;
      tipo_doc.value = 'C.C. - Cédula De Ciudadanía';
      console.log(dataTemp[0].tipo_doc);
      
      const documento = document.getElementById('documento') as HTMLInputElement;
      documento.value = dataTemp[0].numero_doc;
      console.log(dataTemp[0].numero_doc);
      
      const expedido = document.getElementById('expedido') as HTMLInputElement;
      expedido.value = dataTemp[0].expedido_en;
      console.log(dataTemp[0].expedido_en);
      
      const fecha_exp = document.getElementById('fecha_expedicion') as HTMLInputElement;
      fecha_exp.value = dataTemp[0].fecha_expedicion;
      console.log(dataTemp[0].fecha_expedicion);
      
      const sex = document.getElementById('sexo') as HTMLInputElement;
      sex.value = dataTemp[0].sexo;
      console.log(dataTemp[0].sexo);
      
      const est_civil = document.getElementById('est_civil') as HTMLInputElement;
      est_civil.value = dataTemp[0].est_civil;
      console.log(dataTemp[0].est_civil);
      
      const fecha_nac = document.getElementById('fecha_nac') as HTMLInputElement;
      fecha_nac.value = dataTemp[0].fecha_nac;
      console.log(dataTemp[0].fecha_nac);
      
      const pais_nac = document.getElementById('pais_nac') as HTMLInputElement;
      pais_nac.value = dataTemp[0].pais_nac;
      console.log(dataTemp[0].pais_nac);
      
      const departamento = document.getElementById('departamento') as HTMLInputElement;
      departamento.value = dataTemp[0].departamento;
      console.log(dataTemp[0].departamento);
      
      const municipio = document.getElementById('municipio') as HTMLInputElement;
      municipio.value = dataTemp[0].municipio;
      console.log(dataTemp[0].municipio);
      
      const celular = document.getElementById('phone') as HTMLInputElement;
      celular.value = dataTemp[0].celular;
      console.log(dataTemp[0].celular);
    })
  }

  handleError(err: any): any {
    console.log(console.log(err));

  }
}