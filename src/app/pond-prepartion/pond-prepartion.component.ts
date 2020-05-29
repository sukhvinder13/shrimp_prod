import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pond-prepartion',
  templateUrl: './pond-prepartion.component.html',
  styleUrls: ['./pond-prepartion.component.scss']
})
export class PondPrepartionComponent implements OnInit {

  constructor() { }
  SelectedPondInputs: string;
  selectPondInputs: string[] = ['Add Medicine','Add Water Report','Add Picture'];
  SelectedTanks: string;
  selectTanks: string[] = ['T1','T2','T3','T4'];

  ngOnInit() {
    this.SelectedPondInputs = this.selectPondInputs[0];

  }
  
  ChangePondStage(event){
    console.log('chnaged', event && event.value);

    }

}
