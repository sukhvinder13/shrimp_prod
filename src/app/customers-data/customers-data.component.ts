import { Component, OnInit } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm.service';

@Component({
  selector: 'app-customers-data',
  templateUrl: './customers-data.component.html',
  styleUrls: ['./customers-data.component.scss']
})
export class CustomersDataComponent implements OnInit {
  customerData:any;
  constructor(private AddFarmService: AddFarmService) { }

  ngOnInit() {
    this.getCustomer()
  }

  getCustomer(){
    this.AddFarmService.getCustoemrs().subscribe((data =>{
      this.customerData=data;
      console.log(data)
   }))
  }
}
