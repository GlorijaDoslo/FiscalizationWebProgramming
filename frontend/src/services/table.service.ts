import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }
  
  uri = 'http://localhost:4000';

  getAllTables(companyId, selectedObjectId, selectedDepartment) {
    let data = {
      companyId: companyId,
      objectId: selectedObjectId,
      department: selectedDepartment,
    }
    return this.http.post(`${this.uri}/tables/getAllTables`, data);
  }

  addTable(shape, xPos, yPos, radius, width, length, occupied, department, companyId, objectId, objectName) {
    let data = {
      shape: shape,
      xPos: xPos,
      yPos: yPos,
      radius: radius,
      width: width,
      length: length,
      occupied: occupied,
      department: department,
      companyId: companyId,
      objectId: objectId,
      objectName: objectName
    }
    return this.http.post(`${this.uri}/tables/addTable`, data);
  }

  updateTable(idTab, xPos, yPos) {
    let data = {
      idTab: idTab,
      xPos: xPos,
      yPos: yPos
    }
    return this.http.post(`${this.uri}/tables/updateTable`, data);
  }

  deleteTable(idTab) {
    let data = {
      idTab: idTab
    }
    return this.http.post(`${this.uri}/tables/deleteTable`, data);
  }

  updateOccupationOfTable(idTab, occupied) {
    let data = {
      idTab: idTab,
      occupied: occupied
    }
    return this.http.post(`${this.uri}/tables/updateOccupationOfTable`, data);
  }

  

}
