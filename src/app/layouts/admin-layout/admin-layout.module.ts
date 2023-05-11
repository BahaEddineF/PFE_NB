import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { MapsComponent } from '../../maps/maps.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ConfigurationlayoutComponent } from 'app/mycomponents/configurationlayout/configurationlayout.component';
import { ModelemailComponent } from 'app/mycomponents/modelemail/modelemail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CampagnymailingComponent } from 'app/mycomponents/campagnymailing/campagnymailing.component';
import { UsersComponent } from 'app/mycomponents/users/users.component';
import { AddUtilisateurComponent } from 'app/mycomponents/add-utilisateur/add-utilisateur.component';
import { MatDialogModule } from '@angular/material/dialog';

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
    CKEditorModule,
    MatDialogModule
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    UsersComponent,
    MapsComponent,
    UpgradeComponent,
    ConfigurationlayoutComponent,
    ModelemailComponent,
    CampagnymailingComponent,
    AddUtilisateurComponent
    
  ]
})

export class AdminLayoutModule {}
