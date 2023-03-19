import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddFeed, AddWaterMedicine, AddCheckNets, ShrimpCondition, WaterReport, WaterCondition } from './cultivation-stage.model';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CultivationStageService {

  private posts: AddFeed[] = [];
  private postsUpdated = new Subject<AddFeed[]>();

  private postsWaterMedicine: AddWaterMedicine[] = [];
  private postsCheckNet: AddCheckNets[] = [];
  private postsShrimpConditon: ShrimpCondition[] = [];
  private postsWaterCondition: WaterCondition[] = [];
  private postsWaterReport: WaterReport[] = [];


  // private postsWaterMedicineUpdated = new Subject<AddWaterMedicine[]>();

  constructor(private http:HttpClient) { }

   //post Feeds
   postAddFeeds(farmOwner:string,
     feedName:string, 
    tankId: string,
    quantity: number, 
    medicines: Array<any>,
    unit:string,
    frequencyDetails:object) {
    const post: AddFeed = {
      id: null,
      farmOwner:farmOwner,
      feedName: feedName ,
      tankId: tankId,
      quantity: quantity,
      medicines: medicines,
      unit:unit,
      frequencyDetails:frequencyDetails
    };
    this.http.
      post<{ message: string, postId: string ,farmId: string }>(
        environment.baseUrl + '/i/cultivation/feed',
         post).subscribe(res => {
        const id = res.postId;
                post.id = id;
                this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  //post water medicine
  postAddWaterMedicine(farmOwner:string,
   tankId: string,
   medicines:  Array<any>,
   frequencyDetails:object) {
   const post: AddWaterMedicine = {
     id: null,
     farmOwner:farmOwner,
     tankId: tankId,
     medicines: medicines,
     frequencyDetails:frequencyDetails
   };
   this.http.
     post<{ message: string, postId: string ,farmId: string }>(
       environment.baseUrl + '/i/cultivation/watermedicine',
        post).subscribe(res => {
       const id = res.postId;
               post.id = id;
               this.postsWaterMedicine.push(post);
      //  this.postsUpdated.next([...this.posts]);
     });
 }
 //add checknet
   postAddCheckNet(farmOwner:string,tankId: string,feedName: string,leftCheckNet:object) {
    const post: AddCheckNets = {id: null,farmOwner:farmOwner,tankId: tankId,feedName:feedName,leftCheckNet:leftCheckNet
    };
    this.http.
      post<{ message: string, postId: string ,farmId: string }>(
        environment.baseUrl + '/i/cultivation/checknet',
         post).subscribe(res => {
        const id = res.postId;
                post.id = id;
                this.postsCheckNet.push(post);
       //  this.postsUpdated.next([...this.posts]);
      });
  }
  //addshrimp condtioin
  postAddShrimpCondition(farmOwner:string,tankId: string,serverity: string,file:File) {
    const post: ShrimpCondition = {id: null,farmOwner:farmOwner,tankId: tankId,serverity:serverity,file:file
    };
    this.http.
      post<{ message: string, postId: string ,farmId: string }>(
        environment.baseUrl + '/i/cultivation/shrimpcondition',
         post).subscribe(res => {
        const id = res.postId;
                post.id = id;
                this.postsShrimpConditon.push(post);
       //  this.postsUpdated.next([...this.posts]);
      });
  }
  //addWatercondtioin
  postAddWaterCondition(farmOwner:string,tankId: string,serverity: string,file:File) {
    const post: WaterCondition = {id: null,farmOwner:farmOwner,tankId: tankId,serverity:serverity,file:file
    };
    this.http.
      post<{ message: string, postId: string ,farmId: string }>(
        environment.baseUrl + '/i/cultivation/watercondition',
         post).subscribe(res => {
        const id = res.postId;
                post.id = id;
                this.postsWaterCondition.push(post);
       //  this.postsUpdated.next([...this.posts]);
      });
  }
  
  //add water report
  postAddWaterReport(farmOwner:string,tankId: string,waterPhReport: object,waterTributeReport:object,waterDoReport:object) {
    const post: WaterReport = {id: null,farmOwner:farmOwner,tankId: tankId,waterPhReport:waterPhReport,
      waterTributeReport:waterTributeReport,waterDoReport:waterDoReport
    };
    this.http.
      post<{ message: string, postId: string ,farmId: string }>(
        environment.baseUrl + '/i/cultivation/waterreport',
         post).subscribe(res => {
        const id = res.postId;
                post.id = id;
                this.postsWaterReport.push(post);
       //  this.postsUpdated.next([...this.posts]);
      });
  }

}
