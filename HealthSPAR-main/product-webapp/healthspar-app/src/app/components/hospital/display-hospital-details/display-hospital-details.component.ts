import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Hospital } from 'src/app/model/hospital';
import { HospitalImageService } from 'src/app/service/hospital-image.service';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-display-hospital-details',
  templateUrl: './display-hospital-details.component.html',
  styleUrls: ['./display-hospital-details.component.css'],
})
export class DisplayHospitalDetailsComponent implements OnInit {
  hospital: Hospital = {
    hospitalId: 0,
    hospitalName: '',
    hospitalWebsite: '',
    hospitalEmail: '',
    hospitalPhoneNumber: '',
    hospitalRating: 0,
    hospitalReviews: [],
    hospitalAmenities: '',
    numberOfBeds: 0,
    city: {
      name: '',
      district: '',
      state: '',
      country: '',
      zip: ''
    },
    doctors: [],
    frequentlyAskedQuestion: []
  }

  constructor(private hospitalService: HospitalService, private router: ActivatedRoute, private route: Router,private hospitalImageService:HospitalImageService) { }

  ngOnInit() {
    this.getHospital();
    const trigger = $('.hamburger');
    const overlay = $('.overlay');
    let isClosed = false;

    trigger.click(() => {
      hamburger_cross();
    });

    function hamburger_cross() {
      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    }

    $('[data-toggle="offcanvas"]').click(() => {
      $('#wrapper').toggleClass('toggled');
    });
  }

  onEdit() {
    this.route.navigate(['/hospital/update'])
  }


  private getHospital(): void {
    const hospitalIdString = localStorage.getItem("hospitalId");

    if (hospitalIdString !== null) {
      const hospitalId = parseInt(hospitalIdString, 10);

      if (!isNaN(hospitalId)) {
        this.hospitalService.getHospitalProfile(hospitalId).subscribe(
          (response) => {
            this.hospital = response;
            console.log("hospital : ", this.hospital);
          },
          (error) => {
            console.error("Error fetching hospital profile:", error);
          }
        );
      } else {
        console.error("Invalid hospitalId in localStorage:", hospitalIdString);
      }
    } else {
      console.error("hospitalId not found in localStorage");
    }
  }


  selectedFile?: File;
  obFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (this.selectedFile !== undefined) {
      this.hospitalImageService.uploadHospitalImage(this.hospital.hospitalId, this.selectedFile).subscribe(
        (response) => {
          console.log('Successfully uploaded image:', response);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }
}
