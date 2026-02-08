import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { takeUntil } from 'rxjs/operators';
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
export class StoriesComponent extends BaseDataTableComponent<Story> {
  displayedColumns: string[] = ['account_id', 'transaction_count'];
  storyForm: FormGroup;
  modalConfig: ModalConfig;
  formFields: FormField[] = [];
  userDetails: any;
  userId: string;

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

  loadData(): void {
    this.farmService
      .getAllStories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const data = this.extractPostsData(response);
        this.setTableData(data);
      });
  }

  saveStory(): void {
    if (this.storyForm.valid) {
      this.farmService
        .saveStory(this.storyForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.toastr.success('Story saved successfully');
          this.loadData();
          this.resetForm();
        });
    }
  }

  resetForm(): void {
    this.storyForm.reset({
      name: localStorage.getItem('userInfo'),
      createdBy: this.userId,
      createdOn: new Date()
    });
  }
}
