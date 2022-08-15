import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ChpassComponent } from './chpass/chpass.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyFirstLoginComponent } from './company-first-login/company-first-login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { AddTableDialogComponent } from './add-table-dialog/add-table-dialog.component';
import { AddItemReceiptDialogComponent } from './add-item-receipt-dialog/add-item-receipt-dialog.component';
import { CloseReceiptDialogComponent } from './close-receipt-dialog/close-receipt-dialog.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    BuyerComponent,
    CompanyComponent,
    RegisterComponent,
    ChpassComponent,
    AdminloginComponent,
    CompanyFirstLoginComponent,
    CategoryDialogComponent,
    AddTableDialogComponent,
    AddItemReceiptDialogComponent,
    CloseReceiptDialogComponent,
    AccountsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
