import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllUnclosedReceipts(companyId) {
    const data = {
      companyId: companyId
    }
    return this.http.post(`${this.uri}/receipts/getAllUnclosedReceipts`, data);
  }

  getAllClosedReceipts(companyId) {
    const data = {
      companyId: companyId
    }
    return this.http.post(`${this.uri}/receipts/getAllClosedReceipts`, data);
  }

  getAllReceipts(companyId) {
    const data = {
      companyId: companyId
    }
    return this.http.post(`${this.uri}/receipts/getAllReceipts`, data);
  }

  getAllReceiptsWithId(numLK) {
    const data = {
      numLK: numLK
    }
    return this.http.post(`${this.uri}/receipts/getAllReceiptsWithId`, data);
  }

  

  addReceipt(totalValue, isPDV, paymentMethod, customerValue, change, numLK, firstname, lastname, slipAccount, ordererId, dateOfReceipt
    , nameOfCompany, companyId, isClosed, tableObject, objectId) {
    const data = {
      totalValue: totalValue,
      isPDV: isPDV,
      paymentMethod: paymentMethod,
      customerValue: customerValue,
      change: change,
      numLK: numLK,
      firstname: firstname,
      lastname: lastname,
      slipAccount: slipAccount,
      ordererId: ordererId,
      dateOfReceipt: dateOfReceipt,
      nameOfCompany: nameOfCompany,
      companyId: companyId,
      isClosed: isClosed,
      tableObject: tableObject,
      objectId: objectId
    }
    return this.http.post(`${this.uri}/receipts/addReceipt`, data);
  }

  updateReceipt(idRec, totalValue, isPDV, paymentMethod, customerValue, change, numLK, firstname, lastname, slipAccount, ordererId, dateOfReceipt
    , nameOfCompany, companyId, isClosed) {
      let changedDate = '';
      let pipe = new DatePipe('en-US');
      let ChangedFormat = pipe.transform(dateOfReceipt, 'YYYY-MM-dd');
      changedDate = ChangedFormat;
    const data = {
      idRec: idRec,
      totalValue: totalValue,
      isPDV: isPDV,
      paymentMethod: paymentMethod,
      customerValue: customerValue,
      change: change,
      numLK: numLK,
      firstname: firstname,
      lastname: lastname,
      slipAccount: slipAccount,
      ordererId: ordererId,
      dateOfReceipt: changedDate,
      nameOfCompany: nameOfCompany,
      companyId: companyId,
      isClosed: isClosed,
    }
    console.log(changedDate)
    return this.http.post(`${this.uri}/receipts/updateReceipt`, data);
  }


  updateReceiptTotalValue(idRec, totalValue) {
    const data = {
      idRec: idRec,
      totalValue: totalValue,
    }
    return this.http.post(`${this.uri}/receipts/updateReceiptTotalValue`, data);
  }

  addItemToReceipt(idRec, itemId, itemName, price, amount, pdvPercent) {
    console.log("u servisu");
    console.log(pdvPercent);
    const data = {
      idRec: idRec,
      itemId: itemId, 
      itemName: itemName,
      price: price, 
      amount: amount, 
      pdvPercent: pdvPercent
    }
    return this.http.post(`${this.uri}/receipts/addItemToReceipt`, data);
  }

  getLastReceipts() {
    return this.http.get(`${this.uri}/receipts/getLastReceipts`);
  }
}
