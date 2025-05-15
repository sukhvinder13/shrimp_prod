import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SpinnerComponent } from './common/component/spinner/spinner.component';
import { LoadingInterceptor } from './common/service/loading-interceptor/loadingIntercept';
import { LoginComponent } from './login/login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/reducers/auth.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({ declarations: [
        AppComponent,
        AdminLayoutComponent,
        SpinnerComponent,
        LoginComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      NgSelectModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-right'
        }),
        NgbModule,
        EffectsModule.forRoot([]), StoreModule.forRoot({ auth: authReducer })], providers: [
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
