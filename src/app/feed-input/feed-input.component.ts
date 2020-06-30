import { Component, OnInit } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-input',
  templateUrl: './feed-input.component.html',
  styleUrls: ['./feed-input.component.scss']
})
export class FeedInputComponent implements OnInit {
  message: string;
  farmData: any = [];
  selectedFarmId: any;
  selectedFarmDate: any;
  constructor(private _farmService: AddFarmService,
       private readonly router: Router ) { }

  public pondPrepartionComponent: boolean = false;
  public cultivationStage: boolean = false;
  public FeedAndChecknet: boolean = false;
  public WaterAndMedicine: boolean = false;
  public Observations:boolean =false;


  ngOnInit() {
    this.readFarm();
  }
  //read selected farm
  selectedFarm(value) {
    console.log(value.viewModel);
    this.selectedFarmId = value.viewModel.farmId;
    console.log(this.selectedFarmId)
    // this.router.navigate(['/urlname/stockdata', id]);
    // this.router.navigate(['/feed-input',this.selectedFarmId]);
  }
  //read date
  selectedDateFun(value){
    this.selectedFarmDate=value.viewModel;
    console.log(this.selectedFarmDate)
    this.router.navigate(['/feed-input',{farmId:this.selectedFarmId,farmDate:this.selectedFarmDate}]);

  }
  //get farm owner data
  //read farm owner
  readFarm() {
    this._farmService.getFarm().subscribe((data) => {
      this.farmData = data;
      console.log(data);
    })
  }

  changeComboo(event) {
    console.log('chnaged', event && event.value);
  }
  loadFeedAndChecknet() {
    this.FeedAndChecknet = true;
    this.cultivationStage = false;
    this.pondPrepartionComponent = false;
    this.WaterAndMedicine=false;
    this.Observations = false;
    document.getElementById("b1").style.background = "green";
    document.getElementById("b2").style.background = "";
    document.getElementById("b3").style.background = "";
    document.getElementById("b4").style.background = "";

  }
  loadWaterReportMedicine(){
    this.WaterAndMedicine=true;
    this.FeedAndChecknet = false;
    this.Observations = false;
    document.getElementById("b1").style.background = "";
    document.getElementById("b2").style.background = "green";
    document.getElementById("b3").style.background = "";
    document.getElementById("b4").style.background = "";
  }
  loadObservations(){
    this.Observations = true;
    this.WaterAndMedicine=false;
    this.FeedAndChecknet = false;
    document.getElementById("b1").style.background = "";
    document.getElementById("b2").style.background = "";
    document.getElementById("b3").style.background = "green";
    document.getElementById("b4").style.background = "";
  }
  loadPondPrepartion() {
    this.pondPrepartionComponent = true;
    this.cultivationStage = false;
    document.getElementById("b1").style.background = "green";
    document.getElementById("b2").style.background = "";
    document.getElementById("b3").style.background = "";
    document.getElementById("b4").style.background = "";

  }
  loadCultivationStage() {
    this.cultivationStage = true;
    this.pondPrepartionComponent = false;
    document.getElementById("b2").style.background = "green";
    document.getElementById("b1").style.background = "";
    document.getElementById("b3").style.background = "";
    document.getElementById("b4").style.background = "";
  }
  loadHalfHarvest() {
    this.cultivationStage = false;
    this.pondPrepartionComponent = false;
    document.getElementById("b1").style.background = "";
    document.getElementById("b2").style.background = "";
    document.getElementById("b3").style.background = "green";
    document.getElementById("b4").style.background = "";

  }
  loadFullHarvest() {
    this.cultivationStage = false;
    this.pondPrepartionComponent = false;
    document.getElementById("b1").style.background = "";
    document.getElementById("b2").style.background = "";
    document.getElementById("b3").style.background = "";
    document.getElementById("b4").style.background = "green";
  }
 
}
