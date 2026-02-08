import { Component } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { takeUntil } from 'rxjs/operators';

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
export class AccountsComponent extends BaseDataTableComponent<Account> {
  displayedColumns: string[] = ['account_id', 'limit', 'products', 'products1'];

  constructor(farmService: AddFarmService) {
    super(farmService);
  }

  loadData(): void {
    this.farmService
      .getAccounts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const data = this.extractPostsData(response);
        this.setTableData(data);
      });
  }
}
