import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  username: string;
  password: string;
  message: string;

  login() {
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if (userFromDB != null) {
        localStorage.setItem("firstname", userFromDB.firstname);
        localStorage.setItem("lastname", userFromDB.lastname);
        if (userFromDB.type == 0) this.router.navigate(['admin']);
        else this.message = "Only admins login here!";
      } else {
        this.message = "Error!";
      }
    })
  }

}
