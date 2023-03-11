import { Component, OnInit } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

 
  constructor(private AddFarmService: AddFarmService) { }
  accountsData:any;
  ngOnInit() {
    this.getAccounts()
  }

  getAccounts(){
    this.AddFarmService.getAccounts().subscribe((data =>{
      this.accountsData=data;
      console.log(data)
   }))
  }

}
