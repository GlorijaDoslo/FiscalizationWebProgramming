import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';
import { CipherService } from 'src/services/cipher.service';
import { RegisterService } from 'src/services/register.service';
import { UserService } from 'src/services/user.service';
import { WarehouseService } from 'src/services/warehouse.service';
import { Account } from '../models/account';
import { Cipher } from '../models/cipher';
import { Register } from '../models/register';
import { Warehouse } from '../models/warehouse';

@Component({
  selector: 'app-company-first-login',
  templateUrl: './company-first-login.component.html',
  styleUrls: ['./company-first-login.component.css']
})
export class CompanyFirstLoginComponent implements OnInit {

  constructor(private userService: UserService, private cipherService: CipherService, private registerService: RegisterService
    , private accountService: AccountService, private warehouseService: WarehouseService, private router: Router) { }

  ngOnInit(): void {
    this.category = "prodavnica";
    this.numOfWarehouses = 1;
    this.numOfAccounts = 1;
    this.isPDV = false;
    this.typeOfRegister = "obicna";
    this.numOfRegisters = 1;
    this.companyId = JSON.parse(localStorage.getItem("id"));
    this.cipherService.getAllCiphers().subscribe((data: Cipher[])=>{
      this.allCiphers = data;
    });

    this.registerService.getMaxIdReg().subscribe((data: Register)=>{
      this.RegisterMaxId = data;
      this.maxIdReg = this.RegisterMaxId[0].idReg;
    });

    this.accountService.getMaxIdAcc().subscribe((data: Account)=>{
      this.AccountMaxId = data;
      this.maxIdAcc = this.AccountMaxId[0].idAcc;
    });

    this.warehouseService.getMaxIdWar().subscribe((data: Warehouse)=>{
      this.WarehouseMaxId = data;
      this.maxIdWar = this.WarehouseMaxId[0].idWar;
    });
  }

  allCiphers: Cipher[];

  username: string = this.userService.usernameShared;

  category: string;
  activityCiphers: Cipher[] = [];
  isPDV: boolean;
  numOfAccounts: number;  // default: 1
  accNumber: string;
  bank: string;
  accounts: Account[] = [] = [];
  numOfWarehouses: number; // default: 1
  warName: string;
  warehouses: Warehouse[] = [];
  numOfRegisters: number; // default: 1
  registers: Register[] = [];
  locationOfRegister: string;
  typeOfRegister: string;
  RegisterMaxId: Register = new Register();
  AccountMaxId: Account = new Account();
  WarehouseMaxId: Warehouse = new Warehouse();
  companyId: number;

  message: string;
  messageReg: string;
  messageAcc: string;
  messageWar: string;

  messageA: string;
  messageW: string;
  messageR: string;


  addData() {
    if (this.accounts.length != this.numOfAccounts) this.message = "Insufficient account entries!";
    else if (this.warehouses.length != this.numOfWarehouses) this.message = "Insufficient warehouse entries!";
    else if (this.registers.length != this.numOfRegisters) this.message = "Insufficient register entries!";
    else {
      // console.log(this.category);
      // console.log(this.activityCiphers);
      // console.log(this.isPDV);
      // console.log(this.numOfWarehouses);
      // console.log(this.warehouses);
      // console.log(this.numOfRegisters);
      // console.log(this.registers);

      let arrCip: string[] = [];
      for (let i = 0; i < this.activityCiphers.length; i++) {
        arrCip.push(this.activityCiphers[i].cipher);
      }

      // let arrWar: number[] = [];
      // for (let i = 0; i < this.warehouses.length; i++) {
      //   arrWar.push(this.warehouses[i].idWar);
      // }

      // let arrAcc: number[] = [];
      // for (let i = 0; i < this.accounts.length; i++) {
      //   arrAcc.push(this.accounts[i].idAcc);
      // }

      // let arrReg: number[] = [];
      // for (let i = 0; i < this.registers.length; i++) {
      //   arrReg.push(this.registers[i].idReg);
      // }

      this.userService.addCompanyData(this.username, this.category, arrCip, this.isPDV, this.numOfWarehouses, this.numOfAccounts,
        this.numOfRegisters).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'Company data updated successfully!';
        }
        else{
          this.message = 'Error!';
        }
      });


      let cntA = 0;
      for (let i = 0; i < this.accounts.length; i++) {
        this.accountService.addAccounts(this.accounts[i].idAcc, this.accounts[i].accNum, this.accounts[i].bank,
           this.accounts[i].companyId).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            cntA++;

          }
          else{
            this.messageA = 'Error!';
          }
          if (cntA == this.accounts.length) this.messageA = 'Accounts added successfully!';
        });
      }



      let cntW = 0;
      for (let i = 0; i < this.warehouses.length; i++) {
        this.warehouseService.addWarehouses(this.warehouses[i].idWar, this.warehouses[i].name, this.warehouses[i].companyId).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            cntW++;
            
          }
          else{
            this.messageW = 'Error!';
          }
          if (cntW == this.warehouses.length) this.messageW = 'Warehouses added successfully!';
        });
      }




      let cntR = 0;
      for (let i = 0; i < this.registers.length; i++) {
        this.registerService.addRegisters(this.registers[i].idReg, this.registers[i].location, this.registers[i].type, 
          this.warehouses[i].companyId).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            cntR++;
            // this.messageR = 'Registers added successfully!';
          }
          else {
            this.messageR = 'Error!';
          }
          if (cntR == this.registers.length) this.messageR = 'Registers added successfully!';
        });
      }


      this.userService.makeFirstLoginTrue().subscribe(respObj=>{
        if(respObj['message']=='ok'){
          cntR++;
          this.message = 'All done!';
          this.router.navigate(['company']);
        }
        else {
          this.message = 'Error!';
        }
      });
    } // else
  }

  cancelData() {
    this.router.navigate([""]);
  }

  maxIdReg: number;
  maxIdAcc: number;
  maxIdWar: number;

  cntRe = 1;

  addRegister() {
    if (!this.locationOfRegister) this.messageReg = "Location of register is required!";
    else if (this.registers.length == this.numOfRegisters) this.messageReg = "Number of registers achieved!"
    else {
      this.maxIdReg = this.maxIdReg + 1;
      const a1: Register = {
        idReg: this.maxIdReg,
        location: this.locationOfRegister,
        type: this.typeOfRegister,
        companyId: this.companyId
      };

      this.registers.push(a1);
      console.log(this.registers);
      this.messageReg = "Added " + (this.cntRe++) + " registers.";

    }
  }

  cntAc = 1;
  addAccount() {
    if (!this.accNumber) this.messageAcc = "Number of account is required!\n";
    else if (!this.bank) this.messageAcc = "Bank is required!";
    else if (this.accounts.length == this.numOfAccounts) this.messageAcc = "Number of accounts achieved!"
    else {
      this.maxIdAcc = this.maxIdAcc + 1;
      const a1: Account = {
        idAcc: this.maxIdAcc,
        accNum: this.accNumber,
        bank: this.bank,
        companyId: this.companyId
      };

      this.accounts.push(a1);
      console.log(this.accounts);
      this.messageAcc = "Added " + (this.cntAc++) + " accounts.";

    }
  }
  cntWa = 1;
  addWarehouse() {
    if (!this.warName) this.messageWar = "Name is required!";
    else if (this.warehouses.length == this.numOfWarehouses) this.messageWar = "Number of warehouses achieved!"
    else {
      this.maxIdWar = this.maxIdWar + 1;
      const a1: Warehouse = {
        idWar: this.maxIdWar,
        name: this.warName,
        companyId: this.companyId,
        itemsInfo: null,
        departments: null
      };

      this.warehouses.push(a1);
      console.log(this.warehouses);
      this.messageWar = "Added " + (this.cntWa++) + " warehouses.";

    }
  }

  deleteRegisters() {
    this.registerService.getMaxIdReg().subscribe((data: Register)=>{
      this.RegisterMaxId = data;
      this.maxIdReg = this.RegisterMaxId[0].idReg;
    });
    this.registers = [];
  }

  deleteAccounts() {
    this.accountService.getMaxIdAcc().subscribe((data: Account)=>{
      this.AccountMaxId = data;
      this.maxIdAcc = this.AccountMaxId[0].idAcc;
    });
    this.accounts = [];
  }

  deleteWarehouses() {
    this.warehouseService.getMaxIdWar().subscribe((data: Warehouse)=>{
      this.WarehouseMaxId = data;
      this.maxIdWar = this.WarehouseMaxId[0].idWar;
    });
    this.warehouses = [];
  }

}
