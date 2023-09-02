import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-customers-data',
  templateUrl: './customers-data.component.html',
  styleUrls: ['./customers-data.component.scss']
})
export class CustomersDataComponent implements OnInit {
  customerData: any;
  customerForm: FormGroup;
  constructor(private AddFarmService: AddFarmService,
    private fb: FormBuilder, private toast: ToastrService,
    private titleService: Title, private modalService: NgbModal,
    private datePipe: DatePipe) {
    // this.titleService.setTitle("Customers");
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['sr', 'email', 'name', 'birthdate', 'address', 'action'];
  dataSource = new MatTableDataSource<any>();
  ngOnInit() {
    this.loadCustomerForm();
    this.getCustomer();
    // this.sendMessage()
  }

  getCustomer() {
    this.AddFarmService.getCustoemrs().subscribe((data: customersData) => {
      this.customerData = data
      this.setPagination(data.posts)
    })
  }
  setPagination(data) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }
  loadCustomerForm() {
    this.customerForm = this.fb.group({
      id: [null],
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthdate: [''],
      username: [''],
      accounts: [''],
      tier_and_details: ['']
    })
  }
  saveCustomer() {
    let obj = this.customerForm.value;
    obj.updatedBy = localStorage.getItem('userInfo');
    obj.birthdate = new Date(obj.birthdate);
    if (this.customerForm.value.id == null) {

      this.AddFarmService.saveCustomer(obj).subscribe((data: any) => {
        if (data) {
          this.customerData.posts.push(data.result);
          this.setPagination(this.customerData.posts)
          this.toast.success('Save Successfully')
        }
      })
    } else {
      this.updateRecord(obj)
    }

  }
  sendMessage(){
    let info={
        "name": localStorage.getItem('userInfo'),
        "email": "iain_glen@gameofthron.es",
        "sent": "This is for testing",
        "received": "This is for testing",
        "from": localStorage.getItem('_id'),
        "to": localStorage.getItem('_id'),
        "createdBy": localStorage.getItem('_id'),
        "updatedBy": localStorage.getItem('userInfo'),
        "lastModified": new Date(),
        "createdOn":new Date()
    }
    this.AddFarmService.sendConvo(info).subscribe((data =>{
      console.log(data)
   }))
  }
  deleteRow(element) {
    let obj = {
      id: element
    }
    this.AddFarmService.deleteCustomer(obj).subscribe(data => {
      if (data) {
        this.toast.success('Deleted Successfully', 'Deleted')
        const index = this.customerData.posts.indexOf(element);
        this.customerData.posts.splice(index, 1);
        this.setPagination(this.customerData.posts)
      }
    })
  }
  dateFormat(param) {
    return moment(param).format("YYYY-MM-DD HH:mm:ss");
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  dateFormatter(param) {
    return this.datePipe.transform(new Date(param), 'yyyy-dd-MM')
  }
  editRow(element) {
    console.log('edit row')
    this.selectedRows = element;
    this.customerForm = this.fb.group({
      id: [element._id],
      email: [element.email ? element.email : ''],
      name: [element.name ? element.name : ''],
      address: [element.address ? element.address : ''],
      birthdate: [this.dateFormatter(element.birthdate) ? this.dateFormatter(element.birthdate) : ''],
      username: [element.username ? element.username : ''],
      accounts: [element.accounts ? element.accounts : ''],
      tier_and_details: [element.tier_and_details ? element.tier_and_details : '']
    })
  }
  updateRecord(obj) {

    this.AddFarmService.updateCustomer(obj).subscribe((datas: any) => {
      if (datas.success) {
        this.toast.success('Updated Successfully')
        const index = this.customerData.posts.indexOf(this.selectedRows);
        this.customerData.posts[index] = datas.result;
        this.setPagination(this.customerData.posts);
      } else {
        this.toast.warning('Failed')
      }
    })
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  closeResult: string;
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  close() {
    //('close')
    this.modalService.dismissAll();
  }
  onDoubleClick(row, mymodal) {
    this.selectedRows = row;
    let newObj = []
    if(row?.tier_and_details !== undefined){
    Object.keys(row.tier_and_details).forEach(key => {
    });
  }
  row['tier_and_detail_array'] = newObj;
    this.open(mymodal)
  }
  selectedRows: any;
  selectedRow(row) {
    this.dateFormat(row.birthdate)
    this.selectedRows = row;
  }
}
export class customersData {

  posts: cust[];
  result: {}
}
export class cust {
  id: string
  email: string
  name: string
  address: string
  birthdate: Date
}
