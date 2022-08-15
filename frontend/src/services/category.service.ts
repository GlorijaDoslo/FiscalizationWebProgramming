import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllCategories() {
    return this.http.get(`${this.uri}/categories/getCategories`);
  }

  addCategory(name, subcategories) {
    let data = {
      name: name,
      subcategories: subcategories
    }
    return this.http.post(`${this.uri}/categories/addCategory`, data);
  }
}
