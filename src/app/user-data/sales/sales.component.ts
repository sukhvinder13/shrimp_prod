import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  constructor(private AddFarmService: AddFarmService) { }
  salesData:any;
  displayedColumns:String[]=['couponUsed','email', 'gender', 'storeLocation', 'purchaseMethod'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.getSales()
  }

  getSales(){
    this.AddFarmService.getSales().subscribe((data =>{
      this.salesData=data;
      console.log(data)
      this.dataSource =this.salesData.posts;
      this.setPagination(this.dataSource)
   }))
  }
  setPagination(data) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }
}
