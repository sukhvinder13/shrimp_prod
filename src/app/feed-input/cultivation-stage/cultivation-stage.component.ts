import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cultivation-stage',
  templateUrl: './cultivation-stage.component.html',
  styleUrls: ['./cultivation-stage.component.scss']
})
export class CultivationStageComponent implements OnInit {

  constructor() { }

  SelectedInput: string;
  selectInputs: string[] = ['Feed', 'Water Medicine', 'CheckNet', 'Shrimp Condition',
   'Water Condition','Water Report'];

   SelectedFeeds: string;
   selectFeeds: string[] = ['F1','F2','F3','F4'];

   SelectedTanks: string;
   selectTanks: string[] = ['T1','T2','T3','T4'];

   SelectedCNs: string;
   selectCNs: string[] = ['CN1','CN2','CN3','CN4','CN5','CN6'];

   SelectedServerity: string;
   selectServerity: string[] = ['1','2','3','4','5','6'];
    // $('.file-upload').file_upload();

  ngOnInit() {
    // $('.file-upload').file_upload();

    this.SelectedInput = this.selectInputs[2];
  }
  changeComboo(event) {
    console.log('chnaged', event && event.value);
  }

}
