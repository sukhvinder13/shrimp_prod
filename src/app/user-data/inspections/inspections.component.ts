import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { takeUntil } from 'rxjs/operators';

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
export class InspectionsComponent extends BaseDataTableComponent<Inspection> {
  displayedColumns: string[] = ['business_name', 'certificate_number', 'result', 'sector', 'date'];

  constructor(farmService: AddFarmService) {
    super(farmService);
  }

  loadData(): void {
    this.farmService
      .getInspections()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const data = this.extractPostsData(response);
        this.setTableData(data);
      });
  }
}
