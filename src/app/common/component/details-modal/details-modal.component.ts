import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface DetailField {
  label: string;
  value: any;
  type?: 'text' | 'date' | 'array' | 'table' | 'keyvalue'; // Type of field
  format?: string; // Format for date pipe
  columnSize?: 'full' | 'half'; // Column size for layout
}

export interface DetailSection {
  title?: string;
  fields: DetailField[];
  showAsTable?: boolean; // For table-like sections
}

export interface DetailsModalConfig {
  title: string;
  size?: 'sm' | 'lg' | 'xl';
  closeButtonText?: string;
}

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent implements OnInit {
  @Input() modalId: string = 'detailsModal';
  @Input() config: DetailsModalConfig;
  @Input() sections: DetailSection[] = [];
  @Input() data: any;
  @Output() closed = new EventEmitter<void>();

  ngOnInit(): void {
    if (!this.config) {
      this.config = {
        title: 'Details',
        size: 'lg',
        closeButtonText: 'Close'
      };
    }
  }

  onClose(): void {
    this.closed.emit();
  }

  getModalSizeClass(): string {
    const sizeMap = {
      'sm': 'modal-sm',
      'lg': 'modal-lg',
      'xl': 'modal-xl'
    };
    return sizeMap[this.config?.size] || 'modal-lg';
  }

  getColumnClass(field: DetailField): string {
    const sizeMap = {
      'full': 'col-md-12',
      'half': 'col-md-6'
    };
    return sizeMap[field.columnSize] || 'col-md-6';
  }

  getFieldValue(field: DetailField): any {
    if (!field.value) {
      return field.value === 0 ? 0 : 'N/A';
    }
    return field.value;
  }

  isArrayType(field: DetailField): boolean {
    return field.type === 'array' && Array.isArray(field.value);
  }

  isTableType(field: DetailField): boolean {
    return field.type === 'table' && Array.isArray(field.value);
  }

  isKeyValueType(field: DetailField): boolean {
    return field.type === 'keyvalue' && this.isObject(field.value);
  }

  isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }

  getKeyValuePairs(obj: any): Array<{ key: string; value: any }> {
    if (!this.isObject(obj)) return [];
    return Object.keys(obj).map(key => ({ key, value: obj[key] }));
  }

  hasData(): boolean {
    return this.data != null;
  }
}
