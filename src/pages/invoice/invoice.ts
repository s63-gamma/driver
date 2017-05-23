import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {InvoiceProvider} from "../../providers/invoice";
import {Observable} from 'rxjs/Rx'
import {Invoice} from "../../invoice";
import {API_URL, USER} from "../../constants";
import {File} from '@ionic-native/file';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {FileOpener} from '@ionic-native/file-opener';
import {RoutePage} from "../route/route";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the InvoicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
  providers: [
    InvoiceProvider,
    Transfer,
    File,
    LocalNotifications,
    FileOpener
  ]
})
export class InvoicePage {

  public invoices: Invoice[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public invoiceProvider: InvoiceProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public transfer: Transfer,
              public file: File,
              public localNotifications: LocalNotifications,
              public fileOpener: FileOpener,
              public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
    this.invoiceProvider.queryByOwnerEmail(USER.email).subscribe(invoices => this.invoices = invoices)
  }

  public pay(invoices: Invoice[]) {
    const checked = invoices.filter(invoice => invoice.checked && invoice.status !== 1);

    const priceTotal = checked
      .map(invoice => invoice.priceTotal)
      .reduce((a, b) => a + b);

    let observables: Observable<string>[] = [];
    observables.push(this.translate.get('INVOICE.ALERT.TITLE'));
    observables.push(this.translate.get('INVOICE.ALERT.MESSAGE', {'length': checked.length, 'priceTotal': priceTotal}));
    observables.push(this.translate.get('INVOICE.ALERT.CANCEL'));
    observables.push(this.translate.get('INVOICE.ALERT.PAY'));
    observables.push(this.translate.get('INVOICE.ALERT.SUCCESS_MESSAGE', {'length': checked.length}));
    Observable.forkJoin(observables).subscribe(translations => {
      console.log(translations);

      let confirm = this.alertCtrl.create({
        title: translations[0],
        message: translations[1],
        buttons: [
          {
            text: translations[2],
            handler: () => {
            }
          },
          {
            text: translations[3],
            handler: () => {
              let toast = this.toastCtrl.create({
                message: translations[4],
                duration: 3000
              });
              toast.present();

              let observables: Observable<Invoice>[] = [];

              checked.forEach(invoice => {
                invoice.status = 1;
                observables.push(this.invoiceProvider.save(invoice));
                invoice.checked = false;
              });

              Observable.forkJoin(observables).subscribe()
            }
          }
        ]
      });
      confirm.present();
    });



  }

  public download(invoices: Invoice[]) {
    const checked = invoices.filter(invoice => invoice.checked);

    checked.forEach(it => {
      const fileTransfer: TransferObject = this.transfer.create();
      fileTransfer.download(
        `${API_URL}/generatePdf/${it.uuid}`,
        `${this.file.externalApplicationStorageDirectory}invoice-${it.uuid}.pdf`
      ).then(result => {
          this.localNotifications.schedule({
            title: 'Download complete',
            text: `Downloaded invoice-${it.uuid}.pdf`,
            data: {
              uuid: it.uuid,
              url: result.toURL()
            }
          });
          this.localNotifications.on('click', (event, state) => {
            const data = JSON.parse(event.data)
            this.fileOpener.open(data.url, 'application/pdf')
              .then(it => console.log(it))
              .catch(exception => console.log(exception))
          });
          console.log('download complete: ' + result.toURL());
        }
      ).catch(error => console.log(error))
    })
  }

  public viewRoutes(invoices: Invoice[]) {
    const checked = invoices
      .filter(invoice => invoice.checked);
    console.log(checked)
    let routeModal = this.modalCtrl.create(RoutePage, {invoices: checked});
    routeModal.present();
  }
}

