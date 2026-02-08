import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { takeUntil } from 'rxjs/operators';

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
export class TransactionsComponent extends BaseDataTableComponent<Transaction> {
  displayedColumns: string[] = ['account_id', 'transaction_count', 'bucket_start_date', 'bucket_end_date'];

  constructor(farmService: AddFarmService) {
    super(farmService);
  }

  loadData(): void {
    this.farmService
      .getTransactions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        const data = response?.Transactions || [];
        this.setTableData(data);
      });
  }
}
