import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableColumn, TableConfig, TableActionEvent } from 'app/common/component/reusable-table/reusable-table.component';

interface Account {
  account_id: string;
  limit: number;
  products: string;
  products1: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn[] = [
    { key: 'account_id', label: 'Account ID', width: '150px' },
    { key: 'limit', label: 'Certificate Number', width: '150px' },
    { key: 'products', label: 'Product 1', width: 'auto' },
    { key: 'products1', label: 'Product 2', width: 'auto' }
  ];

  tableConfig: TableConfig = {
    title: 'Accounts',
    showFilter: true,
    showActions: false,
    pageSizeOptions: [10, 20, 30],
    pageSize: 10
  };

  tableData: Account[] = [];
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
      .getAccounts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          const data = response?.posts || response || [];
          this.tableData = data;
        },
        (error) => {
          console.error('Failed to load accounts data', error);
          this.toast.error('Failed to load accounts data');
        }
      );
  }

  onTableAction(event: TableActionEvent): void {
    // No actions for accounts table currently
  }
}
