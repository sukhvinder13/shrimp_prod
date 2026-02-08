import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { ModalConfig, FormField, FieldType } from 'app/common/component/form-modal/form-modal.component';
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
  userId: string;
  modalConfig: ModalConfig;
  formFields: FormField[] = [];

  constructor(
    farmService: AddFarmService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    super(farmService);
    this.initializeForm();
    this.initializeFormFields();
    this.initializeModalConfig();
  }

  private initializeForm(): void {
    this.userId = localStorage.getItem('_id') || '';
    this.chatForm = this.fb.group({
      to: ['', Validators.required],
      message: ['', Validators.required],
      createdBy: [this.userId],
      createdOn: [new Date()]
    });
  }

  private initializeFormFields(): void {
    this.formFields = [
      { 
        name: 'to', 
        label: 'Send To', 
        type: 'select', 
        required: true, 
        columnSize: 'full',
        options: []
      },
      { 
        name: 'message', 
        label: 'Message', 
        type: 'textarea', 
        required: true, 
        columnSize: 'full',
        rows: 4,
        placeholder: 'Enter your message'
      }
    ];
  }

  private initializeModalConfig(): void {
    this.modalConfig = {
      title: 'Send Message',
      submitButtonText: 'Send',
      cancelButtonText: 'Cancel',
      size: 'lg'
    };
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
        // Update form field options with user details
        if (this.userDetails && this.formFields[0]) {
          this.formFields[0].options = this.userDetails.map(user => ({
            label: user.name,
            value: user._id
          }));
        }
      });
  }

  saveMessage(): void {
    if (this.chatForm.valid) {
      this.farmService
        .sendConvo(this.chatForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.toastr.success('Message sent successfully');
          this.loadData();
          this.resetForm();
        });
    }
  }

  resetForm(): void {
    this.chatForm.reset();
  }
}
