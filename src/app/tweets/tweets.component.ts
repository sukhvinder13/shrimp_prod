import { Component, OnInit } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  constructor(private AddFarmService: AddFarmService) { }
  tweetData:any;
  ngOnInit() {
    this.getTweets()
  }

  getTweets(){
    this.AddFarmService.getTweets().subscribe((data =>{
      this.tweetData=data;
      console.log(data)
   }))
  }
}
