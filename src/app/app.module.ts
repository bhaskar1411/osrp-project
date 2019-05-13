import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BillsService } from './admin/bills/bills.service';
// import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import { AdminComponent } from './admin/admin.component';
import { SupplierService } from './admin/suppliers/supplier.service';
import { UserComponent } from './user/user.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AngularMaterialModule } from './angular-material.module';
import { BillModule } from './admin/bills/bills.module';
import { AuthService } from './auth/auth.service';
import { ProductService } from './admin/products/product.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './admin/products/product.module';
import { SupplierModule } from './admin/suppliers/supplier.module';
import { SearchbyslnoComponent } from './user/searchbyslno/searchbyslno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScanQrComponent } from './user/scanQr/scan-qr/scan-qr.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    UserComponent,
    SearchbyslnoComponent,
    ScanQrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    BillModule,
    AuthModule,
    ProductModule,
    SupplierModule,
    ZXingScannerModule
  ],
  providers: [BillsService, SupplierService, AuthService, ProductService,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
