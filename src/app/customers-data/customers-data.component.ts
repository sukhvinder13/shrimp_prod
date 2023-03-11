import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AddFarmService } from 'app/services/add-farm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers-data',
  templateUrl: './customers-data.component.html',
  styleUrls: ['./customers-data.component.scss']
})
export class CustomersDataComponent implements OnInit {
  customerData:any;
  constructor(private AddFarmService: AddFarmService,private toastr: ToastrService) { }

  @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['sr','email','name','birthdate','address'];
  dataSource = new MatTableDataSource<any>();
  ngOnInit() {
    this.getCustomer()
  }

  getCustomer(){
    this.AddFarmService.getCustoemrs().subscribe((data =>{
      this.customerData=data;
      this.toastr.success('Success')
      console.log(data)
      
  this.dataSource = new MatTableDataSource<any>(data.posts);
  this.dataSource.paginator = this.paginator;
   }))
  }
}
