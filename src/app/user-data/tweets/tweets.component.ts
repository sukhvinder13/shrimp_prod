import { Component } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { takeUntil } from 'rxjs/operators';
import { ModalConfig, FormField } from 'app/common/component/form-modal/form-modal.component';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface Tweet {
  text: string;
  in_reply_to_status_id?: string;
  created_at: Date;
  geo?: string;
  source: string;
  coordinates?: string;
  truncated?: boolean;
  in_reply_to_screen_name: string;
  entities?: Record<string, any>;
  retweeted?: boolean;
  place?: string;
  user?: Record<string, any>;
  favorited?: boolean;
  in_reply_to_user_id?: string;
  id: number;
}

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent extends BaseDataTableComponent<Tweet> {
  displayedColumns: string[] = ['text', 'source', 'in_reply_to_screen_name', 'created_at'];
  selectedRow: Tweet;
  tweetForm: FormGroup;
  modalConfig: ModalConfig;
  formFields: FormField[] = [];

  constructor(
    farmService: AddFarmService,
    private fb: FormBuilder
  ) {
    super(farmService);
    this.initializeForm();
    this.initializeFormFields();
    this.initializeModalConfig();
  }

  private initializeForm(): void {
    this.tweetForm = this.fb.group({
      text: ['']
    });
  }

  private initializeFormFields(): void {
    this.formFields = [
      {
        name: 'text',
        label: 'Tweet Text',
        type: 'textarea',
        placeholder: 'Enter tweet text',
        columnSize: 'full',
        rows: 4,
        disabled: true
      }
    ];
  }

  private initializeModalConfig(): void {
    this.modalConfig = {
      title: 'Tweet Details',
      submitButtonText: 'Close',
      cancelButtonText: 'Cancel',
      size: 'lg'
    };
  }

  loadData(): void {
    this.farmService
      .getTweets()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const data = this.extractPostsData(response);
        this.setTableData(data);
      });
  }

  onRowClick(row: Tweet): void {
    this.selectedRow = row;
    this.tweetForm.patchValue({ text: row.text });
  }

  resetForm(): void {
    this.tweetForm.reset();
    this.selectedRow = null;
  }
}