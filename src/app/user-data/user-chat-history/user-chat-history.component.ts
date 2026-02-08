import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { takeUntil } from 'rxjs/operators';

interface ChatMessage {
  from: string;
  message: string;
}

@Component({
  selector: 'app-user-chat-history',
  templateUrl: './user-chat-history.component.html',
  styleUrls: ['./user-chat-history.component.scss']
})
export class UserChatHistoryComponent extends BaseDataTableComponent<ChatMessage> {
  displayedColumns: string[] = ['from', 'message'];
  chatForm: FormGroup;
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
    this.chatForm = this.fb.group({
      name: [localStorage.getItem('userInfo')],
      email: [],
      sent: [],
      message: [],
      from: [],
      to: [],
      createdBy: [this.userId],
      createdOn: [new Date()]
    });
  }

  loadData(): void {
    this.farmService
      .getConvoById({ createdBy: this.userId })
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const data = this.extractPostsData(response);
        this.setTableData(data);
      });

    this.farmService
      .getUserDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.userDetails = this.extractPostsData(response);
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

  saveMessage(): void {
    if (this.chatForm.valid) {
      this.farmService
        .sendConvo(this.chatForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.toastr.success('Message saved successfully');
          this.loadData();
          this.chatForm.reset();
        });
    }
  }
}
