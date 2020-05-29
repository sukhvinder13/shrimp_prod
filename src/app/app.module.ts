import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { MatProgressSpinnerModule, MatRadioModule } from '@angular/material'

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
// import { TableListComponent } from './table-list/table-list.component';
// import { TypographyComponent } from './typography/typography.component';
// import { IconsComponent } from './icons/icons.component';
// import { MapsComponent } from './maps/maps.component';
// import { NotificationsComponent } from './notifications/notifications.component';
// import { UpgradeComponent } from './upgrade/upgrade.component';
// import { SelectionOfFarmsComponent } from './selection-of-farms/selection-of-farms.component';
// import { ReportsComponent } from './reports/reports.component';
// import { ChangePhaseComponent } from './change-phase/change-phase.component';
// import { CheckPreviousRecordsComponent } from './check-previous-records/check-previous-records.component';
// import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
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
    HttpModule,
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
