import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-chpass',
  templateUrl: './chpass.component.html',
  styleUrls: ['./chpass.component.css']
})
export class ChpassComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    //this.username = localStorage.getItem("username");
    //this.username = this.route.snapshot.paramMap['username'];
    //this.fetchedPassword = this.route.snapshot.paramMap['password'];
    this.username = this.userService.usernameShared;
    this.fetchedPassword = this.userService.passwordShared;
    this.page = localStorage.getItem("returnPage");
  }

  page: string;
  username: string;
  fetchedPassword: string;
  password1: string;  // old password
  password2: string;  // new password
  password3: string;  // confirm password
  message: string;

  chpass() {
    if (this.fetchedPassword != this.password1) this.message = "Entered password is incorrect!";
    else if (this.password1 == this.password2) this.message = "Old password cannot be the same as new!";
    else if (this.password2 != this.password3) this.message = "Reentered password doesn't match!";
    else {
      //console.log(localStorage.getItem('password'))
      this.userService.chpass(this.username, this.password1, this.password2).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'User password updated successfully!'
          this.router.navigate([""]);
        }
        else{
          this.message = 'Oops, error happened!'
        }
      });
    } // end of else if

  }

}
