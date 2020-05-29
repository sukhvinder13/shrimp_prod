import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { SelectionOfFarmsComponent } from '../../selection-of-farms/selection-of-farms.component';
import { ReportsComponent } from '../../reports/reports.component';
import { ChangePhaseComponent } from '../../change-phase/change-phase.component';
import { CheckPreviousRecordsComponent } from '../../check-previous-records/check-previous-records.component';
import { AddPrescriptionComponent } from '../../add-prescription/add-prescription.component';
import { RegistrationComponent } from '../../registration/registration.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatCard,
  MatCardModule,
  MatPaginatorModule,
  MatRadioModule
} from '@angular/material';
import { AddFarmComponent } from 'app/add-farm/add-farm.component';
import { FeedInputComponent } from 'app/feed-input/feed-input.component';
import { PondPrepartionComponent } from 'app/pond-prepartion/pond-prepartion.component';
import { CultivationStageComponent } from 'app/feed-input/cultivation-stage/cultivation-stage.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    MatRadioModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    SelectionOfFarmsComponent,
    ReportsComponent,
    ChangePhaseComponent,
    CheckPreviousRecordsComponent,
    AddPrescriptionComponent,
    RegistrationComponent,
    AddFarmComponent,
    FeedInputComponent,
    PondPrepartionComponent,
    CultivationStageComponent
  ]
})

export class AdminLayoutModule {}
