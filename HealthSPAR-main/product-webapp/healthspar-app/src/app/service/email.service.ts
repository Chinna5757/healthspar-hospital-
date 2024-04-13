import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {EmailRequest } from '../model/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  sendEmail(email: EmailRequest) {
    return this.http.post("http://localhost:8086/api/v1/email", email);
  }
}
