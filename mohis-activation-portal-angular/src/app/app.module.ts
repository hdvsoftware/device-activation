import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { DeviceComponent } from './device/device.component';
import { AuthGuard } from './shared/guards/auth-guard';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { ApiModule } from './api.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BASE_PATH } from './shared/variables';
import { environment } from 'src/environments/environment';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { CustomAuthInterceptor } from './shared/customauth.interceptor';
import { RequireRuleDirective } from './shared/directives/require-rule.directive';
import { APIS } from './shared/api/api';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CustomerComponent,
    DeviceComponent,
    DeviceListComponent,
    DeviceEditComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerDetailComponent,
    DropdownDirective,
    RequireRuleDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ApiModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,

    
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    { provide: HTTP_INTERCEPTORS, useClass: CustomAuthInterceptor, multi: true},
    AuthService, 
    AuthGuard, 
    APIS,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
