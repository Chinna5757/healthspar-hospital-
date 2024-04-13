import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalImageService {

  private baseUrl = 'http://localhost:8086/api/v1/hospital';
  constructor(private http: HttpClient) { }


  uploadDoctorImage(hospitalId: number,index:number, file: File):Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post(`${this.baseUrl}/upload/image/${hospitalId}/${index}`, formData);
  }

  getDoctorImage(name: string):string {
    return `${this.baseUrl}/get/image/${name}`;
  } 

  getHospitalImage(name: string):string {
    return `${this.baseUrl}/get/hospital/image/${name}`;
  }

  uploadHospitalImage(hospitalId: number, file: File):Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post(`${this.baseUrl}/upload/image/${hospitalId}`, formData);
  }

}
