import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  constructor(private http: HttpClient, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');

    if (this.usernameShared == null && this.passwordShared == null) {
      this.router.navigate(['']);
      return false;
    }
    else return true;
  }

  uri = 'http://localhost:4000';

  usernameShared: string;
  passwordShared: string;

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }
    this.usernameShared = usernameFromForm;
    this.passwordShared = passwordFromForm;

    return this.http.post(`${this.uri}/users/login`, data)
  }

  register(firstnameForm, lastnameForm, usernameForm, passwordForm, typeForm, phoneForm, emailForm, comnameForm, addressForm, pibForm, comnumberForm
    , isAcceptedForm, isActivatedForm, isFirstLoginForm, selectedFileForm){
    const data = {
      firstname: firstnameForm,
      lastname: lastnameForm,
      username: usernameForm,
      password: passwordForm,
      type: typeForm,
      phone: phoneForm,
      email: emailForm,
      comname: comnameForm,
      address: addressForm,
      pib: pibForm,
      comnumber: comnumberForm,
      isAccepted: isAcceptedForm,
      isActivated: isActivatedForm,
      isFirstLogin: isFirstLoginForm,
      image: selectedFileForm
    }

    return this.http.post(`${this.uri}/users/register`, data)
  }
  
  chpass(usernameForm, oldPasswordForm, passwordForm){
    const data = {
      username: usernameForm,
      oldPassword: oldPasswordForm,
      password: passwordForm
    }

    return this.http.post(`${this.uri}/users/chpass`, data)
  }

  getAllRequests() {
    return this.http.get(`${this.uri}/users/getAllRequests`);
  }

  getCompanies() {
    return this.http.get(`${this.uri}/users/getCompanies`);
  }

  activateUser(usernameForm) {
    const data = {
      username: usernameForm,
    }
    return this.http.post(`${this.uri}/users/activateUser`, data)
  }

  deactivateUser(usernameForm) {
    const data = {
      username: usernameForm,
    }
    return this.http.post(`${this.uri}/users/deactivateUser`, data)
  }

  acceptUser(usernameForm) {
    const data = {
      username: usernameForm,
    }
    return this.http.post(`${this.uri}/users/acceptUser`, data)
  }

  declineUser(usernameForm) {
    const data = {
      username: usernameForm,
    }
    return this.http.post(`${this.uri}/users/declineUser`, data)
  }

  registerBuyer(firstnameForm, lastnameForm, usernameForm, passwordForm, typeForm, phoneForm, numLKForm) {
    const data = {
      firstname: firstnameForm,
      lastname: lastnameForm,
      username: usernameForm,
      password: passwordForm,
      type: typeForm,
      phone: phoneForm,
      numLK: numLKForm
    }

    return this.http.post(`${this.uri}/users/registerBuyer`, data)
  }

  // for window company-first-login
  addCompanyData(usernameForm, categoryForm, activityCipherForm, isPDVForm, numOfWarehousesForm, numOfAccountsForm,
    numOfRegistersForm) {
    const data = {
      username: usernameForm,
      category: categoryForm,
      activityCipher: activityCipherForm,
      isPDV: isPDVForm,
      numOfWarehouses: numOfWarehousesForm,
      // warehouses: warehousesForm,
      numOfAccounts: numOfAccountsForm,
      // accounts: accountsForm,
      numOfRegisters: numOfRegistersForm,
      // registers: registersForm
    }
    return this.http.post(`${this.uri}/users/addCompanyData`, data);
  }

  makeFirstLoginTrue() {
    const data = {
      username: this.usernameShared
    }
    return this.http.post(`${this.uri}/users/makeFirstLoginTrue`, data);
  }

  checkUsername(usernameForm) {
    const data = {
      username: usernameForm,
    }
    return this.http.post(`${this.uri}/users/checkUsername`, data);
  }


  checkEmail(emailForm) {
    const data = {
      email: emailForm
    }
    return this.http.post(`${this.uri}/users/checkEmail`, data);
  }

  
  // uploadImage(image: File) {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   return this.http.post(`${this.uri}/users/uploadImage`, formData);
  // }
}
