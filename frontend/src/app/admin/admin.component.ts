import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/services/company.service';
import { ReceiptService } from 'src/services/receipt.service';
import { UserService } from 'src/services/user.service';
import { Receipt } from '../models/receipt';
import { User } from '../models/user';
import { ImageSnippet } from '../register/register.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private companyService: CompanyService
    , private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.isAcceptUser = false;
    this.isRegisterCompany = false;
    this.isAddBuyer = false;
    this.isShowDailyReport = false;
    this.isSeeCompanies = true;
    this.adminFirstname = localStorage.getItem("firstname");
    this.adminLastname = localStorage.getItem("lastname");
    this.userService.getAllRequests().subscribe((data: User[])=>{
      this.unacceptedUsers = data;
    })

    this.userService.getCompanies().subscribe((companies: User[])=>{
      this.allCompanies = companies;
    })
  }
  adminFirstname: string;
  adminLastname: string;
  unacceptedUsers: User[] = [];
  isAcceptUser: boolean = false;
  isRegisterCompany: boolean = false;
  isAddBuyer: boolean = false;
  isShowDailyReport: boolean = false;
  isSeeCompanies: boolean = false;
  companyMaxIdCom: number;
  array = [];
  from: string;
  to: string;

  seeCompanies() {
    this.ngOnInit();
    this.isSeeCompanies = true;
  }

  acceptUsers() {
    this.ngOnInit();
    this.isSeeCompanies = false;
    this.isAcceptUser = true;
    //this.router.navigate(['accept-users']);
  }

  registerCompanies() {
    this.ngOnInit();
    this.isSeeCompanies = false;
    this.isRegisterCompany = true;
  }

  addBuyers() {
    this.ngOnInit();
    this.isSeeCompanies = false;
    this.isAddBuyer = true;
  }

  showAllDailyReports() {
    this.ngOnInit();
    this.isSeeCompanies = false;
    this.isShowDailyReport = true;

  }

  changePassword() {
    localStorage.setItem("returnPage", "admin");
    this.router.navigate(['chpass']);
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['adminlogin']);
  }

  // ***** Ovo je za SeeCompanies *****

  allCompanies: User[] = [];

  showAllCompanies() {
    this.userService.getCompanies().subscribe((companies: User[])=>{
      this.allCompanies = companies;
    })
  }

  activateUser(u: User) {
    this.userService.activateUser(u.username).subscribe(res=>{
      console.log(res);
      this.userService.getCompanies().subscribe((companies: User[])=>{
        this.allCompanies = companies;
      })
    })
  }

  deactivateUser(u: User) {
    this.userService.deactivateUser(u.username).subscribe(res=>{
      console.log(res);
      this.userService.getCompanies().subscribe((companies: User[])=>{
        this.allCompanies = companies;
      })
    })
  }

  // ***** Ovo je za AcceptUser *****
  acceptUser(u: User) {
    this.userService.acceptUser(u.username).subscribe(res=>{
      console.log(res);
      this.userService.getAllRequests().subscribe((users: User[])=>{
        this.unacceptedUsers = users;
      })
    })
  }

  declineUser(u: User) {
    this.userService.declineUser(u.username).subscribe(res=>{
      console.log(res);
      this.userService.getAllRequests().subscribe((users: User[])=>{
        this.unacceptedUsers = users;
      })
    })
  }

    // ***** Ovo je za RegisterCompanies *****

    firstname: string;
    lastname: string;
    username: string;
    password1: string;
    password2: string;
    type: number;
    phone: string;
    email: string;
    comname: string;
    address: string;
    pib: string;
    comnumber: number;
    isAccepted: number = 1;
    isActivated: boolean = true;
    isFirstLogin: boolean = true;
    selectedFile: ImageSnippet;

    message: string;

    register() {
      this.userService.checkUsername(this.username).subscribe((respObj)=>{
        if (respObj["message"] == "found") {
          this.message = "Sorry, that username is taken, try another one!";
        } else {
          this.userService.checkEmail(this.email).subscribe((respObj)=>{
            if (respObj["message"] == "found") {
              this.message = "Oops! You already have an account with that email!";
            } else {
              if (this.password1 != this.password2) this.message = "Reentered password doesn't match!";
              this.userService.register(this.firstname, this.lastname, this.username, this.password1, 2, this.phone, this.email, this.comname, 
              this.address, this.pib, this.comnumber, this.isAccepted, this.isActivated, this.isFirstLogin, this.selectedFile).subscribe(respObj=>{
              if(respObj['message']=='ok'){
                this.message = 'Company added successfully!';
              }
              else{
                this.message = 'Error!';
              }
              });
            }
          });
        }
      });
    }


  // ***** Ovo je za AddBuyers *****

  numLK: string;

  addBuyer() {
    if (this.password1 != this.password2) this.message = "Reentered password doesn't match!";
    this.userService.registerBuyer(this.firstname, this.lastname, this.username, this.password1, 1, this.phone,
       this.numLK).subscribe(respObj=>{
    if(respObj['message']=='ok'){
      this.message = 'Buyer added successfully!';
    }
    else{
      this.message = 'Error!';
    }
  });
  }

  searchedCompanies: User[] = [];
  searchedName: string;
  searchedPib: string;

  search() {
    this.array = [];
    this.message = "";
    let d1 = new Date(this.from);
    let d2 = new Date(this.to);
    if (d1 > d2) {
      this.message = "Date from cannot be after date to!";
    }
    else {
      if (this.searchedName && this.searchedPib) {
        this.companyService.searchCompaniesByPIBAndName(this.searchedPib, this.searchedName).subscribe((companies: User[])=>{
          this.searchedCompanies = companies;
          this.helpFunction();
        })
      }
      else if (!this.searchedName && this.searchedPib) {
        this.companyService.searchCompaniesByPIB(this.searchedPib).subscribe((companies: User[])=>{
          this.searchedCompanies = companies;
          this.helpFunction();
        })
      }
      else if (this.searchedName && !this.searchedPib) {
        this.companyService.searchCompaniesByName(this.searchedName).subscribe((companies: User[])=>{
          this.searchedCompanies = companies;
          this.helpFunction();
        })
      }
      else {
        this.searchedCompanies = this.allCompanies;
        this.helpFunction();
      }


    }
  }

  helpFunction() {
    let d1 = new Date(this.from);
    let d2 = new Date(this.to);
    for (let i in this.searchedCompanies) {
      this.receiptService.getAllClosedReceipts(this.searchedCompanies[i].idCom).subscribe((receipts: Receipt[])=>{
        let sum = 0;
        let pdv = 0;
        for (let j in receipts) {
          let str = JSON.stringify(receipts[j].dateOfReceipt);
          let d = new Date(str);
          if (d >= d1 && d <= d2) {
            sum += receipts[j].totalValue;
            if (this.searchedCompanies[i].isPDV) {
              for (let z in receipts[j].items) {
                pdv += receipts[j].items[z].amount * (receipts[j].items[z].price * receipts[j].items[z].pdvPercent / 100)
              }
            }
          }
        }
        this.array.push({comname: this.searchedCompanies[i].comname, pib: this.searchedCompanies[i].pib, totalValue: sum, pdv: pdv})
      })
    }
  }


  // navigate() {
  //   this.router.navigate(["chpass", {username: }]);
  // }
}
