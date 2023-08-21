import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private AddFarmService: AddFarmService) { }
  accountsData: any = {};
  // @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['account_id', 'limit','products','products1'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.getAccounts()
  }

  getAccounts() {
    this.AddFarmService.getAccounts().subscribe((res: any) => {
      this.accountsData = res.posts;
      this.dataSource =this.accountsData;
      this.setPagination(this.dataSource);
      console.log(res)

    })
  }
  setPagination(data) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }
}
