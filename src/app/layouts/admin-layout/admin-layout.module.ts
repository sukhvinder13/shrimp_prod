import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RegistrationComponent } from '../../farm-inputs/registration/registration.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddFarmComponent } from 'app/farm-inputs/add-farm/add-farm.component';
import { PondPrepartionComponent } from 'app/farm-inputs/pond-prepartion/pond-prepartion.component';
// Material Form Controls
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
// Material Navigation
// Material Layout
import { MatCardModule } from '@angular/material/card';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AccountsComponent } from 'app/user-data/accounts/accounts.component';
import { CustomersDataComponent } from 'app/user-data/customers-data/customers-data.component';
import { InspectionsComponent } from 'app/user-data/inspections/inspections.component';
import { SalesComponent } from 'app/user-data/sales/sales.component';
import { TransactionsComponent } from 'app/user-data/transactions/transactions.component';
import { TweetsComponent } from 'app/user-data/tweets/tweets.component';
import { CountHarvestComponent } from 'app/farm-inputs/feed-input/feed-input/count-harvest/count-harvest/count-harvest.component';
import { CultivationStageComponent } from 'app/farm-inputs/feed-input/feed-input/cultivation-stage/cultivation-stage.component';
import { FeedChecknetComponent } from 'app/farm-inputs/feed-input/feed-input/feed-checknet/feed-checknet.component';
import { FeedInputComponent } from 'app/farm-inputs/feed-input/feed-input/feed-input.component';
import { ObservationsComponent } from 'app/farm-inputs/feed-input/feed-input/observations/observations.component';
import { StockStockingComponent } from 'app/farm-inputs/feed-input/feed-input/stock-stocking/stock-stocking/stock-stocking.component';
import { WaterMedicineReportComponent } from 'app/farm-inputs/feed-input/feed-input/water-medicine-report/water-medicine-report.component';
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
    MatRadioModule,
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
    AccountsComponent,
    TransactionsComponent
  ],
 
})

export class AdminLayoutModule {}
