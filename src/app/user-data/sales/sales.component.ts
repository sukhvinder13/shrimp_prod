import { Component } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { takeUntil } from 'rxjs/operators';

interface Sale {
  couponUsed: string;
  email: string;
  gender: string;
  storeLocation: string;
  purchaseMethod: string;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent extends BaseDataTableComponent<Sale> {
  displayedColumns: string[] = ['couponUsed', 'email', 'gender', 'storeLocation', 'purchaseMethod'];

  constructor(farmService: AddFarmService) {
    super(farmService);
  }

  loadData(): void {
    this.farmService
      .getSales()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const data = this.extractPostsData(response);
        this.setTableData(data);
      });
  }
}
