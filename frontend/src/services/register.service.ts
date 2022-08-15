import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';


  getMaxIdReg() {
    return this.http.get(`${this.uri}/cashRegisters/getMaxIdReg`);
  }

  addRegisters(idRegForm, locationForm, typeForm, companyIdForm) {
    const data = {
      idReg: idRegForm,
      location: locationForm,
      type: typeForm,
      companyId: companyIdForm
    }
    return this.http.post(`${this.uri}/cashRegisters/addRegisters`, data);
  }


  deleteRegister(idRegForm, companyIdForm) {
    const data = {
      idReg: idRegForm,
      companyId: companyIdForm
    }
    return this.http.post(`${this.uri}/cashRegisters/deleteRegister`, data);
  }

  addRegister(locationForm, typeForm, companyIdForm) {
    const data = {
      location: locationForm,
      type: typeForm,
      companyId: companyIdForm
    }
    return this.http.post(`${this.uri}/cashRegisters/addRegister`, data);
  }
}
