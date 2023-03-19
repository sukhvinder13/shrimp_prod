import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RegistrationComponent } from 'app/farm-inputs/registration/registration.component';
import { AddFarmComponent } from 'app/farm-inputs/add-farm/add-farm.component';
import { AccountsComponent } from 'app/user-data/accounts/accounts.component';
import { AuthGuardService } from 'app/services/auth-guard/auth-guard.service';
import { CustomersDataComponent } from 'app/user-data/customers-data/customers-data.component';
import { InspectionsComponent } from 'app/user-data/inspections/inspections.component';
import { SalesComponent } from 'app/user-data/sales/sales.component';
import { TransactionsComponent } from 'app/user-data/transactions/transactions.component';
import { TweetsComponent } from 'app/user-data/tweets/tweets.component';
import { FeedInputComponent } from 'app/farm-inputs/feed-input/feed-input/feed-input.component';
import { ResolverService } from 'app/common/service/resolver/resolver.service';

export const AdminLayoutRoutes: Routes = [
  { path: '', resolve: { messages: ResolverService }, 
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'registration', component: RegistrationComponent},
    { path: 'add-farm', component: AddFarmComponent },
    { path: 'feed-input', component: FeedInputComponent },
    { path: 'feed-input/:farmId', component: FeedInputComponent },
    { path: 'feed-input/:farmId/:farmDate', component: FeedInputComponent },
    { path: 'customers-data', component: CustomersDataComponent },
    { path: 'inspection-data', component: InspectionsComponent },
    { path: 'tweets-data', component: TweetsComponent },
    { path: 'sales-data', component: SalesComponent },
    { path: 'accounts-data', component: AccountsComponent },
    { path: 'transaction-data', component: TransactionsComponent },
  ]}
];
