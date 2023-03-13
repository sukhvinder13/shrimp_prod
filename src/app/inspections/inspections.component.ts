import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddFarmService } from 'app/services/add-farm.service';

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
  displayedColumns:['business_name', 'name', 'weight', 'symbol'];
  ngOnInit() {
    this.getInspections()
  }
  getInspections(){
    this.AddFarmService.getInspections().subscribe((data =>{
      this.inspections=data;
      console.log(data);
      this.inspectiondataSource =this.inspections.posts;
   }))
  }
}
