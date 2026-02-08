import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableColumn, TableConfig, TableActionEvent } from 'app/common/component/reusable-table/reusable-table.component';

interface Inspection {
  business_name: string;
  certificate_number: string;
  result: string;
  sector: string;
  date: string;
}

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.scss']
})
export class InspectionsComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn[] = [
    { key: 'business_name', label: 'Business Name', width: '200px' },
    { key: 'certificate_number', label: 'Certificate Number', width: '150px' },
    { key: 'result', label: 'Result', width: '100px' },
    { key: 'sector', label: 'Sector', width: '150px' },
    { key: 'date', label: 'Date', width: '150px', type: 'date', format: 'dd/MM/yyyy' }
  ];

  tableConfig: TableConfig = {
    title: 'Inspections',
    showFilter: true,
    showActions: false,
    pageSizeOptions: [10, 20, 30],
    pageSize: 10
  };

  tableData: Inspection[] = [];
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
      .getInspections()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          const data = response?.posts || response || [];
          this.tableData = data;
        },
        (error) => {
          console.error('Failed to load inspections data', error);
          this.toast.error('Failed to load inspections data');
        }
      );
  }

  onTableAction(event: TableActionEvent): void {
    // No actions for inspections table currently
  }
}
