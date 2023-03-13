import { Component, OnInit } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor(private AddFarmService: AddFarmService) { }
  transactionData:any;
  ngOnInit() {
    this.getTransactions()
  }

  getTransactions(){
    this.AddFarmService.getTransactions().subscribe((data =>{
      this.transactionData=data;
      console.log(data)
   }))
  }

}
