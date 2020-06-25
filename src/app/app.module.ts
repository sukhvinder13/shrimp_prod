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
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegistrationComponent } from './registration/registration.component';
import { from } from 'rxjs';
import { AddFarmComponent } from './add-farm/add-farm.component';
import { FeedInputComponent } from './feed-input/feed-input.component';
import { PondPrepartionComponent } from './pond-prepartion/pond-prepartion.component';
import { CultivationStageComponent } from './feed-input/cultivation-stage/cultivation-stage.component';
// import { LoginComponent } from './component/login/login.component';

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
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
