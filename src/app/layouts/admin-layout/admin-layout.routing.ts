import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import {  UsersComponent } from '../../mycomponents/users/users.component';
import { MapsComponent } from '../../maps/maps.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ConfigurationlayoutComponent } from 'app/mycomponents/configurationlayout/configurationlayout.component';
import { ModelemailComponent } from 'app/mycomponents/modelemail/modelemail.component';
import { CampagnymailingComponent } from 'app/mycomponents/campagnymailing/campagnymailing.component';


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
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'users',          component: UsersComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'configuration', component: ConfigurationlayoutComponent },
    { path: 'modelemail', component: ModelemailComponent },
    { path: 'campagnymailing', component: CampagnymailingComponent }
   
];
