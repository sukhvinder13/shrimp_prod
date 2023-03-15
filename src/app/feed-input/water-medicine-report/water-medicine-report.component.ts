import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators,UntypedFormArray } from '@angular/forms';
import { AddFarmService } from 'app/services/add-farm.service';
import { ActivatedRoute } from '@angular/router';
import { FeedInputService } from 'app/services/feed-input.service';

@Component({
  selector: 'app-water-medicine-report',
  templateUrl: './water-medicine-report.component.html',
  styleUrls: ['./water-medicine-report.component.scss']
})
export class WaterMedicineReportComponent implements OnInit {

  SelectedFeeds: string;
  selectFeeds: string[] = ['Feed1', 'Feed2', 'Feed3', 'Feed4'];
  watermedicineform: UntypedFormGroup;
  waterreportform:UntypedFormGroup;
  farmData: any = [];
  farmFetchedById: any = [];
  responseData: Array<any>;
  div_Water_medicine:boolean=false;
  div_water_report:boolean=false;
  farm_Id:string;
  farm_Date:string;
  feedInput:string;
  submitted=false;

  constructor(private formBuilder: UntypedFormBuilder,
    private _addFarmService: AddFarmService,
    private route: ActivatedRoute,
    private _inputFeed: FeedInputService) { }

  ngOnInit() {
    this.farm_Id = this.route.snapshot.params.farmId;
    this.farm_Date = this.route.snapshot.params.farmDate;
    // console.log(this.farm_Id);
    // console.log(this.farm_Date);
    this.watermedicineform = this.formBuilder.group({
      farmCode: [this.farm_Id, Validators.required],
      selectedAt: [this.farm_Date, Validators.required],
      inputType: ['Water Medicine', Validators.required],
      feedInput: ['', Validators.required],
      TankInput: this.formBuilder.array([
        this.initResponse(),
      ])
    });
    this.waterreportform = this.formBuilder.group({
      farmCode: [this.farm_Id, Validators.required],
      selectedAt: [this.farm_Date, Validators.required],
      inputType: ['Water Report', Validators.required],
      feedInput: ['', Validators.required],
      TankInput: this.formBuilder.array([
        this.initResponseCheckNet(),
      ])
    });
    this.getFarmData();
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
      this.watermedicineform.setControl('TankInput', this.setResponseMedicine(this.responseData));
      this.waterreportform.setControl('TankInput', this.setResponseReport(this.responseData));
    })
  }
  setResponseMedicine(responseSet): UntypedFormArray {
    const formArray = new UntypedFormArray([]);
    responseSet.forEach(s => {
      formArray.push(this.formBuilder.group({
        time: s.time,
        code: s.code,
        quantity: s.quantity,
        tank_area: s.tank_area,
        tank_name: s.tank_name,
      }))
    })
    return formArray;
  }
  //Adding tank_ dynamically for checknet
  setResponseReport(responseSet_CN): UntypedFormArray {
    const formArray = new UntypedFormArray([]);
    responseSet_CN.forEach(s => {
      formArray.push(this.formBuilder.group({
        tank_area: s.tank_area,
        tank_name: s.tank_name,
        salinity:s.salinity,
        alkality:s.alkality,
        hardness: s.hardness,
        ammonia: s.ammonia,
        calcium: s.calcium,
        magnesium: s.magnesium,
        potassium: s.potassium,
        phosphate: s.phosphate,
        chlorine: s. chlorine,
        fluoride: s.fluoride,
        iron: s.iron,
        nitrite: s.nitrite,
        nitrate: s.nitrate,
        turbidity: s.turbidity,
        green: s.green,
        yellow: s.yellow,
        do_am: s.do_am,
        do_noon: s.do_noon,
        do_pm: s.do_pm,
        ph_am: s.ph_am,
        ph_noon: s.ph_noon,
        ph_pm: s.ph_pm,
      }))
    })
    return formArray;
  }


  //add dynamic feed array
  initResponse() {
    return this.formBuilder.group({
      time: ['', Validators.required],
      code: ['', Validators.required],
      quantity: ['', Validators.required],
      tank_area: [''],
      tank_name: ['']
    })
  };
//add dynamic checknet array
initResponseCheckNet() {
  return this.formBuilder.group({
    salinity:['',Validators.required],
        alkality:['',Validators.required],
        hardness: ['',Validators.required],
        ammonia: ['',Validators.required],
        calcium: ['',Validators.required],
        magnesium: ['',Validators.required],
        potassium: ['',Validators.required],
        phosphate: ['',Validators.required],
        chlorine: ['',Validators.required],
        fluoride: ['',Validators.required],
        iron: ['',Validators.required],
        nitrite: ['',Validators.required],
        nitrate: ['',Validators.required],
        turbidity: ['',Validators.required],
        green: ['',Validators.required],
        yellow: ['',Validators.required],
        do_am: ['',Validators.required],
        do_noon: ['',Validators.required],
        do_pm: ['',Validators.required],
        ph_am: ['',Validators.required],
        ph_noon: ['',Validators.required],
        ph_pm: ['',Validators.required],
    tank_name: [''],
    tank_area: [''],
  })
};
loadWaterMedicine() {
  this.div_Water_medicine = true;
  this.div_water_report=false;

}
loadWaterReport() {
  this.div_Water_medicine = false;
  this.div_water_report=true;
}
changeFeed(event) {
  console.log(event);
  this.feedInput = event.value;
}
get f() { return this.watermedicineform.controls; }
get c() { return this.waterreportform.controls; }
  //submit form
  onSubmit() {
    this.submitted = true;
    this.watermedicineform.patchValue({ feedInput: this.feedInput });
    console.log(this.watermedicineform.value);
    if (!this.watermedicineform.valid && this.feedInput=='undefined') {
      alert('Please select Feed')
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this._inputFeed.createWaterMedicine(this.watermedicineform.value)
          .subscribe(res => {
            alert('Water Medicine created Successfully')
            // this.router.navigateByUrl('/manageLesson');
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
 //submit form
 onSubmitWaterReport() {
  this.submitted = true;
  this.waterreportform.patchValue({ feedInput: this.feedInput });
  console.log(this.waterreportform.value);
  if (!this.waterreportform.valid) {
    return false;
  } else {
    if (window.confirm('Are you sure?')) {
      this._inputFeed.createWaterReport(this.waterreportform.value)
        .subscribe(res => {
          alert('Water Report added Successfully')
          // this.router.navigateByUrl('/manageLesson');
        }, (error) => {
          console.log(error)
        })
    }
  }
}

}
