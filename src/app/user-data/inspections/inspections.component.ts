import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.scss']
})
export class InspectionsComponent implements OnInit {
  // @ViewChild(MatSort) sort:MatSort;
  constructor(private AddFarmService: AddFarmService) { }
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  inspections:any;
  inspectiondataSource=new  MatTableDataSource();
  displayedColumns:String[]=['business_name', 'certificate_number', 'result','sector', 'date'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.getInspections()
  }
  getInspections(){
    this.AddFarmService.getInspections().subscribe((data =>{
      this.inspections=data;
      console.log(this.inspections)
      this.dataSource =this.inspections.posts;
      this.setPagination(this.dataSource)
   }))
  }
  setPagination(data) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }
}
