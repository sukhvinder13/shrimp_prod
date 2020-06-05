import { Component, OnInit } from '@angular/core';
import { PondPreparationService } from 'app/services/pond-preparation.service';
import { NgForm } from '@angular/forms';
import { AddFarmOwnerService } from 'app/services/add-farm-owner.service';
import { AddFarmOwner } from 'app/services/addFarmOwner.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pond-prepartion',
  templateUrl: './pond-prepartion.component.html',
  styleUrls: ['./pond-prepartion.component.scss']
})
export class PondPrepartionComponent implements OnInit {
  postsFarmOwner: AddFarmOwner[] = [];

  private postsSubOwner: Subscription;


  SelectedPondInputs: string;
  selectPondInputs: string[] = ['Add Medicine', 'Add Water Report', 'Add Picture'];
  SelectedTanks: string;
  selectTanks: string[] = ['T1', 'T2', 'T3', 'T4'];
  //add medcine
  SelectedMedicine: string;
  selectMedicines: string[] = ['Diethylstilbestrol', 'Hexestrol', 'Dienestrol', 'Methyltestosterone', 'Metronidazole'];

  constructor(private PondPreparationService: PondPreparationService,private AddFarmOwnerService: AddFarmOwnerService) { }

  ngOnInit() {
    this.SelectedPondInputs = this.selectPondInputs[0];
    this.AddFarmOwnerService.getFarmOwner();
    this.postsSubOwner = this.AddFarmOwnerService.getPostUpdateListener()
      .subscribe((farmOwnerData: AddFarmOwner[]) => {
        // this.isLoading = false;
        this.postsFarmOwner = farmOwnerData;
        console.log(this.postsFarmOwner);
      });
  }

  ChangePondStage(event) {
    console.log('chnaged', event && event.value);
  }
  postAddMedicine(form: NgForm) {
    if (form.invalid) {
      console.log(form);
      return;
    }
    this.PondPreparationService.postAddMedicine(form.value.farmOwner,form.value.selectMedicine, form.value.selectTank, form.value.dosage);
    alert("Medcine Saved Sucessfully");
    form.reset();
  }
  postAddWaterReport(form: NgForm) {
    if (form.invalid) {
      console.log(form);
      return;
    }
    this.PondPreparationService.postAddWaterReport(form.value.farmOwner, form.value.selectTank,form.value.selectTime, form.value.selectPH);
    alert("Water Report Saved Sucessfully");
    console.log(form.value)
    form.reset();
  }
  //add picture
  postAddPicture(form: NgForm) {
    if (form.invalid) {
      console.log(form);
      return;
    }
    this.PondPreparationService.postAddPicture(form.value.farmOwner, form.value.selectTank,form.value.addFile);
    alert("Picture Saved Sucessfully");
    console.log(form.value)
    form.reset();
  }
}
