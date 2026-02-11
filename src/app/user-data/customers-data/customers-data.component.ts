import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, FormField } from 'app/common/component/form-modal/form-modal.component';
import { TableColumn, TableConfig, TableActionEvent } from 'app/common/component/reusable-table/reusable-table.component';

@Component({
  selector: 'app-customers-data',
  templateUrl: './customers-data.component.html',
  styleUrls: ['./customers-data.component.scss']
})
export class CustomersDataComponent implements OnInit, OnDestroy {
  @ViewChild('detailsModal', { static: false }) detailsModal: TemplateRef<any>;
  tableColumns: TableColumn[] = [
    { key: 'email', label: 'Email', width: '150px' },
    { key: 'name', label: 'Name', width: 'auto' },
    { key: 'birthdate', label: 'Birthdate', width: '150px', type: 'date', format: 'dd/MM/yyyy' },
    { key: 'address', label: 'Address', width: 'auto' }
  ];

  tableConfig: TableConfig = {
    title: 'Customers Management',
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

  tableData: Customer[] = [];
  
  customerForm: FormGroup;
  selectedRows: any;
  modalConfig: ModalConfig;
  formFields: FormField[] = [];

  private destroy$ = new Subject<void>();
  private customerData: CustomerResponse;

  constructor(
    private farmService: AddFarmService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {
    this.initializeForm();
    this.initializeFormFields();
    this.initializeModalConfig();
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.customerForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      username: [''],
      accounts: [''],
      tier_and_details: ['']
    });
  }

  private initializeFormFields(): void {
    this.formFields = [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter Name',
        required: true,
        columnSize: 'half'
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter Email',
        required: true,
        columnSize: 'half'
      },
      {
        name: 'birthdate',
        label: 'Birthdate',
        type: 'date',
        required: true,
        columnSize: 'half'
      },
      {
        name: 'address',
        label: 'Address',
        type: 'textarea',
        placeholder: 'Enter Address',
        required: true,
        columnSize: 'full',
        rows: 3
      },
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter Username (Optional)',
        columnSize: 'half'
      }
    ];
  }

  private initializeModalConfig(): void {
    this.modalConfig = {
      title: 'Add New Customer',
      submitButtonText: 'Save',
      cancelButtonText: 'Cancel',
      size: 'lg'
    };
  }

  private loadCustomers(): void {
    this.farmService
      .getCustoemrs()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: CustomerResponse) => this.handleCustomerData(data),
        (error) => this.handleError('Failed to load customers', error)
      );
  }

  private handleCustomerData(data: CustomerResponse): void {
    this.customerData = data;
    this.tableData = data.posts;
  }

  saveCustomer(): void {
    if (this.customerForm.invalid) return;

    const formData = this.prepareFormData();
    const operation$ = formData.id
      ? this.farmService.updateCustomer(formData)
      : this.farmService.saveCustomer(formData);

    operation$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => this.handleSaveSuccess(response, !!formData.id),
        (error) => this.handleError('Failed to save customer', error)
      );
  }

  private prepareFormData(): any {
    const formValue = this.customerForm.value;
    return {
      ...formValue,
      birthdate: new Date(formValue.birthdate),
      updatedBy: localStorage.getItem('userInfo')
    };
  }

  private handleSaveSuccess(response: any, isUpdate: boolean): void {
    if (response.success || response.result) {
      const message = isUpdate ? 'Updated Successfully' : 'Saved Successfully';
      this.toast.success(message);
      this.loadCustomers();
      this.resetForm();
    } else {
      this.toast.warning('Operation failed');
    }
  }

  deleteRow(element: Customer): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.farmService
      .deleteCustomer({ id: element._id })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.handleDeleteSuccess(element),
        (error) => this.handleError('Failed to delete customer', error)
      );
  }

  private handleDeleteSuccess(element: Customer): void {
    this.toast.success('Deleted Successfully');
    const index = this.customerData.posts.indexOf(element);
    if (index > -1) {
      this.customerData.posts.splice(index, 1);
      this.tableData = [...this.customerData.posts];
    }
  }

  editRow(element: Customer): void {
    this.selectedRows = element;
    this.updateModalTitle('Edit Customer');
    const formattedBirthdate = this.formatDateForInput(element.birthdate);

    // Reset form first to clear any previous values
    this.customerForm.reset({
      id: element._id,
      name: element.name || '',
      email: element.email || '',
      birthdate: formattedBirthdate || '',
      address: element.address || '',
      username: element.username || ''
    });

    // Mark as touched to show validation messages if needed
    this.customerForm.markAllAsTouched();
  }

  resetForm(): void {
    this.customerForm.reset();
    this.selectedRows = null;
    this.updateModalTitle('Add New Customer');
  }

  private updateModalTitle(title: string): void {
    this.modalConfig = { ...this.modalConfig, title };
  }

  private formatDateForInput(date: any): string {
    if (!date) return '';
    return this.datePipe.transform(new Date(date), 'yyyy-MM-dd') || '';
  }

  /**
   * Handle table actions - Opens modal with row data
   */
  onTableAction(event: TableActionEvent): void {
    switch (event.action) {
      case 'edit':
        this.editRow(event.data);
        // Use setTimeout to ensure Angular change detection completes before opening modal
        setTimeout(() => {
          const addBtn = document.querySelector('[data-target="#addCustomer"]') as HTMLElement;
          if (addBtn) {
            addBtn.click();
          }
        }, 0);
        break;
      case 'delete':
        this.deleteRow(event.data);
        break;
      case 'view':
        this.openDetailsModal(event.data);
        break;
      default:
        break;
    }
  }

  /**
   * Handle filter changes from table
   */
  onFilterChange(filterValue: string): void {
    // Filter logic can be implemented here if needed
    // The table component handles its own filtering
  }

  selectRow(row: Customer): void {
    this.selectedRows = row;
  }

  openDetailsModal(row: Customer): void {
    this.selectedRows = { ...row };
    this.modalService.open(this.detailsModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.toast.error(message);
  }
}

export interface CustomerResponse {
  type: any;
  posts: Customer[];
  result?: any;
}

export interface Customer {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  address: string;
  birthdate: Date;
  username?: string;
  accounts?: any[];
  tier_and_details?: any;
}
