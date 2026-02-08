import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableColumn, TableConfig, TableActionEvent } from 'app/common/component/reusable-table/reusable-table.component';

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
export class TweetsComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn[] = [
    { key: 'text', label: 'Tweet Text', width: 'auto' },
    { key: 'source', label: 'Source', width: '150px' },
    { key: 'in_reply_to_screen_name', label: 'Reply To', width: '150px' },
    { key: 'created_at', label: 'Created Date', width: '150px', type: 'date', format: 'dd/MM/yyyy' }
  ];

  tableConfig: TableConfig = {
    title: 'Tweets',
    showFilter: true,
    showActions: false,
    pageSizeOptions: [10, 20, 30],
    pageSize: 10
  };

  tableData: Tweet[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private farmService: AddFarmService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.farmService
      .getTweets()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          const data = response?.posts || response || [];
          this.tableData = data;
        },
        (error) => {
          console.error('Failed to load tweets', error);
          this.toast.error('Failed to load tweets');
        }
      );
  }

  onTableAction(event: TableActionEvent): void {
    // No actions for tweets table currently
  }
}