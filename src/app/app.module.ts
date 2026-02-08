import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

// Third-party modules
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// App modules
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

// Components
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login/login.component';
import { SpinnerComponent } from './common/component/spinner/spinner.component';

// Services & Interceptors
import { LoadingInterceptor } from './common/service/loading-interceptor/loadingIntercept';
import { authReducer } from './store/reducers/auth.reducer';

const MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule,
  AppRoutingModule,
  ComponentsModule,
  NgSelectModule,
  NgbModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  StoreModule.forRoot({ auth: authReducer }),
  EffectsModule.forRoot([]),
  ToastrModule.forRoot({
    timeOut: 2000,
    positionClass: 'toast-top-right'
  })
];

const COMPONENTS = [
  AppComponent,
  AdminLayoutComponent,
  LoginComponent,
  SpinnerComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
