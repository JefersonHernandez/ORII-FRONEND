import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8;';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExporterAllService {
  constructor() {}

  exportToExcel(data: any[], excelFileName: string): void {
     
    var ws = XLSX.utils.aoa_to_sheet([
      [
        'ID ',
        'Tipo de Movilidad',
        'Clase de Movilidad',
        'Facultad',
        'Programa',
        'Fecha Movilidad',
        'Semestre',
        'Actividad',
        'Descripcion de Actividad',
        'Institucion Origen',
        'Direccion Origen',
        'Pais de Origen',
        'Departamento de Origen ',
        'Municipio de Origen',
        'Institucion Destino',
        'Direccion Destino',
        'Pais Destino',
        'Departamento Destino',
        'Municipio Destino',
        'Dias Movilidad',
        'Convenio',
        'Financiacion Nacional',
        'Valor Financiacion Nacional',
        'Financiacion InterNacional',
        'Pais Financiacion InterNacional',
        'Valor Financiacion InterNacional',
        'Codigo',
        'Fecha del reporte',
        'Role',
        'N° Convenio','Nombres      ',
        'Apellidos     ',
        'Codigo   ',
        'Email Personal    ',
        'Email Institucional    ',
        'Tipo Documento',
        'N° Documento',
        'Pais Nacimiento',
        'Expedicion Documento',
        'Sexo',
        'Estado Civil',
        'Fecha Nacimiento',
        'Pais',
        'Departamento',
        'Municipio',
        'Telefono',
      ],
      
    ]);
    
    const columnWidths = [
      { wch: 5 }, { wch: 16 }, { wch: 16 }, { wch: 26 }, { wch: 24 }, { wch: 24 }, { wch: 30 }, { wch: 40 }, { wch: 26 }, 
      { wch: 50 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 26 }, { wch: 50 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, 
      { wch: 5 }, { wch: 5 }, { wch: 30 }, { wch: 16 }, { wch: 30 }, { wch: 20 }, { wch: 20 }, { wch: 10 }, { wch: 20 }, 
      { wch: 10 }, { wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 26 }, { wch: 16 }, 
      { wch: 16 }, { wch: 26 }, { wch: 10 }, { wch: 10 }, { wch: 26 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, 
      { wch: 20 }, { wch: 20 },
    ];

    ws['!cols'] = columnWidths;
    
    let COP = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });
    let cont = 1;
    for (var j in data) {
      var jsonActor = data[j];
      var arrayActor = [];
      for (var i in jsonActor) {
        if(i == 'actor'){
          var actor = jsonActor[i];
          for(var k in actor){
            arrayActor.push(actor[k]);
          }
        }
        if (i == 'fecha_expedicion') {
          const fecha2 = new Date(jsonActor[i]).toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          jsonActor[i] = fecha2;
        }

        if (i == 'fecha_nac') {
          const fecha2 = new Date(jsonActor[i]).toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          jsonActor[i] = fecha2;
        }
        // 
        var fecha1;
      if (i == 'anio_mov') {
        fecha1 = new Date(jsonActor[i]).toLocaleDateString('es-CO', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        jsonActor[i] = fecha1;
      }

      if (i == 'valor_fin_nacional') {
        jsonActor[i] = COP.format(jsonActor[i]);
      }

      if (i == 'valor_fin_internacional') {
        jsonActor[i] = COP.format(jsonActor[i]);
      }
        arrayActor.push(jsonActor[i]);
      }
      cont++;
      console.log(cont);
      
      XLSX.utils.sheet_add_aoa(ws, [arrayActor], {
        origin: 'A'+cont,
        cellDates: true,
        sheetStubs: true,
      });
      
      
    }


    const workbook: XLSX.WorkBook = {
      Sheets: { 'Informacion Personal': ws },
      SheetNames: ['Informacion Personal'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      compression: true,
    });
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + '_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  currencyFormatter(currency: any, value: number | bigint) {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency,
    });
    return formatter.format(value);
  }
}
