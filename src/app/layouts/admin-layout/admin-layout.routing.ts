import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { SelectionOfFarmsComponent } from 'app/selection-of-farms/selection-of-farms.component';
import { ReportsComponent } from 'app/reports/reports.component';
import { ChangePhaseComponent } from 'app/change-phase/change-phase.component';
import { CheckPreviousRecordsComponent } from 'app/check-previous-records/check-previous-records.component';
import { AddPrescriptionComponent } from 'app/add-prescription/add-prescription.component';
import { RegistrationComponent } from 'app/registration/registration.component';
import { AddFarmComponent } from 'app/add-farm/add-farm.component';
import { FeedInputComponent } from 'app/feed-input/feed-input.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'selection-of-farm', component: SelectionOfFarmsComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'change-phase', component: ChangePhaseComponent },
    { path: 'check-previous-records', component: CheckPreviousRecordsComponent },
    { path: 'add-prescription', component: AddPrescriptionComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'add-farm', component: AddFarmComponent },
    { path: 'feed-input', component: FeedInputComponent },

];
