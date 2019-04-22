import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSelectModule } from '@angular/material';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BillAddComponent } from './admin/bills/bill-add/bill-add.component';
import { BillListComponent } from './admin/bills/bill-list/bill-list.component';
import { BillsService } from './admin/bills/bills.service';
import { SupplierAddComponent } from './admin/suppliers/supplier-add/supplier-add.component';
import { SupplierListComponent } from './admin/suppliers/supplier-list/supplier-list.component';
import { AdminComponent } from './admin/admin.component';
import { SupplierService } from './admin/suppliers/supplier.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { UserComponent } from './user/user.component';
import { ProductAddComponent } from './admin/products/product-add/product-add.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BillAddComponent,
    BillListComponent,
    SupplierAddComponent,
    SupplierListComponent,
    AdminComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [BillsService, SupplierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
