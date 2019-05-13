import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BillAddComponent } from './bill-add/bill-add.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [
    BillAddComponent,
    BillListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class BillModule {}
