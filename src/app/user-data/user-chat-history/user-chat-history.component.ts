import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ModalConfig, FormField, FieldType } from 'app/common/component/form-modal/form-modal.component';
import { takeUntil } from 'rxjs/operators';
import { TableColumn, TableConfig, TableActionEvent } from 'app/common/component/reusable-table/reusable-table.component';

interface ChatMessage {
  from: string;
  message: string;
}

@Component({
  selector: 'app-user-chat-history',
  templateUrl: './user-chat-history.component.html',
  styleUrls: ['./user-chat-history.component.scss']
})
export class UserChatHistoryComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn[] = [
    { key: 'from', label: 'From', width: '200px' },
    { key: 'message', label: 'Message', width: 'auto' }
  ];

  tableConfig: TableConfig = {
    title: 'Chat History',
    showFilter: true,
    showActions: false,
    pageSizeOptions: [10, 20, 30],
    pageSize: 10
  };

  tableData: ChatMessage[] = [];
  chatForm: FormGroup;
  userDetails: any;
  userId: string;
  modalConfig: ModalConfig;
  formFields: FormField[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private farmService: AddFarmService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.initializeForm();
    this.initializeFormFields();
    this.initializeModalConfig();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  private loadData(): void {
    this.farmService
      .getConvoById({ createdBy: this.userId })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          const data = response?.posts || response || [];
          this.tableData = data;
        },
        (error) => {
          console.error('Failed to load chat history', error);
          this.toastr.error('Failed to load chat history');
        }
      );

    this.farmService
      .getUserDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          const data = response?.posts || response || [];
          this.userDetails = data;
          // Update form field options with user details
          if (this.userDetails && this.formFields[0]) {
            this.formFields[0].options = this.userDetails.map(user => ({
              label: user.name,
              value: user._id
            }));
          }
        },
        (error) => {
          console.error('Failed to load user details', error);
        }
      );
  }

  saveMessage(): void {
    if (this.chatForm.valid) {
      this.farmService
        .sendConvo(this.chatForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.toastr.success('Message sent successfully');
            this.loadData();
            this.resetForm();
          },
          (error) => {
            console.error('Failed to send message', error);
            this.toastr.error('Failed to send message');
          }
        );
    }
  }

  resetForm(): void {
    this.chatForm.reset();
  }

  onTableAction(event: TableActionEvent): void {
    // No actions for chat history table currently
  }
}
