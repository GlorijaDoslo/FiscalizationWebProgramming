import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { AccountsComponent } from './accounts/accounts.component';
import { AddItemReceiptDialogComponent } from './add-item-receipt-dialog/add-item-receipt-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { ChpassComponent } from './chpass/chpass.component';
import { CompanyFirstLoginComponent } from './company-first-login/company-first-login.component';
import { CompanyComponent } from './company/company.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "buyer",canActivate:[UserService], component: BuyerComponent},
  {path: "admin", canActivate:[UserService], component: AdminComponent},
  {path: "company", canActivate:[UserService], component: CompanyComponent},
  {path: "register", component: RegisterComponent},
  {path: "chpass", canActivate:[UserService], component: ChpassComponent},
  {path: "adminlogin", component:AdminloginComponent},
  {path: "company-first-login", canActivate:[UserService], component: CompanyFirstLoginComponent},
  {path: "category-dialog", canActivate: [UserService], component: CategoryDialogComponent},
  {path: "accounts", canActivate: [UserService], component: AccountsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
