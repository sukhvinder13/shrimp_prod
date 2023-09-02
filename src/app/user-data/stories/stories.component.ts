import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  displayedColumns: String[] = ['account_id', 'transaction_count'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  storyForm: FormGroup;
  userDetails: any;
  constructor(private AddFarmService: AddFarmService, private modalService: NgbModal,
    private toastr: ToastrService, private fb: FormBuilder) { }
  transactionData: any;
  ngOnInit() {
    this.getStory();
    this.loadStory()
  }

  getStory() {
    let obj = {
      'createdBy': localStorage.getItem('_id')
    }
    this.AddFarmService.getAllStories().subscribe((data: any) => {
      this.dataSource = data.posts;
      console.log(data.posts)
      this.setPagination(this.dataSource)
    })
    //    this.AddFarmService.getUserDetails().subscribe((data:any) =>{
    //     console.log(data);
    //     this.userDetails=data.storys;
    //  })
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
  loadStory() {
    this.storyForm = this.fb.group({
      name: [localStorage.getItem('userInfo')],
      email: [],
      story: [],
      createdBy: [localStorage.getItem('_id')],
      createdOn: [new Date()],
    })
  }
  selectedValue(event) {
    console.log(event.target.value)
  }
  save() {
    this.AddFarmService.saveStory(this.storyForm.value).subscribe((data: any) => {
      if (data) {
        this.toastr.success("Story saved Successfully")
      }
    })
  }
}
