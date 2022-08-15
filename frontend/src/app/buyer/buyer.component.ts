import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CompanyService } from 'src/services/company.service';
import { ItemService } from 'src/services/item.service';
import { UserService } from 'src/services/user.service';
import { Item } from '../models/item';
import { User } from '../models/user';
import { Warehouse } from '../models/warehouse';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService, private userService: UserService, private itemService: ItemService) { }
  private observe = new BehaviorSubject([]);
  observer = this.observe.asObservable();
  ngOnInit(): void {
    this.buyerFirstname = localStorage.getItem("firstname");
    this.buyerLastname = localStorage.getItem("lastname");
    this.isShow = false;
    this.userService.getCompanies().subscribe((companies: User[])=>{
      this.allCompanies = companies;
      for (let i in this.allCompanies) {
        this.companyService.getAllWarehouses(this.allCompanies[i].idCom).subscribe((warehouses: Warehouse[])=>{
          let arr = [];
          let arr2 = [];
          for (let j in this.allCompanies[i].items) {
            arr = [];
            for (let z in warehouses) {
              for (let y in warehouses[z].itemsInfo) {
                if (this.allCompanies[i].items[j].idIte == warehouses[z].itemsInfo[y].idIte) {
                  arr.push({war: warehouses[z], price: warehouses[z].itemsInfo[y].sellingPrice});
                }
              }
            }
            arr2.push({item: this.allCompanies[i].items[j], ar: arr});
          }

          this.array.push({comname: this.allCompanies[i].comname, address: this.allCompanies[i].address, arr1: arr2})
          //this.observe.next({comn: this.allCompanies[i].comname, add: this.allCompanies[i].address, arr1: arr2} as any);
          this.searchedCompanies = this.array;

        })  // get warehouses
      }
      
    })  // get companies
  }

  // ngAfterViewInit() {
  //   this.observer.subscribe((itemLoaded: any)=>{
  //     console.log("itemLoaded ")
  //     console.log(itemLoaded);
  //     this.array.push({comname: itemLoaded.comn, address: itemLoaded.add, arr1: itemLoaded.arr1})
  //     console.log("zadnji array");
  //     console.log(this.array);
  //   })
  // }

  buyerFirstname: string;
  buyerLastname: string;
  allCompanies: User[] = [];
  array = [];
  selectedCompany;
  isShow: boolean;
  searchItName: string;
  searchItManufacturer: string;
  searchedCompanies = [];

  seeCompanies() {
  }

  search() {
    if (!this.searchItName && !this.searchItManufacturer) {
      this.searchedCompanies = this.array;
    }
    else if (this.searchItName && !this.searchItManufacturer) {
      this.searchedCompanies = [];
      for (let i in this.array) {
        for (let j in this.array[i].arr1) {
          if (this.array[i].arr1[j].item.itemName == this.searchItName) {
            this.searchedCompanies.push(this.array[i]);
            break;
          }
        }
      }
    }
    else if (!this.searchItName && this.searchItManufacturer) {
      this.searchedCompanies = [];
      for (let i in this.array) {
        for (let j in this.array[i].arr1) {
          if (this.array[i].arr1[j].item.manufacturer == this.searchItManufacturer) {
            this.searchedCompanies.push(this.array[i]);
            break;
          }
        }
      }
    }
    else {  // this.searchItName && this.searchItManufacturer
      this.searchedCompanies = [];
      for (let i in this.array) {
        for (let j in this.array[i].arr1) {
          if (this.array[i].arr1[j].item.manufacturer == this.searchItManufacturer
              && this.array[i].arr1[j].item.itemName == this.searchItName) {
            this.searchedCompanies.push(this.array[i]);
            break;
          }
        }
      }
    }
  }

  show(i) {
    // this.selectedCompany = i;
    this.isShow = true;
    this.selectedCompany = this.array[i];
  }

  seeAccounts() {
    localStorage.setItem("returnPage", "buyer");
    this.router.navigate(['accounts']);
  }

  changePassword() {
    localStorage.setItem("returnPage", "buyer");
    this.router.navigate(['chpass']);
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
