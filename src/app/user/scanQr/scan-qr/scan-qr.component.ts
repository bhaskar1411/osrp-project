import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { ProductService } from 'src/app/admin/products/product.service';
import { Product } from 'src/app/admin/products/product.model';
import { SupplierService } from 'src/app/admin/suppliers/supplier.service';
import { BillsService } from 'src/app/admin/bills/bills.service';


@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css']
})
export class ScanQrComponent implements OnInit {

  ngVersion = VERSION.full;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;
  product: Product;
  billNumber: string;
  TIN: number;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  constructor(private productService: ProductService,
              private supplierService: SupplierService,
              private billService: BillsService) {}

  ngOnInit(): void {

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;

      // selects the devices's back camera by default
      // for (const device of devices) {
      //     if (/back|rear|environment/gi.test(device.label)) {
      //         this.scanner.changeDevice(device);
      //         this.currentDevice = device;
      //         break;
      //     }
      // }
    });

    this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    console.debug('Devices: ', cameras);
    this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) {
    console.debug('Result: ', resultString);
    this.qrResultString = resultString;
    console.log(this.qrResultString);
    this.productService.getProduct(this.qrResultString)
    .subscribe(productData => {
      this.billNumber = productData.billno;
      this.TIN = productData.tin;
      console.log(productData);
      this.product = {
        id: productData._id,
        billno: productData.billno,
        tin: productData.tin,
        slno: productData.slno,
        doi: productData.doi,
        waranty: productData.waranty,
        qrimagefilename: productData.qrimagefilename
      };
    });
    console.log(this.product.billno);
    console.log(this.product.tin);
    console.log(this.billNumber);
    this.supplierService.getSupplierByTIN(this.TIN)
    .subscribe(supplierData => {
      console.log(supplierData);
    });

    this.billService.getBillbybillno(this.billNumber)
    .subscribe(billData => {
      console.log(billData);
    });

  }

  onDeviceSelectChange(selectedValue: string) {
    console.debug('Selection changed: ', selectedValue);
    this.currentDevice = this.scanner.getDeviceById(selectedValue);
  }

  // stateToEmoji(state: boolean): string {

  //   const states = {
  //     // not checked
  //     undefined: '❔',
  //     // failed to check
  //     null: '⭕',
  //     // success
  //     true: '✔',
  //     // can't touch that
  //     false: '❌'
  //   };

  //   return states['' + state];
  // }
}
