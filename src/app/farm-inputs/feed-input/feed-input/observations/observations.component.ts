import { Component, OnInit } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ActivatedRoute } from '@angular/router';
import { FeedInputService } from 'app/services/feed-input/feed-input.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray } from '@angular/forms';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {

  SelectedFeeds: string;
  selectFeeds: string[] = ['Feed1', 'Feed2', 'Feed3', 'Feed4'];
  shrimpobvform: UntypedFormGroup;
  waterobvform: UntypedFormGroup;
  farmData: any = [];
  farmFetchedById: any = [];
  responseData: Array<any>;
  div_shrimp: boolean = false;
  div_water: boolean = false;
  farm_Id: string;
  farm_Date: string;
  feedInput: string;
  submitted = false;
  constructor(private formBuilder: UntypedFormBuilder,
    private _addFarmService: AddFarmService,
    private route: ActivatedRoute,
    private _inputFeed: FeedInputService) { }

  ngOnInit() {
    this.farm_Id = this.route.snapshot.params.farmId;
    this.farm_Date = this.route.snapshot.params.farmDate;
    this.shrimpobvform = this.formBuilder.group({
      farmCode: [this.farm_Id, Validators.required],
      selectedAt: [this.farm_Date, Validators.required],
      inputType: ['Shrimp Observation', Validators.required],
      feedInput: ['', Validators.required],
      TankInput: this.formBuilder.array([
        this.initResponse(),
      ])
    });
    this.waterobvform = this.formBuilder.group({
      farmCode: [this.farm_Id, Validators.required],
      selectedAt: [this.farm_Date, Validators.required],
      inputType: ['Water Observation', Validators.required],
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
      this.shrimpobvform.setControl('TankInput', this.setResponseShrimp(this.responseData));
      this.waterobvform.setControl('TankInput', this.setResponseWater(this.responseData));
    })
  }
  setResponseShrimp(responseSet): UntypedFormArray {
    const formArray = new UntypedFormArray([]);
    responseSet.forEach(s => {
      formArray.push(this.formBuilder.group({
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
        kidny_color_change: s.kidny_color_change,
        head_water: s.head_water,
        white_muscle: s.white_muscle,
        mineral_bends: s.mineral_bends,
        gottuku_ravadam: s.gottuku_ravadam,
        paina_eedadam: s.paina_eedadam,
        body_cracks: s.body_cracks,
        hatchery_bends: s.hatchery_bends,
        loose_shell: s.loose_shell,
        deads: s.deads,
        EPH: s.EPH,
        virus: s.virus,
        white_spot: s.white_spot,
        potti_royya: s.potti_royya,
        snail: s.snail,
        do: s.do,
        theegalu: s.theegalu,
        chikkadanam: s.chikkadanam,
        water_crash: s.water_crash,
        turbidity: s.turbidity,
        water_color: s.water_color,
      }))
    })
    return formArray;
  }
  //Adding tank_ dynamically for checknet
  setResponseWater(responseSet_water): UntypedFormArray {
    const formArray = new UntypedFormArray([]);
    responseSet_water.forEach(s => {
      formArray.push(this.formBuilder.group({
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
        kidny_color_change: s.kidny_color_change,
        head_water: s.head_water,
        white_muscle: s.white_muscle,
        mineral_bends: s.mineral_bends,
        gottuku_ravadam: s.gottuku_ravadam,
        paina_eedadam: s.paina_eedadam,
        body_cracks: s.body_cracks,
        hatchery_bends: s.hatchery_bends,
        loose_shell: s.loose_shell,
        deads: s.deads,
        EPH: s.EPH,
        virus: s.virus,
        white_spot: s.white_spot,
        potti_royya: s.potti_royya,
        snail: s.snail,
        do: s.do,
        theegalu: s.theegalu,
        chikkadanam: s.chikkadanam,
        water_crash: s.water_crash,
        turbidity: s.turbidity,
        water_color: s.water_color,
      }))
    })
    return formArray;
  }
  //add dynamic feed array
  initResponse() {
    return this.formBuilder.group({
      tank_area: ['', Validators.required],
      tank_name: ['', Validators.required],
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
      empty_gut: ['', Validators.required],
      plankton_gut: ['', Validators.required],
      soil_gut: ['', Validators.required],
      gap_gut: ['', Validators.required],
      black_gill: ['', Validators.required],
      brown_gill: ['', Validators.required],
      no_jiguru: ['', Validators.required],
      size_variation: ['', Validators.required],
      toka_erupulu: ['', Validators.required],
      kallu_erupulu: ['', Validators.required],
      kidny_color_change: ['', Validators.required],
      head_water: ['', Validators.required],
      white_muscle: ['', Validators.required],
      mineral_bends: ['', Validators.required],
      gottuku_ravadam: ['', Validators.required],
      paina_eedadam: ['', Validators.required],
      body_cracks: ['', Validators.required],
      hatchery_bends: ['', Validators.required],
      loose_shell: ['', Validators.required],
      deads: ['', Validators.required],
      EPH: ['', Validators.required],
      virus: ['', Validators.required],
      white_spot: ['', Validators.required],
      potti_royya: ['', Validators.required],
      snail: ['', Validators.required],
      do: ['', Validators.required],
      theegalu: ['', Validators.required],
      chikkadanam: ['', Validators.required],
      water_crash: ['', Validators.required],
      turbidity: ['', Validators.required],
      water_color: ['', Validators.required],
    })
  };
  //add dynamic checknet array
  initResponseCheckNet() {
    return this.formBuilder.group({
      tank_area: ['', Validators.required],
      tank_name: ['', Validators.required],
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
      empty_gut: ['', Validators.required],
      plankton_gut: ['', Validators.required],
      soil_gut: ['', Validators.required],
      gap_gut: ['', Validators.required],
      black_gill: ['', Validators.required],
      brown_gill: ['', Validators.required],
      no_jiguru: ['', Validators.required],
      size_variation: ['', Validators.required],
      toka_erupulu: ['', Validators.required],
      kallu_erupulu: ['', Validators.required],
      kidny_color_change: ['', Validators.required],
      head_water: ['', Validators.required],
      white_muscle: ['', Validators.required],
      mineral_bends: ['', Validators.required],
      gottuku_ravadam: ['', Validators.required],
      paina_eedadam: ['', Validators.required],
      body_cracks: ['', Validators.required],
      hatchery_bends: ['', Validators.required],
      loose_shell: ['', Validators.required],
      deads: ['', Validators.required],
      EPH: ['', Validators.required],
      virus: ['', Validators.required],
      white_spot: ['', Validators.required],
      potti_royya: ['', Validators.required],
      snail: ['', Validators.required],
      do: ['', Validators.required],
      theegalu: ['', Validators.required],
      chikkadanam: ['', Validators.required],
      water_crash: ['', Validators.required],
      turbidity: ['', Validators.required],
      water_color: ['', Validators.required],
    })
  };
  loadShrimpObv() {
    this.div_shrimp = true;
    this.div_water = false;
    document.getElementById("shrimpb1").style.background = "green";
    document.getElementById("waterb2").style.background = "";
  }
  loadWaterObv() {
    this.div_shrimp = false;
    this.div_water = true;
    document.getElementById("shrimpb1").style.background = "";
    document.getElementById("waterb2").style.background = "green";
  }
  changeFeed(event) {
    console.log(event);
    this.feedInput = event.value;
  }
  get f() { return this.shrimpobvform.controls; }
  get c() { return this.waterobvform.controls; }
  //submit form
  onSubmit() {
    this.submitted = true;
    this.shrimpobvform.patchValue({ feedInput: this.feedInput });
    console.log(this.shrimpobvform.value);
    if (!this.shrimpobvform.valid && this.feedInput == 'undefined') {
      alert('Please select Feed')
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this._inputFeed.createShrimpObv(this.shrimpobvform.value)
          .subscribe(res => {
            alert('Shrimp Observation created Successfully')
            // this.router.navigateByUrl('/manageLesson');
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
  //submit form
  onSubmitWater() {
    this.submitted = true;
    this.waterobvform.patchValue({ feedInput: this.feedInput });
    console.log(this.waterobvform.value);
    if (!this.waterobvform.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this._inputFeed.createWaterObv(this.waterobvform.value)
          .subscribe(res => {
            alert('Water Observation added Successfully')
            // this.router.navigateByUrl('/manageLesson');
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
