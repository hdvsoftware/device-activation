import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerDetailComponent } from "./customer/customer-detail/customer-detail.component";
import { CustomerEditComponent } from "./customer/customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer/customer-list/customer-list.component";
import { CustomerComponent } from "./customer/customer.component";
import { LoginComponent } from "./login/login.component";
import { LoginGuard } from "./shared/login-guard";

const appRoutes:Routes = [
    {   path: '', redirectTo: 'customer', pathMatch: 'full' },
    {   path: 'customer', 
        component: CustomerComponent,
        children: [
            {path: '', component: CustomerListComponent},
            {path: ':id', component: CustomerDetailComponent},
            {path: ':id/edit', component: CustomerEditComponent},

        ], 
        canActivate: [LoginGuard]},
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