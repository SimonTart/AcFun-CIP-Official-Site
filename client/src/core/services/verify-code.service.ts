import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeService {

  constructor(private http: HttpClient) {}


  sendRegisterCode(email) {
      return this.http.post('/api/verify-code/register', { email });
  }
}
