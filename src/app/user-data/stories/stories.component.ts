import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { takeUntil } from 'rxjs/operators';

interface Story {
  account_id: string;
  transaction_count: number;
}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent extends BaseDataTableComponent<Story> {
  displayedColumns: string[] = ['account_id', 'transaction_count'];
  storyForm: FormGroup;
  userDetails: any;
  closeResult: string;
  userId: string;

  constructor(
    farmService: AddFarmService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    super(farmService);
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userId = localStorage.getItem('_id') || '';
    this.storyForm = this.fb.group({
      name: [localStorage.getItem('userInfo')],
      email: [],
      story: [],
      createdBy: [this.userId],
      createdOn: [new Date()]
    });
  }

  loadData(): void {
    this.farmService
      .getAllStories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const data = this.extractPostsData(response);
        this.setTableData(data);
      });
  }

  openModal(content: any): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        () => {
          this.closeResult = 'Closed with success';
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    return `with: ${reason}`;
  }

  saveStory(): void {
    if (this.storyForm.valid) {
      this.farmService
        .saveStory(this.storyForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.toastr.success('Story saved successfully');
          this.loadData();
        });
    }
  }
}
