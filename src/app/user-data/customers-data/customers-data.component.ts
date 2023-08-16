import { DatePipe } from '@angular/common';
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
  constructor(private AddFarmService: AddFarmService, private fb: FormBuilder, private toast: ToastrService, private datePipe: DatePipe) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['sr', 'email', 'name', 'birthdate', 'address', 'action'];
  dataSource = new MatTableDataSource<any>();
  ngOnInit() {
    this.loadCustomerForm();
    this.getCustomer()
  }

  getCustomer() {
    this.AddFarmService.getCustoemrs().subscribe((data: customersData) => {
      this.customerData = data
      this.dataSource = new MatTableDataSource<any>(data.posts);
      this.dataSource.paginator = this.paginator;
    })
  }
  loadCustomerForm() {
    this.customerForm = this.fb.group({
      id: [null],
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthdate: ['24/09/1993'],
    })
  }
  saveCustomer() {
    console.log(this.customerForm.value);
    console.log(this.dateFormatter(this.customerForm.value.birthdate));
    if (this.customerForm.value.id == null) {
      this.AddFarmService.saveCustomer(this.customerForm.value).subscribe(data => {
        if (data) {
          this.toast.success('Save Successfully')
          this.getCustomer()
        }
      })
    } else {
      this.updateRecord()
    }

  }
  deleteRow(element) {
    let obj = {
      id: element
    }
    this.AddFarmService.deleteCustomer(obj).subscribe(data => {
      if (data) {
        console.log(data)
        this.toast.success('Deleted Successfully')
        this.getCustomer()
      }
    })
  }
  dateFormat() {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  dateFormatter(param) {
    return this.datePipe.transform(param, 'MM/dd/yyyy')
  }
  editRow(element) {
    console.log(element);
    console.log(this.dateFormatter(element.birthdate))
    this.customerForm = this.fb.group({
      id: [element._id],
      email: [element.email ? element.email : ''],
      name: [element.name ? element.name : ''],
      address: [element.address ? element.address : ''],
      birthdate: [element.birthdate ? element.birthdate : ''],
    })
  }
  updateRecord() {
    this.AddFarmService.updateCustomer(this.customerForm.value).subscribe(data => {
      console.log(data)
      if (data) {
        this.toast.success('Updated Successfully')
        this.getCustomer()
      }
    })
  }
  selectedRows: any;
  selectedRow(row) {
    console.log(this.dateFormatter(row.birthdate))
    this.selectedRows = row;
  }
}
export class customersData {

  posts: cust[];
}
export class cust {
  id: string
  email: string
  name: string
  address: string
  birthdate: Date
}
