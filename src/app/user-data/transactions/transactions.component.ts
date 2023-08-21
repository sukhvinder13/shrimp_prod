import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  displayedColumns:String[]=['account_id','transaction_count', 'bucket_start_date', 'bucket_end_date'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private AddFarmService: AddFarmService) { }
  transactionData:any;
  ngOnInit() {
    this.getTransactions()
  }

  getTransactions(){
    this.AddFarmService.getTransactions().subscribe((data:any) =>{
      this.dataSource=data.Transactions;
      console.log(data)
      this.setPagination(this.dataSource)
   })
  }
  setPagination(data) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }

}
