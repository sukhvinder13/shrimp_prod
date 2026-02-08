import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface ModalConfig {
  title: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  size?: 'sm' | 'lg' | 'xl';
}

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'tel' | 'url' | 'time' | 'datetime-local';

export interface FormFieldOption {
  label: string;
  value: any;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  columnSize?: 'full' | 'half' | 'third'; // for responsive layout
  rows?: number; // for textarea
  options?: FormFieldOption[]; // for select, radio, checkbox
  validation?: any; // additional validation
  helpText?: string;
  pattern?: string; // regex pattern for validation
  min?: number | string;
  max?: number | string;
  step?: number;
}

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  @Input() modalId: string = 'modal';
  @Input() config: ModalConfig;
  @Input() form: FormGroup;
  @Input() fields: FormField[] = []; // Dynamic form fields configuration
  @Output() submitted = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  ngOnInit(): void {
    if (!this.config) {
      this.config = {
        title: 'Modal',
        submitButtonText: 'Save',
        cancelButtonText: 'Cancel',
        size: 'lg'
      };
    }
  }

  onSubmit(): void {
    if (this.form?.valid) {
      this.submitted.emit();
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  getModalSizeClass(): string {
    const sizeMap = {
      'sm': 'modal-sm',
      'lg': 'modal-lg',
      'xl': 'modal-xl'
    };
    return sizeMap[this.config?.size] || 'modal-lg';
  }

  getColumnClass(field: FormField): string {
    const sizeMap = {
      'full': 'col-md-12',
      'half': 'col-md-6',
      'third': 'col-md-4'
    };
    return sizeMap[field.columnSize] || 'col-md-6';
  }

  getFieldError(fieldName: string): string {
    const control = this.form?.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (control.errors['email']) {
      return 'Valid email is required';
    }
    if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength}`;
    }
    if (control.errors['maxlength']) {
      return `Maximum length is ${control.errors['maxlength'].requiredLength}`;
    }
    if (control.errors['pattern']) {
      return 'Invalid format';
    }
    if (control.errors['min']) {
      return `Minimum value is ${control.errors['min'].min}`;
    }
    if (control.errors['max']) {
      return `Maximum value is ${control.errors['max'].max}`;
    }

    return 'Invalid field';
  }

  hasError(fieldName: string): boolean {
    const control = this.form?.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }
}
