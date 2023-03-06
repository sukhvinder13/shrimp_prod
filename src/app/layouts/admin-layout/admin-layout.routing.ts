import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RegistrationComponent } from 'app/registration/registration.component';
import { AddFarmComponent } from 'app/add-farm/add-farm.component';
import { FeedInputComponent } from 'app/feed-input/feed-input.component';
import { CustomersDataComponent } from 'app/customers-data/customers-data.component';

export const AdminLayoutRoutes: Routes = [
   
    { path: 'dashboard', component: DashboardComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'add-farm', component: AddFarmComponent },
    { path: 'feed-input', component: FeedInputComponent },
    { path: 'feed-input/:farmId', component: FeedInputComponent },
    { path: 'feed-input/:farmId/:farmDate', component: FeedInputComponent },
    { path: 'customers-data', component: CustomersDataComponent },

];
