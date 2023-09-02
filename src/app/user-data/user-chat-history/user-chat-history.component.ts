import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-chat-history',
  templateUrl: './user-chat-history.component.html',
  styleUrls: ['./user-chat-history.component.scss']
})
export class UserChatHistoryComponent implements OnInit {

  displayedColumns:String[]=['from','message'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  chatForm: FormGroup;
userDetails:any;
  constructor(private AddFarmService: AddFarmService,private modalService:NgbModal,
    private toastr:ToastrService, private fb: FormBuilder) { }
  transactionData:any;
  ngOnInit() {
    this.getChatHistory();
    this.loadChatData()
  }

  getChatHistory(){
    let obj={
      'createdBy':localStorage.getItem('_id')
    }
    this.AddFarmService.getConvoById(obj).subscribe((data:any) =>{
      this.dataSource=data.posts;
      console.log(data.posts)
      this.setPagination(this.dataSource)
   })
   this.AddFarmService.getUserDetails().subscribe((data:any) =>{
    console.log(data);
    this.userDetails=data.posts;
 })
  }
  setPagination(data) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }
  closeResult: string;
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  loadChatData() {
    this.chatForm = this.fb.group({
      name: [localStorage.getItem('userInfo')],
      email: [],
      sent: [],
      message: [],
      from: [],
      to: [],
       createdBy: [localStorage.getItem('_id')],
      createdOn: [new Date()],
    })
  }
  selectedValue(event){
    console.log(event.target.value)
  }
  save(){
    this.AddFarmService.sendConvo(this.chatForm.value).subscribe((data:any) =>{
      console.log(data);
      this.toastr.success("saved")
   })
  }
}
