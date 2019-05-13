import { NgModule } from '@angular/core';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from '../admin/signup/signup.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports:[
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthModule {}
