import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  type?: 'text' | 'date' | 'custom'; // type: custom requires custom template
  format?: string; // for date formatting
}

export interface TableConfig {
  title: string;
  showFilter?: boolean;
  showActions?: boolean;
  actionButtons?: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
    custom?: Array<{ label: string; icon: string; action: string }>;
  };
  pageSizeOptions?: number[];
  pageSize?: number;
}

export interface TableActionEvent {
  action: 'edit' | 'delete' | 'view' | string;
  data: any;
}

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() config: TableConfig = {
    title: 'Data Table',
    showFilter: true,
    showActions: true,
    actionButtons: {
      edit: true,
      delete: true,
      view: true
    },
    pageSizeOptions: [10, 20, 30],
    pageSize: 10
  };

  @Output() action = new EventEmitter<TableActionEvent>();
  @Output() filterChange = new EventEmitter<string>();

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  selectedRow: any = null;
  filterValue: string = '';

  ngOnInit(): void {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.updateTableData();
    }
    if (changes['columns'] && !changes['columns'].firstChange) {
      this.buildDisplayedColumns();
    }
  }

  /**
   * Initialize table configuration and columns
   */
  private initializeTable(): void {
    this.buildDisplayedColumns();
    this.updateTableData();
  }

  /**
   * Build the displayed columns array based on input columns and config
   */
  private buildDisplayedColumns(): void {
    this.displayedColumns = this.columns.map(col => col.key);

    // Add Sr No. column at the beginning
    this.displayedColumns.unshift('sr');

    // Add action column at the end if enabled
    if (this.config.showActions) {
      this.displayedColumns.push('action');
    }
  }

  /**
   * Update table data source
   */
  private updateTableData(): void {
    if (Array.isArray(this.data)) {
      this.dataSource = new MatTableDataSource<any>(this.data);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  /**
   * Get column configuration by key
   */
  getColumnConfig(key: string): TableColumn | undefined {
    return this.columns.find(col => col.key === key);
  }

  /**
   * Get display value for a cell
   */
  getCellValue(element: any, column: TableColumn): any {
    const value = element[column.key];

    if (column.type === 'date' && value) {
      return new Date(value);
    }

    return value;
  }

  /**
   * Apply filter to table data
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Emit filter change event
    this.filterChange.emit(filterValue);

    // Reset to first page
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  /**
   * Clear filter
   */
  clearFilter(): void {
    this.filterValue = '';
    this.dataSource.filter = '';
    this.filterChange.emit('');

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  /**
   * Select row
   */
  selectRow(row: any): void {
    this.selectedRow = row;
  }

  /**
   * Handle action buttons
   */
  handleAction(action: 'edit' | 'delete' | 'view' | string, data: any): void {
    this.action.emit({ action, data });
  }

  /**
   * Check if action button should be shown
   */
  isActionVisible(actionType: string): boolean {
    if (actionType === 'edit') {
      return this.config.actionButtons?.edit !== false;
    }
    if (actionType === 'delete') {
      return this.config.actionButtons?.delete !== false;
    }
    if (actionType === 'view') {
      return this.config.actionButtons?.view !== false;
    }
    return true;
  }

  /**
   * Filter function for mat-table
   */
  createFilter(): (data: any, filter: string) => boolean {
    return (data: any, filter: string): boolean => {
      const acc = JSON.stringify(data).toLowerCase();
      return acc.indexOf(filter) !== -1;
    };
  }
}
