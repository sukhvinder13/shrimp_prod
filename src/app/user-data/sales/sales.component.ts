import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableColumn, TableConfig, TableActionEvent } from 'app/common/component/reusable-table/reusable-table.component';

interface Sale {
  couponUsed: string;
  customer?: { email: string; gender: string };
  storeLocation: string;
  purchaseMethod: string;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn[] = [
    { key: 'couponUsed', label: 'Coupon Used', width: 'auto' },
    { key: 'email', label: 'Email', width: '200px' },
    { key: 'gender', label: 'Gender', width: '120px' },
    { key: 'storeLocation', label: 'Store Location', width: '150px' },
    { key: 'purchaseMethod', label: 'Purchase Method', width: '150px' }
  ];

  tableConfig: TableConfig = {
    title: 'Sales Data',
    showFilter: true,
    showActions: false,
    pageSizeOptions: [10, 20, 30],
    pageSize: 10
  };

  tableData: Sale[] = [];
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
      .getSales()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          const data = response?.posts || response || [];
          this.tableData = data.map((item: any) => ({
            couponUsed: item.couponUsed,
            email: item.customer?.email,
            gender: item.customer?.gender,
            storeLocation: item.storeLocation,
            purchaseMethod: item.purchaseMethod
          }));
        },
        (error) => {
          console.error('Failed to load sales data', error);
          this.toast.error('Failed to load sales data');
        }
      );
  }

  onTableAction(event: TableActionEvent): void {
    // No actions for sales table currently
  }
}
