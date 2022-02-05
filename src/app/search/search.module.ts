import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ScrollingModule,
    IonicStorageModule.forRoot(),
    SearchRoutingModule
  ]
})
export class SearchModule { }
