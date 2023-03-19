import { Component, OnInit } from '@angular/core';
import { AddFarmOwnerService } from 'app/services/farm-owner/add-farm-owner.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private AddFarmOwnerService:AddFarmOwnerService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
  }
  postFarmOwner(form: NgForm){
    if(form.invalid){
      console.log(form);
      return;
    }
    this.AddFarmOwnerService.postFarmOwner(
      form.value.firstName,form.value.lastName,form.value.mobile);
      // form.value.address,form.value.referral,form.value.pan,
      // form.value.adhaar,form.value.panFile,form.value.adhaarFile,form.value.companyName,
      // form.value.companyPan,form.value.companyAdhaar,form.value.companyGstNo,form.value.companyPanFile,
      // form.value.companyAdhaarFile
      // );
      alert("Owner Registered Sucessfully");
      this.toastrService.success('Success')
      form.reset();
  }
}
