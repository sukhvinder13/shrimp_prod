import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AddFarmService } from 'app/services/add-farm.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedInputService } from 'app/services/feed-input.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { exists } from 'fs';
@Component({
  selector: 'app-feed-checknet',
  templateUrl: './feed-checknet.component.html',
  styleUrls: ['./feed-checknet.component.scss']
})
export class FeedChecknetComponent implements OnInit {

  submitted = false;
  feedsform: FormGroup;
  checkNetform:FormGroup;
  farmData: any = [];
  farmData_area: any = [];
  params: Params;
  firstParam: string;
  farmFetchedById: any = [];
  farm_Id: any;
  farm_Date: any;
  responseData: Array<any>;
  div_feed: boolean = false;
  div_checkNet:boolean=false;
  feedInput: string;

  SelectedFeeds: string;
  selectFeeds: string[] = ['Feed1', 'Feed2', 'Feed3', 'Feed4'];

  constructor(private formBuilder: FormBuilder,
    private _addFarmService: AddFarmService,
    private route: ActivatedRoute,
    private _inputFeed: FeedInputService) { }

  ngOnInit() {
    this.farm_Id = this.route.snapshot.params.farmId;
    this.farm_Date = this.route.snapshot.params.farmDate;
    // console.log(this.farm_Id);
    // console.log(this.farm_Date);
    this.feedsform = this.formBuilder.group({
      farmCode: [this.farm_Id, Validators.required],
      selectedAt: [this.farm_Date, Validators.required],
      inputType: ['Feed', Validators.required],
      feedInput: ['', Validators.required],
      TankInput: this.formBuilder.array([
        this.initResponse(),
      ])
    });
    this.checkNetform = this.formBuilder.group({
      farmCode: [this.farm_Id, Validators.required],
      selectedAt: [this.farm_Date, Validators.required],
      inputType: ['CheckNet', Validators.required],
      feedInput: ['', Validators.required],
      TankInput: this.formBuilder.array([
        this.initResponseCheckNet(),
      ])
    });
    this.getFarmData();
  };

//for feed form
  addfeedsform() {
    // add address to the list
    const control = <FormArray>this.feedsform.get('TankInput');
    control.push(this.initResponse());
  }

  removeResponse(i: number) {
    // remove address from the list
    const control = <FormArray>this.feedsform.get('TankInput');
    control.removeAt(i);
  }
  //for checkNet form
  addcheckNetform() {
    // add address to the list
    const control = <FormArray>this.checkNetform.get('TankInput');
    control.push(this.initResponse());
  }

  removecheckNetform(i: number) {
    // remove address from the list
    const control = <FormArray>this.checkNetform.get('TankInput');
    control.removeAt(i);
  }
  getFarmData() {
    this._addFarmService.getFarm().subscribe((data) => {
      this.farmData = data['posts'];
      console.log(this.farmData);
      // this.farmData_area=this.farmData.tankArea;
      // console.log(this.farmData_area);
      this.farmFetchedById = this.farmData.filter(x => x.farmId === this.farm_Id);
      console.log(this.farmFetchedById);
      this.responseData = this.farmFetchedById[0].tankArea;
      console.log(this.responseData);
      this.feedsform.setControl('TankInput', this.setResponse(this.responseData));
      this.checkNetform.setControl('TankInput', this.setResponseCheckNet(this.responseData));
    })
  }
  setResponse(responseSet): FormArray {
    const formArray = new FormArray([]);
    responseSet.forEach(s => {
      formArray.push(this.formBuilder.group({
        feed: s.feed,
        code: s.code,
        quantity_kg: s.quantity_kg,
        cn_gm_kg: s.cn_gm_kg,
        cn_gm: s.cn_gm,
        tank_area: s.tank_area,
        tank_name: s.tank_name,
      }))
    })
    return formArray;
  }
  //Adding tank_ dynamically for checknet
  setResponseCheckNet(responseSet_CN): FormArray {
    const formArray = new FormArray([]);
    responseSet_CN.forEach(s => {
      formArray.push(this.formBuilder.group({
        GmperCN:s.GmperCN,
        Avgleft:s.Avgleft,
        Totalleft: s.Totalleft,
        NSperCN: s.NSperCN,
        Kalakalu: s.Kalakalu,
        eachCN1: s.eachCN1,
        eachCN2: s.eachCN2,
        eachCN3: s.eachCN3,
        eachCN4: s. eachCN4,
        tank_area: s.tank_area,
        tank_name: s.tank_name,
      }))
    })
    return formArray;
  }


  //add dynamic feed array
  initResponse() {
    return this.formBuilder.group({
      feed: ['', Validators.required],
      code: ['', Validators.required],
      quantity_kg: ['', Validators.required],
      cn_gm_kg: ['', Validators.required],
      cn_gm: ['', Validators.required],
      tank_area: [''],
      tank_name: ['']
    })
  };
//add dynamic checknet array
initResponseCheckNet() {
  return this.formBuilder.group({
    GmperCN: ['', Validators.required],
    Avgleft: ['', Validators.required],
    Totalleft: ['', Validators.required],
    NSperCN: ['', Validators.required],
    Kalakalu: ['', Validators.required],
    eachCN1: [''],
    eachCN2: [''],
    eachCN3: [''],
    eachCN4: [''],
    tank_name: [''],
    tank_area: [''],
  })
};
  loadFeed() {
    this.div_feed = true;
    this.div_checkNet=false;

  }
  loadChecknet() {
    this.div_feed = false;
    this.div_checkNet=true;
  }
  changeFeed(event) {
    console.log(event);
    this.feedInput = event.value;
  }
  get f() { return this.feedsform.controls; }
  get c() { return this.checkNetform.controls; }

  //submit form
  onSubmit() {
    this.submitted = true;
    this.feedsform.patchValue({ feedInput: this.feedInput });
    console.log(this.feedsform.value);
    if (!this.feedsform.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this._inputFeed.createFeeds(this.feedsform.value)
          .subscribe(res => {
            if(res){
              alert('Feed added Successfully')
            }
          }, error=> {
            console.log(error);
            if (error instanceof HttpErrorResponse) {
            console.log(error.status);
            console.log(error);
              if (error.status === 400 || error.status === 500) {
                alert('Feed `this.feedInput` already added for Date `this.farm_Date`');
              } else {
                alert('internal error occured')
              }
            } else {
              // alert('internal error occured without any http error');
              alert(`Feed ${this.feedInput} for Date ${this.farm_Date} already exists`);
            }
          })
      }
    }
  }
  //submit checknet
   //submit form
   onSubmitCheckNet() {
    this.submitted = true;
    this.checkNetform.patchValue({ feedInput: this.feedInput });
    console.log(this.checkNetform.value);
    if (!this.checkNetform.valid) {
      console.log('validation  error');
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this._inputFeed.createCheckNet(this.checkNetform.value)
          .subscribe(res => {
            alert('CheckNet added Successfully')
            // this.router.navigateByUrl('/manageLesson');
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
