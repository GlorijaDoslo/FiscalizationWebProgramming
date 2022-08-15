import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';


  getMaxIdAcc() {
    return this.http.get(`${this.uri}/businessAccounts/getMaxIdAcc`);
  }

  addAccounts(idAccForm, accNumForm, bankForm, companyIdForm) {
    const data = {
      idAcc: idAccForm,
      accNum: accNumForm,
      bank: bankForm,
      companyId: companyIdForm
    }
    return this.http.post(`${this.uri}/businessAccounts/addAccounts`, data);
  }

  deleteAccount(idAccForm, companyIdForm) {
    const data = {
      idAcc: idAccForm,
      companyId: companyIdForm
    }
    return this.http.post(`${this.uri}/businessAccounts/deleteAccount`, data);
  }

  addAccount(accNumForm, bankForm, companyIdForm) {
    const data = {
      accNum: accNumForm,
      bank: bankForm,
      companyId: companyIdForm
    }
    return this.http.post(`${this.uri}/businessAccounts/addAccount`, data);
  }

}
