import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CultivationStageService } from 'app/services/cultivation-stage.service';
import { AddFarmOwnerService } from 'app/services/add-farm-owner.service';
import { AddFarmOwner } from 'app/services/addFarmOwner.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cultivation-stage',
  templateUrl: './cultivation-stage.component.html',
  styleUrls: ['./cultivation-stage.component.scss']
})
export class CultivationStageComponent implements OnInit {

  constructor(private CultivationStageService: CultivationStageService,
    private AddFarmOwnerService: AddFarmOwnerService) { }
  postsFarmOwner: AddFarmOwner[] = [];
  private postsSubOwner: Subscription

  SelectedInput: string;
  selectInputs: string[] = ['Feed', 'Water Medicine', 'CheckNet', 'Shrimp Condition',
    'Water Condition', 'Water Report'];

  SelectedFeeds: string;
  selectFeeds: string[] = ['F1', 'F2', 'F3', 'F4'];

  SelectedTanks: string;
  selectTanks: string[] = ['T1', 'T2', 'T3', 'T4'];

  SelectedCNs: string;
  selectCNs: string[] = ['CN1', 'CN2', 'CN3', 'CN4', 'CN5', 'CN6'];

  SelectedServerity: string;
  selectServerity: string[] = ['1', '2', '3', '4', '5', '6'];
  // $('.file-upload').file_upload();
  //add medcine
  SelectedMedicine: string;
  selectMedicines: string[] = ['Diethylstilbestrol', 'Hexestrol', 'Dienestrol', 'Methyltestosterone', 'Metronidazole'];


  ngOnInit() {
    this.SelectedInput = this.selectInputs[2];
    this.AddFarmOwnerService.getFarmOwner();
    this.postsSubOwner = this.AddFarmOwnerService.getPostUpdateListener()
      .subscribe((farmOwnerData: AddFarmOwner[]) => {
        // this.isLoading = false;
        this.postsFarmOwner = farmOwnerData;
        console.log(this.postsFarmOwner);
      });
  }
  changeComboo(event) {
    console.log('chnaged', event && event.value);
  }
  //dynamic button
  fieldArray: Array<any> = [{}];
  newAttribute: any = {}; firstField = true; firstFieldName = 'First Item name'; isEditItems: boolean;
  addFieldValue(index) {
    if (this.fieldArray.length <= 10) {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
    } else {
    }
  }
  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  //ends
  //dynamic button
  fieldArray1: Array<any> = [{}];
  newAttribute1: any = {}; firstField1 = true; firstFieldName1 = 'First Item name'; isEditItems1: boolean;
  addFieldValue1(index) {
    if (this.fieldArray1.length <= 10) {
      this.fieldArray1.push(this.newAttribute1);
      this.newAttribute1 = {};
    } else {
    }
  }
  deleteFieldValue1(index) {
    this.fieldArray1.splice(index, 1);
  }
  //ends
  //add feeds
  postAddFeed(form: NgForm) {
    if (form.invalid) {
      console.log(form);
      return;
    }
    this.CultivationStageService.postAddFeeds(form.value.farmOwner, form.value.feedName, form.value.tankId,
      form.value.quantity, this.fieldArray1, form.value.unit, this.fieldArray);
    alert("Feeds Saved Sucessfully");
    form.reset();
  }


  //posting water medicne
  postAddWaterMedicine(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.CultivationStageService.postAddWaterMedicine(form.value.farmOwner, form.value.tankId,
      this.fieldArray1 ,  this.fieldArray);
    alert("Water Medicine Saved Sucessfully");
    form.reset();
  }
  //posting CheckNet
  postAddCheckNet(form: NgForm) {
    if (form.invalid) {
      console.log(form);
      return;
    }
    this.CultivationStageService.postAddWaterMedicine(form.value.farmOwner, form.value.tankId,
      form.value.feedName, this.fieldArray);
    alert("Water Medicine Saved Sucessfully");
    console.log(form.value)
    form.reset();
  }
  //post shrimp condtion
  postAddShrimpCondition(form: NgForm) {
    if (form.invalid) {
      console.log(form);
      return;
    }
    this.CultivationStageService.postAddShrimpCondition(form.value.farmOwner, form.value.tankId,
      form.value.serverity, form.value.file);
    alert("Shrimp condition Saved Sucessfully");
    console.log(form.value)
    form.reset();
  }

  //post postAddWaterCondition
  postAddWaterCondition(form: NgForm) {
    if (form.invalid) {
      console.log(form);
      return;
    }
    this.CultivationStageService.postAddWaterCondition(form.value.farmOwner, form.value.tankId,
      form.value.serverity, form.value.file);
    alert("Water condition Saved Sucessfully");
    console.log(form.value)
    form.reset();
  }

  //post  postAddWaterReport
  //dynamic array
  fieldArray2: Array<any> = [{},{}];
  fieldArray3: Array<any> = [{},{}];
  fieldArray4: Array<any> = [{},{}];

  postAddWaterReport(form: NgForm) {
    if (form.invalid) {
      console.log(form);
      return;
    }
    this.CultivationStageService.postAddWaterReport(form.value.farmOwner, form.value.tankId,
      this.fieldArray2, this.fieldArray3, this.fieldArray4);
    alert("Water Report Saved Sucessfully");
    console.log(form.value)
    form.reset();
  }

}
