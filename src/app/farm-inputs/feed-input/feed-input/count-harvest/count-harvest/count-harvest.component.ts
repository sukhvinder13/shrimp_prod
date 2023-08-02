import { Component, OnInit } from '@angular/core';
import { FeedInputService } from 'app/services/feed-input/feed-input.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-count-harvest',
  templateUrl: './count-harvest.component.html',
  styleUrls: ['./count-harvest.component.scss']
})
export class CountHarvestComponent implements OnInit {
  countFormData: boolean = false;
  harvestFormData: boolean = false;
  halfHarvestFormData: boolean = false;
  fullHarvestFormData: boolean = false;
  farm_Id: any;
  farm_Date: any;
  farmData: any = [];
  submitted = false;
  countForm: UntypedFormGroup;
  halfharvestform: UntypedFormGroup;
  fullharvestForm:UntypedFormGroup;
  params: Params;
  firstParam: string;
  farmFetchedById: any = [];
  responseData: Array<any>;

  constructor(private route: ActivatedRoute,
    private _inputFeed: FeedInputService,
    private _addFarmService: AddFarmService,
    private formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    this.farm_Id = this.route.snapshot.params.farmId;
    this.farm_Date = this.route.snapshot.params.farmDate;
    this.getFarmData();
    this.countForm = this.formBuilder.group({
      farmCode: [this.farm_Id, Validators.required],
      createdAt: [this.farm_Date, Validators.required],
      inputType: ['Count', Validators.required],
      // selectedFeeds: ['', Validators.required],
      TankInput: this.formBuilder.array([
        this.initResponseCount(),
      ]),
      CountObservations: this.formBuilder.array([
        this.initResponseCountObservations(),
      ]),
      CountReport:this.formBuilder.array([
        this.initCountReport(),
      ])
    });

    this.halfharvestform = this.formBuilder.group({
      farmCode: [this.farm_Id, Validators.required],
      createdAt: [this.farm_Date, Validators.required],
      inputType: ['Count', Validators.required],
      // selectedFeeds: ['', Validators.required],
      TankInput: this.formBuilder.array([
        this.initResponse(),
      ])
    });
    this.fullharvestForm = this.formBuilder.group({
      farmCode: [this.farm_Id, Validators.required],
      createdAt: [this.farm_Date, Validators.required],
      inputType: ['Count', Validators.required],
      // selectedFeeds: ['', Validators.required],
      TankInput: this.formBuilder.array([
        this.initResponse(),
      ])
    });
  }
  loadCount() {
    document.getElementById("count").style.background = "green";
    document.getElementById("harvest").style.background = "";    
    this.countFormData = true;
    this.harvestFormData = false;
  }
  loadHarvest() {
    document.getElementById("count").style.background = "";
    document.getElementById("harvest").style.background = "green";   
    this.harvestFormData = true;
    this.countFormData = false;
  }
  halfHarvest(){
    document.getElementById("halfHarvest").style.background = "green";
    document.getElementById("fullHarvest").style.background = "";
    this.halfHarvestFormData=true;
    this.fullHarvestFormData=false;
  }
  fullHarvest(){
    document.getElementById("halfHarvest").style.background = "";
    document.getElementById("fullHarvest").style.background = "green";
    this.halfHarvestFormData=false;
    this.fullHarvestFormData=true;

  }

  getFarmData() {
    this._addFarmService.getFarm().subscribe((data) => {
      this.farmData = data['posts'];
      this.farmFetchedById = this.farmData.filter(x => x.farmId === this.farm_Id);
      this.responseData = this.farmFetchedById[0].tankArea;
      this.countForm.setControl('TankInput', this.setResponse1(this.responseData));
      this.countForm.setControl('CountObservations', this.setResponse2(this.responseData));
      this.countForm.setControl('CountReport', this.setResponse3(this.responseData));
      this.halfharvestform.setControl('TankInput', this.setResponse(this.responseData));
      this.halfharvestform.setControl('CountObservations', this.setResponse2(this.responseData));
      this.halfharvestform.setControl('CountReport', this.setResponse3(this.responseData));
      this.fullharvestForm.setControl('TankInput', this.setResponse(this.responseData));
      this.fullharvestForm.setControl('CountObservations', this.setResponse2(this.responseData));
      this.fullharvestForm.setControl('CountReport', this.setResponse3(this.responseData));
    })
  }
  addcountsform() {
    // add  to the list
    const control = <UntypedFormArray>this.countForm.get('TankInput');
    control.push(this.initResponseCount());
  }

  //add dynamic count array
  initResponseCount() {
    return this.formBuilder.group({
      count: ['', Validators.required],
      count_gms: ['', Validators.required],
      kg_net: ['', Validators.required],
      roopchand_count: ['', Validators.required],
      neeting_side: ['', Validators.required],
      first_feed_time: ['', Validators.required],
      neeting_time: ['', Validators.required],
      tank_name: [''],
      tank_area: [''],
    })
  };

  addharvestform() {
    // add  to the list
    const control = <UntypedFormArray>this.halfharvestform.get('TankInput');
    control.push(this.initResponse());
  }
  setResponse1(responseSet): UntypedFormArray {
    const formArray = new UntypedFormArray([]);
    responseSet.forEach(s => {
      formArray.push(this.formBuilder.group({
        count: s.count,
        count_gms: s.harvest_kgs,
        kg_net: s.harvest_price,
        roopchand_count: s.loose_shell_kg,
        neeting_side: s.neeting_side,
        first_feed_time: s.first_feed_time,
        neeting_time: s.neeting_time,
        tank_area: s.tank_area,
        tank_name: s.tank_name,
      }))
    })
    return formArray;
  }
  //add dynamic Harvest array
  initResponse() {
    return this.formBuilder.group({
      count: ['', Validators.required],
      harvest_kgs: ['', Validators.required],
      harvest_price: ['', Validators.required],
      loose_shell_kg: ['', Validators.required],
      loose_shell_price: ['', Validators.required],
      middleman: ['', Validators.required],
      tank_name: [''],
      tank_area: [''],
    })
  };
  setResponse(responseSet): UntypedFormArray {
    const formArray = new UntypedFormArray([]);
    responseSet.forEach(s => {
      formArray.push(this.formBuilder.group({
        count: s.count,
        harvest_kgs: s.harvest_kgs,
        harvest_price: s.harvest_price,
        loose_shell_kg: s.loose_shell_kg,
        loose_shell_price: s.loose_shell_price,
        middleman: s.middleman,
        tank_area: s.tank_area,
        tank_name: s.tank_name,
      }))
    })
    return formArray;
  }
 
  //count observation dynamic form
addcountformObv() {
  // add  to the list
  const control1 = <UntypedFormArray>this.countForm.get('CountObservations');
  control1.push(this.initResponseCountObservations());
}
  //count Report dynamic form
  addcountformReport() {
    // add  to the list
    const control1 = <UntypedFormArray>this.countForm.get('CountReport');
    control1.push(this.initCountReport());
  }
//count report 
initCountReport(){
  return this.formBuilder.group({
    tank_name: [''],
    report: ['',Validators.required],
    tank_area: [''],
  })
}
setResponse3(responseSet): UntypedFormArray {
  const formArray = new UntypedFormArray([]);
  responseSet.forEach(s => {
    formArray.push(this.formBuilder.group({
      count: s.count,
      report: s.report,
      tank_area: s.tank_area,
      tank_name: s.tank_name,
    }))
  })
  return formArray;
}
//add dynamic Harvest array
 initResponseCountObservations() {
  return this.formBuilder.group({
    no_body_moulting: ['', Validators.required],
    no_head_moulting: ['', Validators.required],
    no_moulting: ['', Validators.required],
    no_new_shell_formation: ['', Validators.required],
    meesum_cut_black: ['', Validators.required],
    meesum_cut: ['', Validators.required],
    garuku_meesum: ['', Validators.required],
    long_fecals: ['', Validators.required],
    yellow_fecals: ['', Validators.required],
    white_fecals: ['', Validators.required],
    white_gut: ['', Validators.required],
    tank_name: [''],
    tank_area: [''],
    empty_gut: ['', Validators.required],
    plankton_gut: ['', Validators.required],
    soil_gut: ['', Validators.required],
    gap_gut: ['', Validators.required],
    black_gut: ['', Validators.required],
    brown_gut: ['', Validators.required],
    no_jiguru: ['', Validators.required],
    size_variation: ['', Validators.required],
    toka_erupulu: ['', Validators.required],
    kallu_erupulu: ['', Validators.required],
    kallu_pakudu: ['', Validators.required],
    kidney_color_change: ['', Validators.required],
    head_water: ['', Validators.required],
    white_muscle: ['', Validators.required],
    minerial_bends: ['', Validators.required],
    gottuku_ravadam: ['', Validators.required],
    paina_eedadam: ['', Validators.required],
    body_cracks: ['', Validators.required],
    hatchery_bends: ['', Validators.required],
    loose_shell: ['', Validators.required],
    deads: ['', Validators.required],
    potti_royya: ['', Validators.required],
    snail: ['', Validators.required],
    theegalu: ['', Validators.required],
    chikkadanam: ['', Validators.required],
    water_crash: ['', Validators.required],
    turbidity: ['', Validators.required],
    water_color: ['', Validators.required],

  })
};

setResponse2(responseSet2): UntypedFormArray {
  const formArray1 = new UntypedFormArray([]);
  responseSet2.forEach(s => {
    formArray1.push(this.formBuilder.group({
      tank_area: s.tank_area,
      tank_name: s.tank_name,
      no_body_moulting: s.no_body_moulting,
      no_head_moulting: s.no_head_moulting,
      no_moulting: s.no_moulting,
      no_new_shell_formation: s.no_new_shell_formation,
      meesum_cut_black: s.meesum_cut_black,
      meesum_cut: s.meesum_cut,
      garuku_meesum: s.garuku_meesum,
      long_fecals: s.long_fecals,
      yellow_fecals: s.yellow_fecals,
      white_fecals: s.white_fecals,
      white_gut: s.white_gut,
      empty_gut: s.empty_gut,
      plankton_gut: s.plankton_gut,
      soil_gut: s.soil_gut,
      gap_gut: s.gap_gut,
      black_gill: s.black_gill,
      brown_gill: s.brown_gill,
      no_jiguru: s.no_jiguru,
      size_variation: s.size_variation,
      toka_erupulu: s.toka_erupulu,
      kallu_erupulu: s.kallu_erupulu,
      kallu_pakudu: s.kallu_pakudu,
      kidney_color_change: s.kidney_color_change,
      head_water: s.head_water,
      white_muscle: s.white_muscle,
      minerial_bends: s.minerial_bends,
      gottuku_ravadam: s.gottuku_ravadam,
      paina_eedadam: s.paina_eedadam,
      body_cracks: s.body_cracks,
      hatchery_bends: s.hatchery_bends,
      loose_shell: s.loose_shell,
      deads: s.deads,
      potti_royya: s.potti_royya,
      snail: s.snail,
      theegalu: s.theegalu,
      chikkadanam: s.chikkadanam,
      water_crash: s.water_crash,
      turbidity: s.turbidity,
      water_color: s.water_color,
    }))
  })
  return formArray1;
}
  //submit form
  onSubmitcountForm() {
    this.submitted = true;
    console.log(this.countForm.value);
    if (!this.countForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this._inputFeed.createCount(this.countForm.value)
          .subscribe(res => {
            if(res){
              alert('Count added Successfully')
            }
          },error=> {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 409 || error.status === 500) {
                alert('Already Exist');
              } else {
                alert('internal error occured')
              }
            } else {
              alert('internal error occured without any http error');
            }
          })
      }
    }
  }
  
  //submit half form
  onSubmitharvestForm() {
    this.submitted = true;
    console.log(this.halfharvestform.value);
    if (!this.halfharvestform.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this._inputFeed.createHalfHarvest(this.halfharvestform.value)
          .subscribe(res => {
            alert('Partial Harvest added Successfully')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
  // full harvesrt
    //submit form
    onSubmitFullharvestForm() {
      this.submitted = true;
      console.log(this.fullharvestForm.value);
      if (!this.fullharvestForm.valid) {
        return false;
      } else {
        if (window.confirm('Are you sure?')) {
          this._inputFeed.createFullHarvest(this.fullharvestForm.value)
            .subscribe(res => {
              alert('Full Harvest added Successfully')
            }, (error) => {
              console.log(error)
            })
        }
      }
    }
}
