import { DatePipe } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';
import { CategoryService } from 'src/services/category.service';
import { CompanyService } from 'src/services/company.service';
import { ItemService } from 'src/services/item.service';
import { ReceiptService } from 'src/services/receipt.service';
import { RegisterService } from 'src/services/register.service';
import { TableService } from 'src/services/table.service';
import { UserService } from 'src/services/user.service';
import { WarehouseService } from 'src/services/warehouse.service';
import { AddItemReceiptDialogComponent } from '../add-item-receipt-dialog/add-item-receipt-dialog.component';
import { AddTableDialogComponent } from '../add-table-dialog/add-table-dialog.component';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { CloseReceiptDialogComponent } from '../close-receipt-dialog/close-receipt-dialog.component';
import { Account } from '../models/account';
import { Item } from '../models/item';
import { ItemData } from '../models/itemData';
import { Receipt } from '../models/receipt';
import { Register } from '../models/register';
import { Table } from '../models/table';
import { User } from '../models/user';
import { Warehouse } from '../models/warehouse';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;


  constructor(private router: Router, private companyService: CompanyService, private userService: UserService,
    private warehouseService: WarehouseService, private accountService: AccountService, private registerService: RegisterService
    , private itemService: ItemService, private categoryService: CategoryService, private dialog: MatDialog, private renderer: Renderer2,
    private ngZone: NgZone, private tableService: TableService, private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.isSeeAllInfo = true;
    this.isOrderers = false;
    this.isGoodsAndServices = false;
    this.isOrderOfArticles = false;
    this.isOrderOfTables = false;
    this.isInvoicing = false;
    this.isReportReview = false;

    this.isBasicInfo = true;
    this.isAccounts = false;
    this.isWarehouses = false;
    this.isCashRegisters = false;
    this.companyFirstname = localStorage.getItem("firstname");
    this.companyLastname = localStorage.getItem("lastname");
    this.companyUsername = localStorage.getItem("username");
    this.companyId = JSON.parse(localStorage.getItem("id"));
    this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
      this.companyData = company;
      this.ugostitelj = (this.companyData[0].category == "ugostitelj");
      this.imageUrl = this.companyData[0].image;
    })
    this.itemsPerPage = 10;
    this.isGeneralInfo = true;
    this.isPricesAndConditions = false;

  }

  companyFirstname: string;
  companyLastname: string;
  companyUsername: string;
  companyId: number;
  info: string;
  isSeeAllInfo: boolean;
  isOrderers: boolean;
  isGoodsAndServices: boolean;
  isOrderOfArticles: boolean;
  isOrderOfTables: boolean;
  isInvoicing: boolean;
  isReportReview: boolean;
  imageUrl;

  changePassword() {
    localStorage.setItem("returnPage", "company");
    this.router.navigate(['chpass']);
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  seeAllInfo() {
    this.ngOnInit();
    this.isSeeAllInfo = true;
  }

  isBasicInfo: boolean;
  isAccounts: boolean;
  isWarehouses: boolean;
  isCashRegisters: boolean;
  companyData: User[] = [];


  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  email: string;
  comname: string;
  address: string;
  pib: string;
  comnumber: number;
  category: string;
  activityCipher: Array<string>;  // keeps cipher field of Cipher
  isPDV: boolean;
  numOfAccounts: number;  // default: 1
  numOfWarehouses: number; // default: 1
  numOfRegisters: number; // default: 1
  // image: string;

  basicInfo() {
    this.ngOnInit();
    this.isBasicInfo = true;

  }

  onChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    if(tab ==="Basic info") {
      this.ngOnInit();
      this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
        this.companyData = company;
      })
      this.isBasicInfo = true;
    }
    else if (tab === "Accounts") {
      this.ngOnInit();
      this.getAllAccounts();
      this.isBasicInfo = false;
      this.isAccounts = true;
    }
    else if (tab === "Warehouses") {
      this.ngOnInit();
      this.getAllWarehouses();
      this.isBasicInfo = false;
      this.isWarehouses = true;
    }
    else {
      this.ngOnInit();
      this.getAllRegisters();
      this.isBasicInfo = false;
      this.isCashRegisters = true;
    }
  }

// ***** This is for basicInfo *****

  messageF: string;
  messageL: string;
  messageP: string;
  messageE: string;
  messageU: string;
  messageComname: string;
  messageAddress: string;
  messagePIB: string;
  messageComnumber: string;
  messagePDV: string;


  changeFirstname() {
    this.companyService.changeFirstname(this.companyUsername, this.firstname).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.messageF = "Added successfully!";
        this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
          this.companyData = company;
        })
      }
      else this.messageF = "Error!";
    })
  }

  changeLastname() {
    this.companyService.changeLastname(this.companyUsername, this.lastname).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.messageL = "Added successfully!";
        this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
          this.companyData = company;
        })
      }
      else this.messageL = "Error!";
    })
  }

  changePhone() {
    this.companyService.changePhone(this.companyUsername, this.phone).subscribe(respObj=>{
      if (respObj["message"] == "ok") { 
        this.messageP = "Added successfully!";
        this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
          this.companyData = company;
        })
      }
      else this.messageP = "Error!";
    })
  }

  changeEmail() {
    if (this.companyData[0].email == this.email) this.messageE = "New email cannot be the same as old!";
    else {
      this.userService.checkEmail(this.email).subscribe(respObj=>{
        if (respObj["message"] == "found") {
          this.messageE = "Oops! You already have an account with that email!";
        } else {
          this.companyService.changeEmail(this.companyUsername, this.email).subscribe(respObj=>{
            if (respObj["message"] == "ok") { 
              this.messageE = "Added successfully!";
              this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
                this.companyData = company;
              })
            }
            else this.messageE = "Error!";
          })
        }
      })
    }
  }

  changeUsername() {
    if (this.companyData[0].username == this.username) this.messageU = "New username cannot be the same as old!";
    else {
      this.userService.checkUsername(this.username).subscribe(respObj=>{
        if (respObj["message"] == "found") {
          this.messageU = "Sorry, that username is taken, try another one!";
        } else {
          this.companyService.changeUsername(this.companyUsername, this.username).subscribe(respObj=>{
            if (respObj["message"] == "ok") { 
              this.messageU = "Added successfully!";
              this.companyUsername = this.username;
              this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
                this.companyData = company;
              })
            }
            else this.messageU = "Error!";
          })
        }
      })
    }
  }

  changeComname() {
    this.companyService.changeComname(this.companyUsername, this.comname).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.messageComname = "Added successfully!";
        this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
          this.companyData = company;
        })
      }
      else this.messageComname = "Error!";
    })
  }

  changeAddress() {
    this.companyService.changeAddress(this.companyUsername, this.address).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.messageAddress = "Added successfully!";
        this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
          this.companyData = company;
        })
      }
      else this.messageAddress = "Error!";
    })
  }

  changePIB() {
    this.companyService.changePIB(this.companyUsername, this.pib).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.messagePIB = "Added successfully!";
        this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
          this.companyData = company;
        })
      }
      else this.messagePIB = "Error!";
    })
  }

  changeComnumber() {
    this.companyService.changeComnumber(this.companyUsername, this.comnumber).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.messageComnumber = "Added successfully!";
        this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
          this.companyData = company;
        })
      }
      else this.messageComnumber = "Error!";
    })
  }


  changePDV() {
    this.companyService.changePDV(this.companyUsername, this.isPDV).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.messagePDV = "Added successfully!";
        this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
          this.companyData = company;
        })
      }
      else this.messagePDV = "Error!";
    })
  }

  allAccounts: Account[] = [];
  allWarehouses: Warehouse[] = [];
  allRegisters: Register[] = [];
  message: string;

  getAllAccounts() {
    this.companyService.getAllAccounts(this.companyId).subscribe((accounts: Account[])=>{
      this.allAccounts = accounts;
    })
  }

  getAllWarehouses() {
    this.companyService.getAllWarehouses(this.companyId).subscribe((warehouses: Warehouse[])=>{
      this.allWarehouses = warehouses;
    })
  }

  getAllRegisters() {
    this.companyService.getAllRegisters(this.companyId).subscribe((registers: Register[])=>{
      this.allRegisters = registers;
    })
  }

  deleteAccount(idAcc) {
    this.messageAcc = "";
    this.accountService.deleteAccount(idAcc, this.companyId).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.message = "Deleted!";
        this.getAllAccounts();
      }
      else this.message = "Error!";
    })
  }

  deleteWarehouse(idWar) {
    this.messageWar = "";
    this.warehouseService.deleteWarehouse(idWar, this.companyId).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.message = "Deleted!";
        this.getAllWarehouses();
      }
      else this.message = "Error!";
    })
  }

  deleteRegister(idReg) {
    this.messageReg = "";
    this.registerService.deleteRegister(idReg, this.companyId).subscribe(respObj=>{
      if (respObj["message"] == "ok") {
        this.message = "Deleted!";
        this.getAllRegisters();
      }
      else this.message = "Error!";
    })
  }

  accNumber: string;
  bank: string;
  messageAcc: string;

  addAccount() {
    this.message = "";
    if (!this.accNumber) this.messageAcc = "Number of account is required!\n";
    else if (!this.bank) this.messageAcc = "Bank is required!";
    else {
      this.accountService.addAccount(this.accNumber, this.bank, this.companyId).subscribe(respObj=>{
        if (respObj["message"] == "ok") {
          this.messageAcc = "Account added!";
          this.getAllAccounts();
        }
        else this.messageAcc = "Error!";
      })

    }
  }

  warName: string;
  messageWar:string;

  addWarehouse() {
    this.message = "";
    if (!this.warName) this.messageWar = "Name is required!";
    else {
      this.warehouseService.addWarehouse(this.warName, this.companyId).subscribe(respObj=>{
        if (respObj["message"] == "ok") {
          this.messageWar = "Warehouse added!";
          this.getAllWarehouses();
        }
        else this.messageWar = "Error!";
      })
    }
  }

  locationOfRegister: string;
  typeOfRegister: string;
  messageReg: string;

  addRegister() {
    this.message = "";
    if (!this.locationOfRegister) this.messageReg = "Location of register is required!";
    else {
      this.registerService.addRegister(this.locationOfRegister, this.typeOfRegister, this.companyId).subscribe(respObj=>{
        if (respObj["message"] == "ok") {
          this.messageReg = "Register added!";
          this.getAllRegisters();
        }
        else this.messageReg = "Error!";
      })
    }
  }

  // ***** Orderers *****

  searchParam: string;
  searchedCompanies: User[] = [];
  selectedIdCom: number;
  password1: string;
  password2: string;
  discount: number;
  numOfDays: number;
  messageO: string;

  orderers() {
    this.ngOnInit();
    this.isSeeAllInfo = false;
    this.isOrderers = true;
  }

  search() {
    this.companyService.searchCompaniesByPIB(this.searchParam).subscribe((companies: User[])=>{
      this.searchedCompanies = companies;
    })
  }

  addOrderer() {
    if (!this.selectedIdCom) this.messageO = "Please select company!";
    else if (!this.numOfDays) this.messageO = "Number of days is required!"
    else if (!this.discount) this.messageO = "Discount is required!";
    else if (this.companyId == this.selectedIdCom) this.messageO = "You cannot choose yourself!";
    else {
      this.companyService.addOrderer(this.companyId, this.selectedIdCom, this.numOfDays, this.discount).subscribe(respObj=>{
        if (respObj["message"] == "ok") this.messageO = "Added successfully!";
        else if (respObj["message"] == "error") this.messageO = "Orderer already added!";
        else this.messageO = "Error!";
      })
    }
  }


  register(){
    if (this.companyId == this.selectedIdCom) {
      this.message = "You cannot choose yourself!";
    } else {
      this.userService.checkUsername(this.username).subscribe((respObj)=>{
        if (respObj["message"] == "found") {
          this.message = "Sorry, that username is taken, try another one!";
        }
        else {
          this.userService.checkEmail(this.email).subscribe((respObj)=>{
            if (respObj["message"] == "found") {
              this.message = "Oops! You already have an account with that email!";
            } else {
              if (this.password1 != this.password2) this.message = "Reentered password doesn't match!";
              this.userService.register(this.firstname, this.lastname, this.username, this.password1, 2, this.phone, this.email, this.comname, 
                this.address, this.pib, this.comnumber, false, false, true, null).subscribe(respObj=>{
                if(respObj['message']=='ok'){
                  this.companyService.addOrderer(this.companyId, 0, this.numOfDays, this.discount).subscribe(respObj=>{
                    if (respObj["message"] == "ok") this.message = "Orderer added successfully!";
                    else if (respObj["message"] == "error") this.message = "Orderer already added!";
                    else this.message = "Error!";
                  })
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
    


  }

  // ***** Goods and services *****

  allItems: Item[] = [];
  showItems: Item[] = [];
  page: number = 1;
  itemsPerPage: number;

  itemCipher: string;
  itemName: string;
  unitOfMeasure: string;
  taxRate: string = "opsta";    // opsta 20%, posebna 10%, nema 0%
  type: string;   // kod ugostitelja hrana/pice/sirovina
  ugostitelj: boolean;

  // dopunski podaci
  originCountry: string;
  foreignName: string;
  barCode: string;
  nameOfManufacturer: string;
  customsTariff: number; // u %
  ecoTax: boolean;
  exciseTax: boolean;
  description: string;
  declaration: string;
  minStock: number;
  maxStock: number;

  isGeneralInfo: boolean;
  isPricesAndConditions: boolean;
  itemInfos: ItemData[][] = [];
  messageTable: string;
  selectedItems: Item[] = []
  isAllItems: boolean;
  image: string;


  goodsAndServices() {
    this.ngOnInit();
    this.getAllItems();
    this.page = 1;
    this.isSeeAllInfo = false;
    this.isGoodsAndServices = true;
  }

  onChange2(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    if (tab ==="Enter informations") {
      this.isPricesAndConditions = false;
      this.isGeneralInfo = true;
    }
    else {
      this.getAllWarehouses();
      this.isGeneralInfo = false;
      this.isPricesAndConditions = true;
    }
  }

  getAllItems() {
    this.itemService.getAllItems().subscribe((items: Item[])=>{
      this.allItems = items;
      this.selectedItems = this.allItems;
      this.isAllItems = true;
    })
  }
  

  allItemsButton() {
    this.selectedItems = this.allItems;
    this.isAllItems = true;
  }

  companyItems() {
    this.selectedItems = [];
    this.isAllItems = false;
    for (let i in this.companyData[0].items) {
      for (let j in this.allItems) {
        if (this.companyData[0].items[i].idIte == this.allItems[j].idIte) {
          console.log(this.allItems[j]);
          this.selectedItems.push(this.allItems[j]);
          break;
        }
      }
    }
  }

  deleteItem(obj) {
    this.message = "";
    console.log(obj.idIte);
    if (confirm('Are you sure you want to delete item?')) {
      this.itemService.deleteItem(obj.idIte, this.companyId).subscribe(resp=>{
        if (resp["message"] == "ok") {
          this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
            this.companyData = company;
            this.ugostitelj = (this.companyData[0].category == "ugostitelj");
            this.imageUrl = this.companyData[0].image;
            this.companyItems();
          })
          this.messageTable = "Deleted successfully!";
        }
        
        else this.messageTable = "Error!";
      })
    }
  }

  idIte: number;
  isEditing: boolean = false;
  isAdding: boolean = false;

  showEditForm(obj) {
    this.idIte = obj.idIte;
    this.itemCipher = obj.itemCipher;
    this.itemName = obj.itemName;
    this.unitOfMeasure = obj.unitOfMeasure;
    this.taxRate = obj.taxRate;
    this.type = obj.type;
    this.originCountry = obj.originCountry;
    this.foreignName = obj.foreignName;
    this.barCode = obj.barCode;
    this.nameOfManufacturer = obj.nameOfManufacturer;
    this.customsTariff = obj.customsTariff;
    this.ecoTax = obj.ecoTax;
    this.exciseTax = obj.exciseTax;
    this.description = obj.description;
    this.declaration = obj.declaration;
    this.minStock = obj.minStock;
    this.maxStock = obj.maxStock;
    this.image = obj.image;
    this.isEditing = true;
  }

  editItem() {
    if (this.isEditing) {
      this.itemService.updateItem(this.idIte, this.itemCipher, this.itemName, this.unitOfMeasure, this.taxRate, this.type, this.originCountry
        , this.foreignName, this.barCode, this.nameOfManufacturer, this.customsTariff, this.ecoTax, this.exciseTax, this.description
        , this.declaration, this.minStock, this.maxStock, this.companyId, this.image).subscribe(resp=>{
          if (resp["message"] == "ok") {
            this.getAllItems();
            this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
              this.companyData = company;
              this.ugostitelj = (this.companyData[0].category == "ugostitelj");
              this.imageUrl = this.companyData[0].image;
            })
            this.message = "Updated successfully!";
          }
          
          else this.message = "Error!";
        })
    }

  }

  addItemToCompany(i) {
    this.showEditForm(i);
    this.isEditing = false;
    this.isAdding = true;
    this.itemService.addItemToCompany(this.companyId, this.idIte, this.itemName, this.nameOfManufacturer, 
      this.minStock, this.maxStock).subscribe(resp=>{
      if (resp["message"] == "ok") {
        this.message = "Item added to company successfully!";
        this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
          this.companyData = company;
          this.ugostitelj = (this.companyData[0].category == "ugostitelj");
          this.imageUrl = this.companyData[0].image;
        })
      }
      else this.message = "Error!";
    })

  }

  
  processFile(imageInput) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    // if (!file.name.match(/\.(jpg|png)$/)) {
    //   this.message = "Invalid image type, only jpg and png are allowed!";
    // }
    // else {
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.image = reader.result as string;

      
    // }
    
    }
  }

  addItem() {
    if (!this.isEditing && !this.isAdding) {
      this.messageTable = "";
      this.itemService.addItem(this.itemCipher, this.itemName, this.unitOfMeasure, this.taxRate, this.type, this.originCountry
        , this.foreignName, this.barCode, this.nameOfManufacturer, this.customsTariff, this.ecoTax, this.exciseTax, this.description
        , this.declaration, this.minStock, this.maxStock, this.companyId, this.image).subscribe(resp=>{
        if (resp["message"] == "ok") {
          this.getAllItems();
          this.companyService.getAllCompanyData(this.companyUsername).subscribe((company: User[])=>{
            this.companyData = company;
            this.ugostitelj = (this.companyData[0].category == "ugostitelj");
            this.imageUrl = this.companyData[0].image;
          })
          this.message = "Item added successfully!";
        }
        else this.message = "Error!";
      })
    } else {
      this.editItem();
    }
    
  }




  // ***** Order of Articles *****

  catName: string;
  subcategory: string;
  messageCat: string;
  subcategories: Array<string> = [];

  orderOfArticles() {
    this.ngOnInit();
    this.isSeeAllInfo = false;
    this.isOrderOfArticles = true;
  }

  addSubcategory() {
    this.message = "";
    this.subcategories.push(this.subcategory);
    this.messageCat = "Subcategory added successfully!";
  }

  addCategory() {
    this.messageCat = "";
    this.categoryService.addCategory(this.catName, this.subcategories).subscribe((resp)=>{
      if (resp["message"] == "ok") {
        this.message = "Added successfully!";
        this.subcategories = [];
      }
      else this.message = "Error!";
    })
  }
  
  openDialog(): void {
    this.itemService.getAllItems().subscribe((items: Item[])=>{
      this.allItems = items;
      let dialogRef = this.dialog.open(CategoryDialogComponent, {
        panelClass: 'my-dialog',
        data: { }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    })
  }


  // ***** Order of Tables *****
  
  tables: Table[] = [];
  
  confirmedPos = [ 0, 0 ];
  dragging = false;
  dragStartPos = [ 0, 0 ];
  dragMovePos = [ ...this.confirmedPos ];
  

  wCanvas;
  hCanvas;

  makeListeners() {
    this.tableService.getAllTables(this.companyId, this.selectedObjectId, this.selectedDepartment).subscribe((tables: Table[])=>{
      this.tables = tables;
      this.ctx.save(); this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.wCanvas, this.hCanvas); this.ctx.restore();
      for (let i in this.tables) {
        this.drawTable(this.tables[i].idTab, this.tables[i].shape, this.tables[i].xPos, this.tables[i].yPos, this.tables[i].width, 
          this.tables[i].length, this.tables[i].radius, this.tables[i].occupied);
      }
      this.canvas.nativeElement.onmousedown = ({ clientX: x, clientY: y }) => {
        // since x and y are mouse coordinates are not relative to canvas
        if (!this.isAddTable) {
          const rect = this.canvas.nativeElement.getBoundingClientRect();
          const xRel = x - rect.left;
          const yRel = y - rect.top;
          for (let i in this.tables) {
            if (this.tables[i].shape == "circle") {
              let distance = this.calculateDistance(xRel, yRel, this.tables[i].xPos, this.tables[i].yPos);
              if (distance < this.tables[i].radius) {
                this.draggedTable = this.tables[i];
                this.dragging = true; this.dragStartPos = [xRel, yRel];
              }
            }
            else {  // if it is rectangle
              if (xRel > (this.tables[i].xPos - this.tables[i].width/2) && xRel < (this.tables[i].xPos + this.tables[i].width/2) 
              && yRel > (this.tables[i].yPos - this.tables[i].length/2) && yRel < (this.tables[i].yPos + this.tables[i].length/2)) {  
                // is the mouse inside of a rectangle?
                    this.draggedTable = this.tables[i];
                    this.dragging = true; this.dragStartPos = [xRel, yRel];
                  }
            }
          } // end of for
        }

      };

      this.canvas.nativeElement.onmouseup = (event) => {
        this.dragging = false; this.confirmedPos = [...this.dragMovePos];
        const rect = this.canvas.nativeElement.getBoundingClientRect();
        const xRel = event.clientX - rect.left;
        const yRel = event.ClientY - rect.top;
        let overlap = false;
        for (let i in this.tables) {  // check if there is overlap with some other table
          // overlap = false;
          if (this.tables[i] != this.draggedTable) {
            if (this.draggedTable.shape == "circle" && this.tables[i].shape == "circle") {
              overlap = this.intersectOfCircleAndCircle(this.draggedTable, this.tables[i]);
            }
            else if (this.draggedTable.shape == "circle" && this.tables[i].shape == "rectangle") {
              overlap = this.intersectOfCircleAndRectangle(this.draggedTable, this.tables[i]);
            }
              
            else if (this.draggedTable.shape == "rectangle" && this.tables[i].shape == "circle") {
              overlap = this.intersectOfRectangleAndCircle(this.draggedTable, this.tables[i]);
            }
            else 
              overlap = this.intersectOfRectangleAndRectangle(this.draggedTable, this.tables[i]);
            if (overlap) {
              break;   
            }
          }
          
        }
        if (!overlap) {
          if (this.isAddTable) {
            this.isAddTable = false;
            this.tableService.addTable(this.draggedTable.shape, this.dragMovePos[0], this.dragMovePos[1], this.draggedTable.radius,
              this.draggedTable.width, this.draggedTable.length, false, this.selectedDepartment, this.companyId, 
              this.selectedObjectId, this.selectedObject.name).subscribe(resp=>{
              if (resp["message"] == "ok") {
                this.tableService.getAllTables(this.companyId, this.selectedObjectId, this.selectedDepartment).subscribe((tables: Table[])=>{
                  this.tables = tables;
                  // delete canvas and paint all tables again
                  this.ctx.save(); this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                  this.ctx.clearRect(0, 0, this.wCanvas, this.hCanvas); this.ctx.restore();
                  for (let i in this.tables) {
                   // if (tables[i] != this.draggedTable)
                    this.drawTable(this.tables[i].idTab, this.tables[i].shape, this.tables[i].xPos, this.tables[i].yPos, this.tables[i].width, 
                      this.tables[i].length, this.tables[i].radius, this.tables[i].occupied);
                  }
                  //this.drawOnChange(this.draggedTable.shape, this.draggedTable.width, this.draggedTable.length, this.draggedTable.radius);
                })
              }
            })
          }
          else {
            this.tableService.updateTable(this.draggedTable.idTab, this.dragMovePos[0], this.dragMovePos[1]).subscribe(resp=>{
              if (resp["message"] == "ok") {
                this.tableService.getAllTables(this.companyId, this.selectedObjectId, this.selectedDepartment).subscribe((tables: Table[])=>{
                  this.tables = tables;
                  // delete canvas and paint all tables again
                  this.ctx.save(); this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                  this.ctx.clearRect(0, 0, this.wCanvas, this.hCanvas); this.ctx.restore();
                  for (let i in this.tables) {
                   // if (tables[i] != this.draggedTable)
                    this.drawTable(this.tables[i].idTab, this.tables[i].shape, this.tables[i].xPos, this.tables[i].yPos, this.tables[i].width, 
                      this.tables[i].length, this.tables[i].radius, this.tables[i].occupied);
                  }
                  //this.drawOnChange(this.draggedTable.shape, this.draggedTable.width, this.draggedTable.length, this.draggedTable.radius);
                })
              }
            })
          }
        }
        else {
          this.isAddTable = false;
          this.ctx.save(); this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          this.ctx.clearRect(0, 0, this.wCanvas, this.hCanvas); this.ctx.restore();
          for (let i in this.tables) {
            this.drawTable(this.tables[i].idTab, this.tables[i].shape, this.tables[i].xPos, this.tables[i].yPos, this.tables[i].width, 
            this.tables[i].length, this.tables[i].radius, this.tables[i].occupied);
          }
        }


      };

      this.canvas.nativeElement.onmouseleave = () => {
      };
  
      this.canvas.nativeElement.onmousemove = (event) => {
        event.preventDefault();
        if (!this.dragging) return;
        let dragMarginX, dragMarginY;
        if (this.draggedTable.shape == "circle") {
          dragMarginX = this.wCanvas - this.draggedTable.radius;
          dragMarginY = this.hCanvas - this.draggedTable.radius;
        } else {
          dragMarginX = this.wCanvas - this.draggedTable.width/2;
          dragMarginY = this.hCanvas - this.draggedTable.length/2;
        }
  
        const {clientX: x, clientY: y} = event;
        const rect = this.canvas.nativeElement.getBoundingClientRect();
        const xRel = x - rect.left;
        const yRel = y - rect.top;
        const tx = xRel;
        const ty = yRel;
        // const tx = this.confirmedPos[0] + (this.dragStartPos[0] - xRel);
        // const ty = this.confirmedPos[1] + (this.dragStartPos[1] - yRel);
        if (this.draggedTable.shape == "circle") {
          this.dragMovePos[0] = tx <= this.draggedTable.radius ? this.draggedTable.radius : (tx >= dragMarginX ? dragMarginX : tx);
          this.dragMovePos[1] = ty <= this.draggedTable.radius ? this.draggedTable.radius : (ty >= dragMarginY ? dragMarginY : ty);
        } else {
          this.dragMovePos[0] = tx <= this.draggedTable.width/2 ? this.draggedTable.width/2 : (tx >= dragMarginX ? dragMarginX : tx);
          this.dragMovePos[1] = ty <= this.draggedTable.length/2 ? this.draggedTable.length/2 : (ty >= dragMarginY ? dragMarginY : ty);
        }
        

        this.ctx.save(); this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.wCanvas, this.hCanvas); this.ctx.restore();
        for (let i in this.tables) {
          if (this.tables[i] != this.draggedTable)
          this.drawTable(this.tables[i].idTab, this.tables[i].shape, this.tables[i].xPos, this.tables[i].yPos, this.tables[i].width, 
            this.tables[i].length, this.tables[i].radius, this.tables[i].occupied);
        }
        this.drawOnChange(this.draggedTable.idTab, this.draggedTable.shape, this.draggedTable.width, this.draggedTable.length, 
          this.draggedTable.radius, this.draggedTable.occupied);
      };
    })
  }

  intersectOfCircleAndCircle(circle1: Table, circle2: Table) {
    return (this.calculateDistance(this.dragMovePos[0], this.dragMovePos[1], circle2.xPos, circle2.yPos) 
      < (Number(circle1.radius) + Number(circle2.radius)))
  }

  intersectOfRectangleAndCircle(rect: Table, circle: Table) {
    let circleDistanceX = Math.abs(circle.xPos - this.dragMovePos[0]);
    let circleDistanceY = Math.abs(circle.yPos - this.dragMovePos[1]);

    if (circleDistanceX > (Number(rect.width)/2 + Number(circle.radius))) return false; 
    if (circleDistanceY > (Number(rect.length)/2 + Number(circle.radius))) return false;

    if (circleDistanceX <= (Number(rect.width)/2)) return true;
    if (circleDistanceY <= (Number(rect.length)/2)) return true;

    let cornerDistance = Math.pow((circleDistanceX - Number(rect.width)/2),2) + Math.pow((circleDistanceY - Number(rect.length)/2), 2);

    return (cornerDistance <= (Math.pow(Number(circle.radius), 2)));
  }

  intersectOfCircleAndRectangle(circle: Table, rect: Table) {
    let circleDistanceX = Math.abs(this.dragMovePos[0] - rect.xPos);
    let circleDistanceY = Math.abs(this.dragMovePos[1] - rect.yPos);

    if (circleDistanceX > (Number(rect.width)/2 + Number(circle.radius))) return false; 
    if (circleDistanceY > (Number(rect.length)/2 + Number(circle.radius))) return false;

    if (circleDistanceX <= (Number(rect.width)/2)) return true;
    if (circleDistanceY <= (Number(rect.length)/2)) return true;

    let cornerDistance = Math.pow((circleDistanceX - Number(rect.width)/2),2) + Math.pow((circleDistanceY - Number(rect.length)/2), 2);

    return (cornerDistance <= (Math.pow(Number(circle.radius), 2)));
  }

  intersectOfRectangleAndRectangle(rect1: Table, rect2: Table) {
    let distanceX = Math.abs(this.dragMovePos[0] - rect2.xPos);
    let distanceY = Math.abs(this.dragMovePos[1] - rect2.yPos);

    if (distanceX > Number(rect1.width)/2 + Number(rect2.width)/2) return false;
    if (distanceY > Number(rect1.length)/2 + Number(rect2.length)/2) return false;

    if (distanceX <= Number(rect1.width)/2 + Number(rect2.width)/2) return true;
    if (distanceY <= Number(rect1.length)/2 + Number(rect2.length)/2) return true;
    return false;
  }

  calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }


  orderOfTables() {
    this.ngOnInit();
    this.isSeeAllInfo = false;
    this.isOrderOfTables = true;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.wCanvas = this.canvas.nativeElement.width;
    this.hCanvas = this.canvas.nativeElement.height;
    this.companyService.getAllWarehouses(this.companyId).subscribe((warehouses: Warehouse[])=>{
      this.allWarehouses = warehouses;
      this.selectedObjectId = this.allWarehouses[0].idWar;
      this.selectedObject = this.allWarehouses[0];
      this.selectedDepartment = this.allWarehouses[0].departments[0];
      this.makeListeners();
    })  // end of subscribe getAllWarehouses
  }

  private ctx: CanvasRenderingContext2D;

  shape: string;
  radius: number;
  width: number;
  length: number;
  selectedObjectId: number;
  selectedObject: Warehouse = new Warehouse();
  selectedDepartment: string;
  draggedTable: Table = new Table();

  

  addDepartment() {
    const result = prompt("Enter name of department:", "default text");
    if (result != null) {
      this.warehouseService.addDepartment(this.selectedObjectId, result).subscribe(resp=>{
        this.companyService.getAllWarehouses(this.companyId).subscribe((warehouses: Warehouse[])=>{
          this.allWarehouses = warehouses;
          this.selectedObject = this.allWarehouses[0];
          this.selectedObjectId = this.allWarehouses[0].idWar;
          this.selectedDepartment = this.allWarehouses[0].departments[0];
        })
      })
    }

  }

  changeDepartment(department) {
    this.selectedDepartment = department;
    this.makeListeners();
  }

  changeObject() {
    for (let i in this.allWarehouses) {
      if (this.allWarehouses[i].idWar == this.selectedObjectId) {
        this.selectedObject = this.allWarehouses[i];
        this.selectedDepartment = this.allWarehouses[i].departments[0];
      }
    }
    this.makeListeners();
  }

  isAddTable: boolean = false;

  addTable() {  // ovde treba popraviti ovo 0,0 zbog razlike u krugu i pravougaoniku
    this.dragging = true;
    this.isAddTable = true;
    this.draggedTable.shape = this.shape;
    this.draggedTable.radius = this.radius;
    this.draggedTable.width = this.width;
    this.draggedTable.length = this.length;
    this.makeListeners();
  }


  openAddTableDialog() : void {
    let dialogRef = this.dialog.open(AddTableDialogComponent, {
      panelClass: 'myAddTableDialog',
      data: {shape: this.shape, radius: this.radius, width: this.width, length: this.length}
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.tables = result;
      if (result.event != 'Cancel') {
        this.shape = result.data.shape;
        if (this.shape == "circle") {
          this.radius = result.data.radius;
        }
        else {
          this.width = result.data.width;
          this.length = result.data.length;
        }
        this.addTable();
      }
    });
  }
  

  drawTable(idTab, shape, xPos, yPos, width, length, radius, occupied) {
    // this.ctx.save(); this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // this.ctx.clearRect(0, 0, this.wCanvas, this.hCanvas); this.ctx.restore();
    this.ctx.fillStyle = 'black';
    if (shape == "circle") {
      this.ctx.beginPath();
      this.ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
      this.ctx.stroke();
      this.ctx.strokeText(idTab, xPos, yPos);
      if (occupied) {
        let text = "Occupied";
        this.ctx.strokeText(text, xPos, yPos)
      }
     
    }
    else {
      this.ctx.fillRect((xPos - width/2), (yPos - length/2), width, length);
      this.ctx.strokeText(idTab, xPos, yPos);
      if (occupied) {
        let text = "Occupied";
        this.ctx.strokeText(text, xPos - width/2, yPos - length/2)
      }
    }

  }

  drawOnChange(idTab, shape, width, length, radius, occupied) {
    // this.ctx.save(); this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // this.ctx.clearRect(0, 0, this.wCanvas, this.hCanvas); this.ctx.restore();
    this.ctx.fillStyle = 'black';
    if (shape == "circle") {
      this.ctx.beginPath();
      this.ctx.arc(this.dragMovePos[0], this.dragMovePos[1], radius, 0, 2 * Math.PI, false);
      this.ctx.stroke();
      this.ctx.strokeText(idTab, this.dragMovePos[0], this.dragMovePos[1]);
      if (occupied) {
        let text = "Occupied";
        this.ctx.strokeText(text, this.dragMovePos[0], this.dragMovePos[1])
      }
    }
    else {
      this.ctx.fillRect(this.dragMovePos[0] - width/2, this.dragMovePos[1] - length/2, width, length);
      this.ctx.strokeText(idTab, this.dragMovePos[0] - width/2, this.dragMovePos[1] - length/2);
    }
  }

  // ***** Invoicing *****

  allUnclosedReceipts: Receipt[] = [];
  messageAdd: string;

  invoicing() {
    this.ngOnInit();
    this.messageAdd = "";
    this.message = "";
    this.isSeeAllInfo = false;
    this.isInvoicing = true;
    this.page = 1;
    this.receiptService.getAllUnclosedReceipts(this.companyId).subscribe((receipts: Receipt[])=>{
      this.allUnclosedReceipts = receipts;
    })
    this.companyService.getAllWarehouses(this.companyId).subscribe((warehouses: Warehouse[])=>{
      this.allWarehouses = warehouses;
      this.selectedObjectId = this.allWarehouses[0].idWar;
    });
  }

  addReceipt() {
    for (let i in this.allWarehouses) {
      if (this.allWarehouses[i].idWar == this.selectedObjectId) this.selectedObject = this.allWarehouses[i];
    }
    this.receiptService.addReceipt(null, this.companyData[0].isPDV, null, null, null, null, null, null, null, null, null,
      this.companyData[0].comname, this.companyData[0].idCom, false, this.selectedObject.name, this.selectedObjectId).subscribe(resp=>{
        if (resp["message"] == "ok") {
          this.receiptService.getAllUnclosedReceipts(this.companyData[0].idCom).subscribe((receipts: Receipt[])=>{
            this.allUnclosedReceipts = receipts;
          })
          this.messageAdd = "Receipt added successfully!";
        }
        else this.messageAdd = "Error!";
      })
  }

  addItemToReceipt(receipt: Receipt) {
    let dialogRef = this.dialog.open(AddItemReceiptDialogComponent, {
      panelClass: 'myAddItemReceiptDialog',
      data: {receipt: receipt, isPDV: this.companyData[0].isPDV}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.receiptService.getAllUnclosedReceipts(this.companyId).subscribe((receipts: Receipt[])=>{
        this.allUnclosedReceipts = receipts;
      })
    });

  }

  closeReceipt(receipt: Receipt) {
    if (receipt.items.length == 0) {
      this.message = "Cannot close receipt without any items in it!";
    }
    else {
      let dialogRef = this.dialog.open(CloseReceiptDialogComponent, {
        panelClass: 'myCloseReceiptDialog',
        data: {receipt: receipt, idCom: this.companyData[0].idCom}
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result.event != "Cancel") {
            this.receiptService.getAllUnclosedReceipts(this.companyId).subscribe((receipts: Receipt[])=>{
              this.allUnclosedReceipts = receipts;
            })
          }
        
      });
    }

  }

  // ***** Report review *****

  allClosedReceipts: Receipt[] = [];
  isShowDetails: boolean = false;
  selectedReceipt: Receipt = new Receipt();
  allTodayClosedReceipts: Receipt[] = [];

  reportReview() {
    this.ngOnInit();
    this.isSeeAllInfo = false;
    this.isReportReview = true;
    this.page = 1;
    this.receiptService.getAllClosedReceipts(this.companyId).subscribe((receipts: Receipt[])=>{
      this.allClosedReceipts = receipts;
      let todayDate = new Date();
      let changedDate = '';
      let pipe = new DatePipe('en-US');
      let ChangedFormat = pipe.transform(todayDate, 'YYYY-MM-dd');
      changedDate = ChangedFormat;
      for (let i in this.allClosedReceipts) {
        let str = JSON.stringify(this.allClosedReceipts[i].dateOfReceipt)
        let str2 = JSON.stringify(changedDate)
        if(str == str2) {
          this.allTodayClosedReceipts.push(this.allClosedReceipts[i]);
        }

      }
    })
  }

  showDetails(receipt: Receipt) {
    this.isShowDetails = true;
    this.selectedReceipt = receipt;
  }
}
