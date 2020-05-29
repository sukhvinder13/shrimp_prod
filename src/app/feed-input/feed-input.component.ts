import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-input',
  templateUrl: './feed-input.component.html',
  styleUrls: ['./feed-input.component.scss']
})
export class FeedInputComponent implements OnInit {

  constructor() { }

  public pondPrepartionComponent: boolean = false;
  public cultivationStage: boolean =false;


  ngOnInit() {
    // $('.file-upload').file_upload();

    // this.SelectedInput = this.selectInputs[2];
  }
  changeComboo(event) {
    console.log('chnaged', event && event.value);
  }
  loadPondPrepartion() {
    this.pondPrepartionComponent = true;
    this.cultivationStage = false;
    document.getElementById("b1").style.background= "green";
    document.getElementById("b2").style.background= "";
    document.getElementById("b3").style.background= "";
    document.getElementById("b4").style.background= "";

  }
  loadCultivationStage(){
    this.cultivationStage = true;
    this.pondPrepartionComponent = false;
    document.getElementById("b2").style.background= "green";
    document.getElementById("b1").style.background= "";
    document.getElementById("b3").style.background= "";
    document.getElementById("b4").style.background= "";
  }
  loadHalfHarvest(){
    this.cultivationStage = false;
    this.pondPrepartionComponent = false;
    document.getElementById("b1").style.background= "";
    document.getElementById("b2").style.background= "";
    document.getElementById("b3").style.background= "green";
    document.getElementById("b4").style.background= "";

  }
  loadFullHarvest(){
    this.cultivationStage = false;
    this.pondPrepartionComponent = false;
    document.getElementById("b1").style.background= "";
    document.getElementById("b2").style.background= "";
    document.getElementById("b3").style.background= "";
    document.getElementById("b4").style.background= "green";
  }
}
