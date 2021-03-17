import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/login.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { DeviceComponent } from './device/device.component';
import { LoginGuard } from './shared/login-guard';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { DeviceDetailComponent } from './device/device-detail/device-detail.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { ApiModule } from './api.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BASE_PATH } from './shared/variables';
import { environment } from 'src/environments/environment';
import { UserService } from './shared/api/user.service';
import { DeviceService } from './shared/api/device.service';
import { CustomerService } from './shared/api/customer.service';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { CustomAuthInterceptor } from './shared/customauth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CustomerComponent,
    DeviceComponent,
    DeviceListComponent,
    DeviceEditComponent,
    DeviceDetailComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerDetailComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ApiModule,
    HttpClientModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    { provide: HTTP_INTERCEPTORS, useClass: CustomAuthInterceptor, multi: true},
    LoginService, 
    LoginGuard, 
    UserService,
    DeviceService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
