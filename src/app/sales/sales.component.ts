import { Component, OnInit } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  constructor(private AddFarmService: AddFarmService) { }
  salesData:any;
  ngOnInit() {
    this.getSales()
  }

  getSales(){
    this.AddFarmService.getSales().subscribe((data =>{
      this.salesData=data;
      console.log(data)
   }))
  }
}
