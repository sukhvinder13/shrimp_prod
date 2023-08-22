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
  displayedColumns: String[] = ['text', 'source', 'in_reply_to_screen_name', 'created_at'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private AddFarmService: AddFarmService) { }
  tweetData: any;
  ngOnInit() {
    this.getTweets()
  }

  getTweets() {
    this.AddFarmService.getTweets().subscribe((data: any) => {
      this.dataSource = data.posts;
      console.log(data)
      this.setPagination(this.dataSource)
    })
  }
  setPagination(data) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }
}
export interface TweetsModel{
  text:String,
  in_reply_to_status_id: String ,
  created_at: Date ,
  geo: String ,
  source: String ,
  coordinates: String ,
  truncated: Boolean ,
  in_reply_to_screen_name: String ,
  entities: Object ,
  retweeted: Boolean ,
  place: String ,
  user: Object ,
  favorited: Boolean ,
  in_reply_to_user_id: String ,
  id: Number 
}