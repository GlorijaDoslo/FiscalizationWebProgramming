import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  firstname: string;
  lastname: string;
  username: string;
  password1: string;
  password2: string;
  type: number = 2;
  phone: string;
  email: string;
  comname: string;
  address: string;
  pib: string;
  comnumber: number;
  isAccepted: number = 0;
  isActivated: boolean = false;
  isFirstLogin: boolean = true;

  message: string;

  register(){
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
            this.userService.register(this.firstname, this.lastname, this.username, this.password1, this.type, this.phone, this.email, this.comname, 
              this.address, this.pib, this.comnumber, this.isAccepted, this.isActivated, this.isFirstLogin, this.imageUrl).subscribe(respObj=>{
              if(respObj['message']=='ok'){
                this.message = 'Request to add company saved successfully!';
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

  selectedFile: ImageSnippet;
  messageI: string;
  imageUrl;

  processFile(imageInput) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    // if (!file.name.match(/\.(jpg|png)$/)) {
    //   this.message = "Invalid image type, only jpg and png are allowed!";
    // }
    // else {
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.imageUrl = reader.result;

  
        const img: HTMLImageElement = new Image();
  
        //Set the Base64 string return from FileReader as source.
        img.src = this.imageUrl;
      
        //Validate the File Height and Width.
        img.onload = () => {
          var height = img.height;
          var width = img.width;
          if (height > 100 && width > 100 && height < 300 && width < 300) {
            // console.log(this.imageUrl)
          }
          else {
            this.message = "Uploaded image has invalid height and width.";
          }
  
        };
    // }
    
    }
  }



    

  cancelRegistration() {
    this.router.navigate([""]);
  }

}