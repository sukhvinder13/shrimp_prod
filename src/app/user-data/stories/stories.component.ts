import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableColumn, TableConfig, TableActionEvent } from 'app/common/component/reusable-table/reusable-table.component';
import { ModalConfig, FormField } from 'app/common/component/form-modal/form-modal.component';

interface Story {
  account_id: string;
  transaction_count: number;
}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn[] = [
    { key: 'account_id', label: 'Account ID', width: '200px' },
    { key: 'transaction_count', label: 'Transaction Count', width: '150px' }
  ];

  tableConfig: TableConfig = {
    title: 'Stories',
    showFilter: true,
    showActions: false,
    pageSizeOptions: [10, 20, 30],
    pageSize: 10
  };

  tableData: Story[] = [];
  storyForm: FormGroup;
  modalConfig: ModalConfig;
  formFields: FormField[] = [];
  userDetails: any;
  userId: string;
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
    this.storyForm = this.fb.group({
      name: [localStorage.getItem('userInfo')],
      email: [],
      story: ['', Validators.required],
      createdBy: [this.userId],
      createdOn: [new Date()]
    });
  }

  private initializeFormFields(): void {
    this.formFields = [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        columnSize: 'half',
        disabled: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        columnSize: 'half',
        disabled: true
      },
      {
        name: 'story',
        label: 'Story',
        type: 'textarea',
        placeholder: 'Write your story here',
        required: true,
        columnSize: 'full',
        rows: 4
      }
    ];
  }

  private initializeModalConfig(): void {
    this.modalConfig = {
      title: 'Add Story',
      submitButtonText: 'Post',
      cancelButtonText: 'Cancel',
      size: 'lg'
    };
  }

  private loadData(): void {
    this.farmService
      .getAllStories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          const data = response?.posts || response || [];
          this.tableData = data;
        },
        (error) => {
          console.error('Failed to load stories', error);
          this.toastr.error('Failed to load stories');
        }
      );
  }

  saveStory(): void {
    if (this.storyForm.valid) {
      this.farmService
        .saveStory(this.storyForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.toastr.success('Story saved successfully');
            this.loadData();
            this.resetForm();
          },
          (error) => {
            console.error('Failed to save story', error);
            this.toastr.error('Failed to save story');
          }
        );
    }
  }

  resetForm(): void {
    this.storyForm.reset({
      name: localStorage.getItem('userInfo'),
      createdBy: this.userId,
      createdOn: new Date()
    });
  }

  onTableAction(event: TableActionEvent): void {
    // No actions for stories table currently
  }
}
