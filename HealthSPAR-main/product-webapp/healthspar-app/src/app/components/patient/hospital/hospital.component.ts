import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/model/hospital';
import { RecommendationService } from 'src/app/service/recommendation.service';
import { HospitalService } from 'src/app/service/hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientProfileService } from 'src/app/service/patient-profile.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css'],
})
export class HospitalComponent implements OnInit {
  allHospitals: Hospital[] = [];
  recommendedHospitals: Hospital[] = [];
  selectedCity: string = 'Select City';
  cityOptions: Set<string> = new Set();
  cityName: string = '';
  patientId: string = localStorage.getItem('patientId') || '';

  constructor(
    private hospitalService: HospitalService,
    private recommendService: RecommendationService,
    private route: Router,
    private router: ActivatedRoute,
    private patientService: PatientProfileService
  ) {}

  ngOnInit(): void {
    this.getPatientCity(); // Fetch the patient's city
    this.getAllHospitals();
  }

  public getAllHospitals(): void {
    this.hospitalService.getAllHospitals().subscribe((response: Hospital[]) => {
      this.allHospitals = response;
      console.log('All Hospitals: ', response);

      // Add 'Select City' and other city options to the set
      this.cityOptions.add('Select City');
      this.allHospitals.forEach((hospital) => {
        this.cityOptions.add(hospital.city.name.toLowerCase());
      });

      console.log('City options: ', this.cityOptions);

      // Initialize the recommended hospitals based on the patient's city
      this.getRecommendations(this.cityName);
    });
  }

  public onCitySelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedCity = selectedValue;

    if (selectedValue === 'Select City') {
      this.recommendedHospitals = [];
    } else {
      this.getRecommendations(selectedValue);
    }
  }

  public getPatientCity(): void {
    this.patientService.getPatientProfile(this.patientId).subscribe(
      (response) => {
        this.cityName = response.cityName;
        // After fetching the patient's city, set the default selected city
        this.selectedCity = this.cityName;
      }
    );
  }

  public getRecommendations(cityName: string): void {
    this.recommendService
      .getRecommendedHospitals(cityName)
      .subscribe((response: Hospital[]) => {
        this.recommendedHospitals = response;
      });
  }

  onBookClick(hospitalId: number): void {
    this.route.navigate(['/patient/hospital-page', hospitalId]);
  }
}
