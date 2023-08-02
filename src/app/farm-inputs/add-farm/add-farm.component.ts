import { Component, OnInit } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Subscription } from 'rxjs';
import { AddFarmOwnerService } from 'app/services/farm-owner/add-farm-owner.service';
import { Router } from '@angular/router';
import { AddFarm } from 'app/services/add-farm/addFarm.model';
import { AddFarmOwner } from 'app/services/farm-owner/addFarmOwner.model';


@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.scss']
})
export class AddFarmComponent implements OnInit {
  // newFarmData={};
  posts: AddFarm[] = [];
  postsOwner: AddFarmOwner[] = [];
  farmOwnerData: any = [];
  farmData: any = [];
  private postsSub: Subscription;
  private postsSubOwner: Subscription;
  isLoading = false;
  constructor(private AddFarmService: AddFarmService, private addFarmOwnerService: AddFarmOwnerService,
    private router: Router) { }

  ngOnInit() {
    this.isLoading = false;
    this.readFarmOwner();
    this.readFarm_details();

  }

  //read farm owner
  readFarmOwner() {
    this.addFarmOwnerService.getFarmOwner().subscribe((data) => {
      this.farmOwnerData = data;
    })
  }
  //read farm
  readFarm_details() {
    this.AddFarmService.getFarm().subscribe((data) => {
      this.farmData = data;
    })
  }
  //dynamic button
  fieldArray: Array<any> = [{}];
  newAttribute1: any = {
    'tank_name': '',
    'tank_area': ''
  }; firstField1 = true;
  firstFieldName1 = 'First Item name'; isEditItems1: boolean;
  addFieldValue1(index) {
    if (this.fieldArray.length <= 10) {
      this.fieldArray.push(this.newAttribute1);
      // this.newAttribute1 = {
      //   'tank_name':'',
      //   'tank_area':''
      // };

    } else {
    }
  }
  deleteFieldValue1(index) {
    this.fieldArray.splice(index, 1);
  }
  //ends
  // dynamic tank
  tankValue: any;
  dataChanged(noOfTanks) {
    this.tankValue = noOfTanks.value;
    this.fieldArray = [];
    for (let i = 0; i < this.tankValue; i++) {
      this.fieldArray.push(this.newAttribute1);
      this.newAttribute1 = {};
    }
  }
  //ends

  postFarm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // return;
    this.AddFarmService.postFarm(form.value.farmOwner, form.value.farmHistory, form.value.village,
      form.value.mandal, form.value.city, form.value.state,
      form.value.zip, form.value.country, form.value.noOfTanks, form.value.noOfEmployess,
      form.value.tankCode, this.fieldArray);
    alert("Farm Saved Sucessfully");
    form.reset();
    document.getElementById('addFarm').click();
  }
  //delete query
  onDelete(postId: string) {
    let x: boolean = confirm("Are You Sure ? Do you wan to delete ");
    if (x == true) {
      this.AddFarmService.deleteFarm(postId);
    } else {
      return
    }
  }



}
