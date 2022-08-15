import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';


  getMaxIdWar() {
    return this.http.get(`${this.uri}/warehouses/getMaxIdWar`);
  }

  getWarehouse(idWar) {
    const data = {
      idWar: idWar
    }
    return this.http.post(`${this.uri}/warehouses/getWarehouse`, data);
  }

  addWarehouses(idWarForm, nameForm, companyIdForm) {
    const data = {
      idWar: idWarForm,
      name: nameForm,
      companyId: companyIdForm
    }
    return this.http.post(`${this.uri}/warehouses/addWarehouses`, data);
  }

  deleteWarehouse(idWarForm, companyIdForm) {
    const data = {
      idWar: idWarForm,
      companyId: companyIdForm
    }
    return this.http.post(`${this.uri}/warehouses/deleteWarehouse`, data);
  }

  addWarehouse(nameForm, companyIdForm) {
    const data = {
      name: nameForm,
      companyId: companyIdForm
    }
    return this.http.post(`${this.uri}/warehouses/addWarehouse`, data);
  }

  addDepartment(idWar, selectedDepartment) {
    const data = {
      idWar: idWar,
      department: selectedDepartment
    }
    return this.http.post(`${this.uri}/warehouses/addDepartment`, data);
  }

}
