import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }


  uri = 'http://localhost:4000';

  getMaxIdCom() {
    return this.http.get(`${this.uri}/company/getMaxIdCom`);
  }

  getAllCompanyData(usernameForm) {
    const data = {
      username: usernameForm
    }
    return this.http.post(`${this.uri}/company/getAllCompanyData`, data);
  }

  getCompany(idCom) {
    const data = {
      idCom: idCom
    }
    return this.http.post(`${this.uri}/company/getCompany`, data);
  }

  changeFirstname(usernameForm, firstnameForm) {
    const data = {
      username: usernameForm,
      firstname: firstnameForm
    }
    console.log("u servisu")
    return this.http.post(`${this.uri}/company/changeFirstname`, data);
  }

  changeLastname(usernameForm, lastnameForm) {
    const data = {
      username: usernameForm,
      lastname: lastnameForm
    }

    return this.http.post(`${this.uri}/company/changeLastname`, data);
  }
  changePhone(usernameForm, phoneForm) {
    const data = {
      username: usernameForm,
      phone: phoneForm
    }
    return this.http.post(`${this.uri}/company/changePhone`, data);
  }

  changeEmail(usernameForm, emailForm) {
    const data = {
      username: usernameForm,
      email: emailForm
    }
    return this.http.post(`${this.uri}/company/changeEmail`, data);
  }

  changeUsername(usernameForm, username1Form) {
    const data = {
      username: usernameForm,
      username1: username1Form
    }
    return this.http.post(`${this.uri}/company/changeUsername`, data);
  }

  changeComname(usernameForm, comnameForm) {
    const data = {
      username: usernameForm,
      comname: comnameForm
    }
    return this.http.post(`${this.uri}/company/changeComname`, data);
  }

  changeAddress(usernameForm, addressForm) {
    const data = {
      username: usernameForm,
      address: addressForm
    }
    return this.http.post(`${this.uri}/company/changeAddress`, data);
  }

  changePIB(usernameForm, pibForm) {
    const data = {
      username: usernameForm,
      pib: pibForm
    }
    return this.http.post(`${this.uri}/company/changePIB`, data);
  }

  changeComnumber(usernameForm, comnumberForm) {
    const data = {
      username: usernameForm,
      comnumber: comnumberForm
    }
    return this.http.post(`${this.uri}/company/changeComnumber`, data);
  }

  changePDV(usernameForm, isPDVForm) {
    const data = {
      username: usernameForm,
      isPDV: isPDVForm
    }
    return this.http.post(`${this.uri}/company/changePDV`, data);
  }

  getAllAccounts(idComForm) {
    const data = {
      idCom: idComForm
    }
    return this.http.post(`${this.uri}/company/getAllAccounts`, data);
  }

  getAllWarehouses(idComForm) {
    const data = {
      idCom: idComForm
    }
    return this.http.post(`${this.uri}/company/getAllWarehouses`, data);
  }

  getAllRegisters(idComForm) {
    const data = {
      idCom: idComForm
    }
    return this.http.post(`${this.uri}/company/getAllRegisters`, data);
  }


  searchCompaniesByPIB(searchParamForm) {
    const data = {
      searchParam: searchParamForm
    }
    return this.http.post(`${this.uri}/company/searchCompaniesByPIB`, data);
  }

  searchCompaniesByName(searchParamForm) {
    const data = {
      searchParam: searchParamForm
    }
    return this.http.post(`${this.uri}/company/searchCompaniesByName`, data);
  }

  searchCompaniesByPIBAndName(searchParamForm, searchName) {
    const data = {
      searchParam: searchParamForm,
      searchName: searchName
    }
    return this.http.post(`${this.uri}/company/searchCompaniesByPIBAndName`, data);
  }

  addOrderer(idComForm, ordererIdCom, numOfDaysForm, discountForm) {
    const data = {
      idCom: idComForm,
      ordererIdCom: ordererIdCom,
      numOfDays: numOfDaysForm,
      discount: discountForm
    }
    return this.http.post(`${this.uri}/company/addOrderer`, data);
  }
}
