import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/common/service/loader/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom

})
export class SpinnerComponent implements OnInit {

  constructor(public loader: LoaderService) { }


  ngOnInit() {
  }

}
