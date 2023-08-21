import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  displayedColumns:String[]=['email', 'storeLocation', 'purchaseMethod', 'saleDate'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private AddFarmService: AddFarmService) { }
  tweetData:any;
  ngOnInit() {
    this.getTweets()
  }

  getTweets(){
    this.AddFarmService.getTweets().subscribe((data :any)=>{
      this.dataSource=data.posts;
      console.log(data)
      this.setPagination(this.dataSource)
   })
  }
setPagination(data) {
 this.dataSource = new MatTableDataSource<any>(data);
 this.dataSource.paginator = this.paginator;
}
}
