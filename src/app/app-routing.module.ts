import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerDetailComponent } from "./customer/customer-detail/customer-detail.component";
import { CustomerEditComponent } from "./customer/customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer/customer-list/customer-list.component";
import { CustomerComponent } from "./customer/customer.component";
import { DeviceEditComponent } from "./device/device-edit/device-edit.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/guards/auth-guard";

const appRoutes:Routes = [
    {   path: '', redirectTo: 'omgevingen', pathMatch: 'full' },
    {   path: 'omgevingen', 
        component: CustomerComponent,
        children: [
            {   path: '', 
                component: CustomerListComponent, 
                pathMatch:'full'
            },
            {   path: 'new', 
                component: CustomerEditComponent,
                canActivate: [AuthGuard],
                data: { requiredRule: 'customer-add'}
            },
            {   path: ':id', 
                component: CustomerDetailComponent,
                canActivate: [AuthGuard]
            },
            {   path: ':id/edit', 
                component: CustomerEditComponent,
                canActivate: [AuthGuard],
                data: { requiredRule: 'customer-update'}
            },
            {   path: ':id/device', pathMatch: 'full',
                redirectTo: ':id'
            },
            {   path: ':id/device/new', 
                component: DeviceEditComponent,
                canActivate: [AuthGuard],
                data: { requiredRule: 'device-add'}
            },
            {   path: ':id/device/:deviceId', 
                component: DeviceEditComponent,
                canActivate: [AuthGuard],
                data: { requiredRule: 'device-update'}
            }

        ], 
        canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}