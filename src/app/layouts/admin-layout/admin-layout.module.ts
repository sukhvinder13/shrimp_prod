import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RegistrationComponent } from '../../registration/registration.component';
// import {NgxPaginationModule} from 'ngx-pagination';
// import { NgxPaginationModule } from 'ngx-pagination';

import { NgSelectModule } from '@ng-select/ng-select';

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
import { TransactionsComponent } from 'app/transactions/transactions.component';
// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
    // NgxPaginationModule

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
