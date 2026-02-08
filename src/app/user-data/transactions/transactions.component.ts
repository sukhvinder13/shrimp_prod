import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableColumn, TableConfig, TableActionEvent } from 'app/common/component/reusable-table/reusable-table.component';

interface Transaction {
  account_id: string;
  transaction_count: number;
  bucket_start_date: string;
  bucket_end_date: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn[] = [
    { key: 'account_id', label: 'Account ID', width: '150px' },
    { key: 'transaction_count', label: 'Transaction Count', width: '150px' },
    { key: 'bucket_start_date', label: 'Start Date', width: '150px', type: 'date', format: 'dd/MM/yyyy' },
    { key: 'bucket_end_date', label: 'End Date', width: '150px', type: 'date', format: 'dd/MM/yyyy' }
  ];

  tableConfig: TableConfig = {
    title: 'Transactions',
    showFilter: true,
    showActions: false,
    pageSizeOptions: [10, 20, 30],
    pageSize: 10
  };

  tableData: Transaction[] = [];
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
      .getTransactions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          const data = response?.Transactions || [];
          this.tableData = data;
        },
        (error) => {
          console.error('Failed to load transactions data', error);
          this.toast.error('Failed to load transactions data');
        }
      );
  }

  onTableAction(event: TableActionEvent): void {
    // No actions for transactions table currently
  }
}
