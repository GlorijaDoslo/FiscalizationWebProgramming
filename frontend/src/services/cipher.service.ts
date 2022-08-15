import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CipherService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllCiphers() {
    return this.http.get(`${this.uri}/codebook/getCiphers`);
  }
}
