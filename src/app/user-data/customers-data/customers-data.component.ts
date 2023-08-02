import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers-data',
  templateUrl: './customers-data.component.html',
  styleUrls: ['./customers-data.component.scss']
})
export class CustomersDataComponent implements OnInit {
  customerData: any;
  customerForm: FormGroup;
  constructor(private AddFarmService: AddFarmService, private fb: FormBuilder,private toast:ToastrService) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['sr', 'email', 'name', 'birthdate', 'address','action'];
  dataSource = new MatTableDataSource<any>();
  ngOnInit() {
    this.loadCustomerForm();
    this.getCustomer()
  }

  getCustomer() {
    this.AddFarmService.getCustoemrs().subscribe((data: any) => {
      this.customerData = data
      this.dataSource = new MatTableDataSource<any>(data.posts);
      this.dataSource.paginator = this.paginator;
    })
  }
  loadCustomerForm() {
    this.customerForm = this.fb.group({
      id: [''],
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthdate: ['24/09/1993'],
    })
  }
  saveCustomer() {
    console.log(this.customerForm.value);
    this.AddFarmService.saveCustomer(this.customerForm.value).subscribe(data => {
      if(data){
        console.log(data);
        this.toast.success('Save Successfully')
        this.getCustomer()
      }
    })
  }
  deleteRow(element){
    console.log(element);
    let obj={
      id:element
    }
    this.AddFarmService.deleteCustomer(obj).subscribe(data => {
      if(data){
        this.toast.success('Deleted Successfully')
        console.log(data);
        this.getCustomer()
      }
    })
  }
}
