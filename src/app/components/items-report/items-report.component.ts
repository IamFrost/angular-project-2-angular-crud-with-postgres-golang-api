import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
// import * as XLSX from 'xlsx';

import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-items-report',
  templateUrl: './items-report.component.html',
  styleUrls: ['./items-report.component.css']
})
export class ItemsReportComponent implements OnInit {

  purchases: any;
  constructor(private dataService: DataService) {
    this.GetPurchases();
  }

  ngOnInit(): void {
  }

  async GetPurchases() {
    const response = await this.dataService.GetPurchases();
    const dataService = await response.json();
    this.purchases = dataService;
  }

  downloadPDF() {
    const data = document.getElementById('purchaseTable');  // Id of the table
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      // Your 1st parameter (landscape [l] or portrait [p]) determines what becomes the width and the height.
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      /* addImage explained below:
      param 1 -> image in code format
      param 2 -> type of the image. SVG not supported. needs to be either PNG or JPEG.
      all params are specified in integer
      param 3 -> X axis margin from left
      param 4 -> Y axis margin from top
      param 5 -> width of the image
      param 6 -> height of the image
      */
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // pdf.addImage(contentDataURL, 'PNG', 18, 30, imgWidth - 17, imgHeight);
      pdf.addImage(contentDataURL, 'PNG', 18, 30, imgWidth - 21, imgHeight);

      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
  downloadExcel() {

    // using instead of Date.now()
    const date = new Date().toISOString().slice(0, 10).split('-').reverse().join('/');
    console.log(date);

    // get help from here for excel file export using excelJS with alignment
    // in your tsconfig.app.json u must use "types": ["node"] if u use exceljs
    // https://stackoverflow.com/questions/62127452/angular-cant-export-excel-using-exceljs-error-ts2307-cannot-find-module-s/62128182?noredirect=1#comment109909862_62128182

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10},
      { header: 'Name', key: 'name', width: 32 },
      { header: 'Quantity', key: 'quantity', width: 15 },
      { header: 'Rate', key: 'rate', width: 15 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Total', key: 'total', width: 15 }
    ];

    // get help from here for excel cell alignment
    // https://openbase.io/js/exceljs#alignment


    for (const purchase of this.purchases) {
      worksheet.addRow({
        id: purchase.item_id ,
        date: purchase.item_purchase_date.toString().slice(0, 10).split('-').reverse().join('/'),
        name: purchase.item_name,
        quantity: purchase.item_quantity,
        rate: purchase.item_rate,
        total: purchase.item_rate * purchase.item_quantity
       })
      .alignment = { horizontal: 'left' };
    }

    worksheet.getRow(1).font = { bold: true };

    // get help from here
    // https://stackoverflow.com/questions/62149358/exceljs-iterate-each-cell-of-each-row-and-column/62149808#62149808
    worksheet.columns.forEach(column => {
      // for each non empty cell
      column.eachCell((cell, rowNumber) => {
        cell.border = {
          top: { style: 'thick' },
          left: { style: 'thick' },
          bottom: { style: 'thick' },
          right: { style: 'thick' }
        };
      });
    });





    // save under export.xlsx, dont use writeFile see the above stackoverflow question
    // await workbook.xlsx.writeFile('export.xlsx');
    // await maybe optional here
    workbook.xlsx.writeBuffer()
      .then(buffer => FileSaver.saveAs(new Blob([buffer]), `${date}_feedback.xlsx`))
      .catch(err => console.log('Error writing excel export', err));

    // note : this is another way to export excel using sheetjs
    // but in free version u cant use excel cell styling
    // like make excel column left align
    /* https://medium.com/@patade888/exporting-data-to-excel-in-angular-8-5a7cf5d0d25d */
    /*name of the excel-file which will be downloaded. */
    // const fileName = 'ExcelSheet.xlsx';
    /* table id is passed over here */
    // const element = document.getElementById('purchaseTable');
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    // XLSX.writeFile(wb, fileName);
  }
  // async downloadExcel1() {

  //   const date = new Date().toISOString().slice(0, 10).split('-').reverse().join('/');
  //   console.log(date);
  //   const workbook = new Excel.Workbook();
  //   const worksheet = workbook.addWorksheet('My Sheet');

  //   worksheet.columns = [
  //     { header: 'Id', key: 'id', width: 10 },
  //     { header: 'Name', key: 'name', width: 32 },
  //     { header: 'D.O.B.', key: 'dob', width: 15, }
  //   ];

  //   worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
  //   worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

  //   // save under export.xlsx
  //   await workbook.xlsx.writeFile('export.xlsx');

  //   // load a copy of export.xlsx
  //   const newWorkbook = new Excel.Workbook();
  //   await newWorkbook.xlsx.readFile('export.xlsx');

  //   const newworksheet = newWorkbook.getWorksheet('My Sheet');
  //   newworksheet.columns = [
  //     { header: 'Id', key: 'id', width: 10 },
  //     { header: 'Name', key: 'name', width: 32 },
  //     { header: 'D.O.B.', key: 'dob', width: 15, }
  //   ];
  //   await newworksheet.addRow({ id: 3, name: 'New Guy', dob: new Date(2000, 1, 1) });

  //   await newWorkbook.xlsx.writeFile('export2.xlsx');

  //   console.log('File is written');
  // }

  print() {
    window.print();
  }

  // jqueryCall1() {
  //   jQuery(() => {
  //     $('p').text('The DOM is now loaded and can be manipulated.');
  //   });
  // }

}
