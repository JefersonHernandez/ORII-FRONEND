import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8;';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root',
})
export class ExporterService {
  constructor() {}

  exportToExcel(
    jsonActor: any[],
    jsonMovilidad: any[],
    excelFileName: string
  ): void {
    var arrayActor = [];

    for (var i in jsonActor) {
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

      arrayActor.push(jsonActor[i]);
    }

    var arrayData = [];
    let COP = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });
    for (var i in jsonMovilidad) {
      var fecha1;
      if (i == 'anio_mov') {
        fecha1 = new Date(jsonMovilidad[i]).toLocaleDateString('es-CO', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        jsonMovilidad[i] = fecha1;
      }

      if (i == 'valor_fin_nacional') {
        jsonMovilidad[i] = COP.format(jsonMovilidad[i]);
      }

      if (i == 'valor_fin_internacional') {
        jsonMovilidad[i] = COP.format(jsonMovilidad[i]);
      }

      arrayData.push(jsonMovilidad[i]);
    }

    var ws = XLSX.utils.aoa_to_sheet([
      [
        'Nombres      ',
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

    XLSX.utils.sheet_add_aoa(ws, [arrayActor], {
      origin: 'A2',
      cellDates: true,
      sheetStubs: true,
    });

    var ws12 = XLSX.utils.aoa_to_sheet([
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
        'N° Convenio',
      ],
    ]);
    const ws1 = XLSX.utils.sheet_add_aoa(ws12, [arrayData], {
      origin: 'A2',
      cellDates: true,
      sheetStubs: true,
    });

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Informacion Personal': ws, 'Datos de Movilidad': ws1 },
      SheetNames: ['Informacion Personal', 'Datos de Movilidad'],
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
