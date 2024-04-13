import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientImageService {

  private baseUrl = 'http://localhost:8086/api/v1/patient';
  constructor(private http: HttpClient) { }

  getPatientImage(name: string): string {
    return `${this.baseUrl}/get/image/${name}`;
  }

  uploadPatientImage(patientId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post(`${this.baseUrl}/upload/image/${patientId}`, formData);
  }

}
