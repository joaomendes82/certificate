import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  @ViewChild('input', { static: true }) input: ElementRef;

  token: string;
  tenant: string = "Default"; // "800001"; // "Default"; // "800001"; "Default"
  organization: string = "TEST-PT"; // "800001-0422"; // "DEMO"; // "800001-0374"; "TEST-PT"
  url: string = "https://elevationfw-core-build.azurewebsites.net"; // "https://elevationfw-iridium-main.azurewebsites.net"; // "http://localhost:51913"; // "https://elevationfw-iridium.azurewebsites.net"; // "https://elevationfw-core-build.azurewebsites.net"
  address: string = this.url + "/api/" + this.tenant + "/" + this.organization + "/billing/invoices";
  // address: string = this.url + "/api/" + this.tenant + "/" + this.organization + "/reporting/templates/donwloadCertificatePdf";
  invoiceObject: any;
  invoices: string[] = [];
  invoicesFile: string[] = [];
  errors: number = 0;
  oks: number = 0;
  printPdf: boolean = false;

  constructor(protected http: HttpClient,
    protected fileSaverService: FileSaverService) {
    const urlData: string = "./files/iridium.json";
    const urlInvoices: string = "./files/invoices.json";
    const urlToken: string = "./files/token.json";

    this.http.get(urlData).subscribe((data: any) => {
      this.invoiceObject = data;
    });

    this.http.get(urlInvoices).subscribe((data: any) => {
      this.invoicesFile = data;
    });

    this.http.get(urlToken).subscribe((data: any) => {
      this.token = data;
    });
  }

  /*go() {
    let i = 0,
      max = 1;

    setInterval(() => {
      if (i < max) {
        this.saveInvoice();
        console.log(i + 1);
      }
      i++;
    }, 1000);
  }

  print() {
    let i = 0,
      max = this.invoices.length;

    console.log(this.invoices);

    setInterval(() => {
      if (i < max) {
        this.printInvoice(this.invoices[i]);
      }
      i++;
    }, 10);
  }

  printFile() {
    let i = 0,
      max = this.invoicesFile.length;

    console.log(max);

    setInterval(() => {
      if (i < max) {
        this.printInvoice(this.invoicesFile[i]);
      }
      i++;
    }, 1);
  }

  printCertificates() {
    let i = 0,
      max = 1;

    this.errors = 0;

    console.log(max);

    setInterval(() => {
      if (i < max) {
        this.printCertificate();
      }
      i++;
    }, 1);
  }

  saveInvoice() {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

    this.http.post(this.address, this.invoiceObject, options)
      .subscribe((value: any) => {
        console.log(value);
        this.invoices.push(value);
        // this.printInvoice(value);
      }, (error: any) => {
        console.log("ERROR SAVE");
        console.log(error);
      });
  }

  printInvoice(invoice: string) {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'blob'
    };

    this.http.get(this.address + "/" + invoice + "/printoriginal", options)
      .subscribe((value: any) => {
        console.log("OK");
        // this.fileSaverService.save(value, invoice + ".pdf");
      }, (error: any) => {
        console.log("ERROR");
        console.log(error);
      });
  }

  printCertificate() {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'blob'
    };

    this.http.get(this.address, options)
      .subscribe((value: any) => {
        console.log("OK");
        // this.fileSaverService.save(value, "invoice.pdf");
      }, (error: any) => {
        console.log("ERROR");
        console.log(error);
        this.errors++;
        console.log("ERRORS: " + this.errors.toString());
      });
  }

  getCertificateApi() {
    let i = 0,
      max = 500;

    this.errors = 0;

    console.log(max);

    setInterval(() => {
      if (i < max) {
        this.certificateApi();
      }
      i++;
    }, 1);
  }

  certificateApi() {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'blob'
    };

    this.http.get(this.url + "/certificate/getPrint", options)
      .subscribe((value: any) => {
        console.log("OK");
        // this.fileSaverService.save(value, "invoice.pdf");
      }, (error: any) => {
        console.log("ERROR");
        console.log(error);
        this.errors++;
        console.log("ERRORS: " + this.errors.toString());
      });
  }

  getPdfs() {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'blob'
    },
      max = 500;

    let i = 0;

    this.errors = 0;

    setInterval(() => {
      if (i < max) {
        this.http.get(this.url + "/certificate/getPrint", options)
          .subscribe((value: any) => {
            console.log("OK");
          }, (error: any) => {
            console.log("ERROR");
            console.log(error);
            this.errors++;
          });
      }
      i++;
    }, 1);
  }*/

  callPrimaveraCertificate() {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'blob'
    },
      max = Number(this.input.nativeElement.value),
      certificateName = "kvbrasinhasdv-jasmindoc-20190510";

    let i = 0;

    this.errors = 0;
    this.oks = 0;

    setInterval(() => {
      if (i < max) {
        this.http.get(this.url + "/certificate/getPrintFile/" + certificateName, options)
          .subscribe((value: any) => {
            this.oks++;
            console.log("OKS: " + this.oks.toString());
            if (this.printPdf) {
              this.fileSaverService.save(value, "invoice.pdf");
            }
          }, (error: any) => {
            this.errors++;
            console.log("ERRORS: " + this.errors.toString());
          });
      }
      i++;
    }, 1);
  }

  callNewCertificate() {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'password': 'password'
      }),
      responseType: 'blob',

    },
      max = Number(this.input.nativeElement.value),
      certificateName = "RootCA";

    let i = 0;

    this.errors = 0;
    this.oks = 0;

    setInterval(() => {
      if (i < max) {
        this.http.get(this.url + "/certificate/getPrintFile/" + certificateName, options)
          .subscribe((value: any) => {
            this.oks++;
            console.log("OKS: " + this.oks.toString());
            if (this.printPdf) {
              this.fileSaverService.save(value, "invoice.pdf");
            }
          }, (error: any) => {
            this.errors++;
            console.log("ERRORS: " + this.errors.toString());
          });
      }
      i++;
    }, 1);
  }

  callMicroCertificate() {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'blob',

    },
      max = Number(this.input.nativeElement.value);

    let i = 0;

    this.errors = 0;
    this.oks = 0;

    setInterval(() => {
      if (i < max) {
        this.http.get(this.url + "/certificate/getPrintMicro", options)
          .subscribe((value: any) => {
            this.oks++;
            console.log("OKS: " + this.oks.toString());
            if (this.printPdf) {
              this.fileSaverService.save(value, "invoice.pdf");
            }
          }, (error: any) => {
            this.errors++;
            console.log("ERRORS: " + this.errors.toString());
          });
      }
      i++;
    }, 1);
  }
}
