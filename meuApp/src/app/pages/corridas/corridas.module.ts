import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorridasPageRoutingModule } from './corridas-routing.module';

import { CorridasPage } from './corridas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorridasPageRoutingModule
  ],
  declarations: [CorridasPage]
})
export class CorridasPageModule {}
