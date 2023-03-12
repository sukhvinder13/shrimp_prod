import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AddFarmService } from 'app/services/add-farm.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

 
  constructor(private AddFarmService: AddFarmService) { }
  accountsData:any={};
  // @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['account_id','limit'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.getAccounts()
  }
  
  getAccounts(){
    this.AddFarmService.getAccounts().subscribe((res:any) =>{
      this.accountsData=res.posts;
  this.dataSource = new MatTableDataSource<any>(this.accountsData);
  this.dataSource.paginator = this.paginator;


      console.log(res)
   })
  }

}
