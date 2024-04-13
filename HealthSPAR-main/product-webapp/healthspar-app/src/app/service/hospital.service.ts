import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hospital } from '../model/hospital';
import { Doctor } from '../model/doctor';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = 'http://localhost:8086/api/v1/hospital';

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getAllHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${this.apiUrl}`);
  }

  public addHospitalProfile(hospital: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>(`${this.apiUrl}`, hospital, this.httpOptions);
  }
  
  public updateHospitalProfile(hospitalId: number, hospital: Hospital): Observable<Hospital> {
    return this.http.put<Hospital>(`${this.apiUrl}/${hospitalId}`, hospital, this.httpOptions);
  }

  public getHospitalProfile(hospitalId: number): Observable<Hospital> {
    return this.http.get<Hospital>(`${this.apiUrl}/id/${hospitalId}`);
  }

  public getHospitalProfileByEmail(email: string): Observable<Hospital> {
    return this.http.get<Hospital>(`${this.apiUrl}/email/${email}`);
  }
  
  public getDoctorByIndex(hospitalId: number, index: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${hospitalId}/doctors/${index}`);
  }
  
  
  public updateDoctorByIndex(hospitalId: number, index: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${hospitalId}/doctors/${index}`, doctor, this.httpOptions);
  }
  
  public addDoctor(hospitalId:number,doctor:Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/${hospitalId}/doctors`, doctor, this.httpOptions);
  }
}
