import { OnInit, OnDestroy, ViewChild, Directive } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';

/**
 * Base class for data table components to reduce code duplication
 */
@Directive()
export abstract class BaseDataTableComponent<T> implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  abstract displayedColumns: string[];
  dataSource = new MatTableDataSource<T>();
  protected destroy$ = new Subject<void>();

  constructor(protected farmService: AddFarmService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Abstract method to load data - must be implemented by child components
   */
  abstract loadData(): void;

  /**
   * Generic method to fetch and set paginated data
   */
  protected setTableData(data: T[]): void {
    if (Array.isArray(data)) {
      this.dataSource = new MatTableDataSource<T>(data);
      this.dataSource.paginator = this.paginator;
    }
  }

  /**
   * Helper method to extract posts from API response
   */
  protected extractPostsData(response: any): T[] {
    return response?.posts || response || [];
  }
}
