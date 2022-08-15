import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllItems() {
    return this.http.get(`${this.uri}/items/getAllItems`);
  }

  getItem(arr) {
    const data = {
      arr: arr
    }
    return this.http.post(`${this.uri}/items/getItem`, data);
  }

  addItem(itemCipher, name, unitOfMeasure, taxRate, type, originCountry, foreignName, barCode, nameOfManufacturer, customsTariff,ecoTax
    , exciseTax, description, declaration, minWantedStock, maxWantedStock, idCom, image) {
    const data = {
      itemCipher: itemCipher,
      itemName: name,
      unitOfMeasure: unitOfMeasure,
      taxRate: taxRate,
      type: type,
      originCountry: originCountry,
      foreignName: foreignName,
      barCode: barCode,
      nameOfManufacturer: nameOfManufacturer,
      customsTariff: customsTariff,
      ecoTax: ecoTax,
      exciseTax: exciseTax,
      description: description,
      declaration: declaration,
      minWantedStock: minWantedStock,
      maxWantedStock: maxWantedStock,
      idCom: idCom,
      image: image
    }
    return this.http.post(`${this.uri}/items/addItem`, data);
  }

  deleteItem(idIteForm, idCom) {
    const data = {
      idIte: idIteForm,
      idCom: idCom
    }
    return this.http.post(`${this.uri}/items/deleteItem`, data);
  }

  updateItem(idIte, itemCipher, name, unitOfMeasure, taxRate, type, originCountry, foreignName, barCode, nameOfManufacturer, customsTariff,ecoTax
    , exciseTax, description, declaration, minWantedStock, maxWantedStock, idCom, image) {
    const data = {
      idIte: idIte,
      itemCipher: itemCipher,
      itemName: name,
      unitOfMeasure: unitOfMeasure,
      taxRate: taxRate,
      type: type,
      originCountry: originCountry,
      foreignName: foreignName,
      barCode: barCode,
      nameOfManufacturer: nameOfManufacturer,
      customsTariff: customsTariff,
      ecoTax: ecoTax,
      exciseTax: exciseTax,
      description: description,
      declaration: declaration,
      minWantedStock: minWantedStock,
      maxWantedStock: maxWantedStock,
      idCom: idCom,
      image: image
    }
    return this.http.post(`${this.uri}/items/updateItem`, data);
  }

  searchItemsByName(name) {
    const data = {
      itemName: name
    }
    return this.http.post(`${this.uri}/items/searchItemsByName`, data);
  }

  addItemToCategoryAndSubcategory(idIte, idCat, name, subcategory) {
    const data = {
      idIte: idIte,
      idCat: idCat,
      name: name,
      subcategory: subcategory
    }
    return this.http.post(`${this.uri}/items/addItemToCategoryAndSubcategory`, data);
  }

  addItemToCompany(idCom, idIte, itemName, manufacturer, minWantedStock, maxWantedStock) {
    const data = {
      idCom: idCom,
      idIte: idIte,
      itemName: itemName,
      manufacturer: manufacturer,
      minWantedStock: minWantedStock,
      maxWantedStock: maxWantedStock
    }
    return this.http.post(`${this.uri}/items/addItemToCompany`, data);
  }
}
