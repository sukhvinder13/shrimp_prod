import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';

@Component({
  selector: 'app-customers-data',
  templateUrl: './customers-data.component.html',
  styleUrls: ['./customers-data.component.scss']
})
export class CustomersDataComponent implements OnInit {
  customerData:any;
  constructor(private AddFarmService: AddFarmService) { }

  @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['sr','email','name','birthdate','address'];
  dataSource = new MatTableDataSource<any>();
  ngOnInit() {
    this.getCustomer()
  }

  getCustomer(){
    this.AddFarmService.getCustoemrs().subscribe((data:any) =>{
      this.customerData=data
      console.log(data)
      
  this.dataSource = new MatTableDataSource<any>(data.posts);
  this.dataSource.paginator = this.paginator;
   })
  }
}
