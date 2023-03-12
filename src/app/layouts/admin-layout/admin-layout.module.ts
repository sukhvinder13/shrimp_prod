import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RegistrationComponent } from '../../registration/registration.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
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
  MatRadioModule,
  MatTableModule
} from '@angular/material';
import { AddFarmComponent } from 'app/add-farm/add-farm.component';
import { FeedInputComponent } from 'app/feed-input/feed-input.component';
import { PondPrepartionComponent } from 'app/pond-prepartion/pond-prepartion.component';
import { CultivationStageComponent } from 'app/feed-input/cultivation-stage/cultivation-stage.component';
import { FeedChecknetComponent } from 'app/feed-input/feed-checknet/feed-checknet.component';
import { WaterMedicineReportComponent } from 'app/feed-input/water-medicine-report/water-medicine-report.component';
import { ObservationsComponent } from 'app/feed-input/observations/observations.component';
import { CountHarvestComponent } from 'app/feed-input/count-harvest/count-harvest/count-harvest.component';
import { StockStockingComponent } from 'app/feed-input/stock-stocking/stock-stocking/stock-stocking.component';
import { CustomersDataComponent } from 'app/customers-data/customers-data.component';
import { InspectionsComponent } from 'app/inspections/inspections.component';
import { TweetsComponent } from 'app/tweets/tweets.component';
import { SalesComponent } from 'app/sales/sales.component';
import { AccountsComponent } from 'app/accounts/accounts.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from 'app/services/loadingIntercept';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgSelectModule,
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
    MatTableModule,
    MatRadioModule,NgxPaginationModule,

  ],
  declarations: [
    DashboardComponent,
    RegistrationComponent,
    AddFarmComponent,
    FeedInputComponent,
    PondPrepartionComponent,
    CultivationStageComponent,
    FeedChecknetComponent,
    WaterMedicineReportComponent,
    ObservationsComponent,
    CountHarvestComponent,
    StockStockingComponent,
    CustomersDataComponent,
    InspectionsComponent,
    TweetsComponent,
    SalesComponent,
    AccountsComponent
  ],
 
})

export class AdminLayoutModule {}
