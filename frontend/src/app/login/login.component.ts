import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceiptService } from 'src/services/receipt.service';
import { UserService } from 'src/services/user.service';
import { Receipt } from '../models/receipt';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.receiptService.getLastReceipts().subscribe((receipts: Receipt[])=>{
      this.allReceipts = receipts;
      this.allReceipts.sort((d1, d2)=>{
        if (new Date(d1.dateOfReceipt) < new Date(d2.dateOfReceipt)) return 1;
        else if (d1.dateOfReceipt == d2.dateOfReceipt) return 0;
        else return -1;
      })
      for (let z = 0; z < 5; z++) {
        this.lastFiveReceipts.push(this.allReceipts[z]);
      }
    })
  }

  allReceipts: Receipt[] = [];
  lastFiveReceipts: Receipt[] = [];
  username: string;
  password: string;
  message: string;

  login() {
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if (userFromDB != null) {
        localStorage.setItem("username", userFromDB.username);
        localStorage.setItem("password", userFromDB.password);
        localStorage.setItem("id", JSON.stringify(userFromDB.idCom));
        localStorage.setItem("firstname", userFromDB.firstname);
        localStorage.setItem("lastname", userFromDB.lastname);
        localStorage.setItem("numLK", userFromDB.numLK)
        if (userFromDB.type == 0) //this.router.navigate(['admin']);
          this.message = "Error!";
        else if (userFromDB.type == 1) this.router.navigate(['buyer']);
        else {
          if (userFromDB.isFirstLogin) this.router.navigate(['company-first-login']);
          if (userFromDB.isActivated) this.router.navigate(['company']);
        }
      } else {
        this.message = "Error!";
      }
    })
  }
}