import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { UpadateUseComponent } from './upadate-use/upadate-use.component';
import { NgChartsModule } from 'ng2-charts';
import { UpdateUtilisateurComponent } from './mycomponents/update-utilisateur/update-utilisateur.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgChartsModule,
    CKEditorModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    UpadateUseComponent,
    UpdateUtilisateurComponent,
    
    
    
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS , useClass:AuthInterceptorService , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
