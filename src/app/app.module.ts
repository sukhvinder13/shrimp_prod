import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { NgSelectModule } from '@ng-select/ng-select';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { MatProgressSpinnerModule, MatRadioModule } from '@angular/material'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,NgSelectModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatRadioModule,
 
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
