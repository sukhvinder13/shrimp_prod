import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers-data',
  templateUrl: './customers-data.component.html',
  styleUrls: ['./customers-data.component.scss']
})
export class CustomersDataComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['sr', 'email', 'name', 'birthdate', 'address', 'action'];
  dataSource = new MatTableDataSource<any>();
  
  customerForm: FormGroup;
  customerData: CustomerResponse;
  selectedRows: any;
  
  private destroy$ = new Subject<void>();

  constructor(
    private farmService: AddFarmService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {
    this.initializeForm();
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
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      username: [''],
      accounts: [''],
      tier_and_details: ['']
    });
  }

  private loadCustomers(): void {
    this.farmService.getCustoemrs()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: CustomerResponse) => this.handleCustomerData(data),
        (error) => this.handleError('Failed to load customers', error)
      );
  }

  private handleCustomerData(data: CustomerResponse): void {
    this.customerData = data;
    this.updateDataSource(data.posts);
  }

  private updateDataSource(data: any[]): void {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }

  saveCustomer(): void {
    if (this.customerForm.invalid) return;

    const formData = this.prepareFormData();
    const operation$ = formData.id
      ? this.farmService.updateCustomer(formData)
      : this.farmService.saveCustomer(formData);

    operation$.pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => this.handleSaveSuccess(response, formData.id),
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
      this.refreshCustomersList();
      this.resetForm();
    } else {
      this.toast.warning('Operation failed');
    }
  }

  private refreshCustomersList(): void {
    this.loadCustomers();
  }

  private resetForm(): void {
    this.customerForm.reset();
    this.selectedRows = null;
  }

  deleteRow(element: any): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.farmService.deleteCustomer({ id: element._id })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => this.handleDeleteSuccess(element),
        (error) => this.handleError('Failed to delete customer', error)
      );
  }

  private handleDeleteSuccess(element: any): void {
    this.toast.success('Deleted Successfully');
    const index = this.customerData.posts.indexOf(element);
    if (index > -1) {
      this.customerData.posts.splice(index, 1);
      this.updateDataSource(this.customerData.posts);
    }
  }

  editRow(element: any): void {
    this.selectedRows = element;
    const formattedBirthdate = this.formatDateForInput(element.birthdate);
    
    this.customerForm.patchValue({
      id: element._id,
      email: element.email || '',
      name: element.name || '',
      address: element.address || '',
      birthdate: formattedBirthdate || '',
      username: element.username || '',
      accounts: element.accounts || '',
      tier_and_details: element.tier_and_details || ''
    });
  }

  private formatDateForInput(date: any): string {
    if (!date) return '';
    return this.datePipe.transform(new Date(date), 'yyyy-MM-dd') || '';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(row: any): void {
    this.selectedRows = row;
  }

  openDetailsModal(row: any, modal: any): void {
    this.selectedRows = { ...row };
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  closeModal(): void {
    this.modalService.dismissAll();
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
