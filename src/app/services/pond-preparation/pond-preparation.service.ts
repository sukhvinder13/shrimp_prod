import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AddMedicine, AddWaterReport, AddPicture } from './pond-preparation.model';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PondPreparationService {
  private posts: AddMedicine[] = [];
  private posts1 : AddWaterReport[]=[];
  private addPicture : AddPicture[]=[];

  private posts2: AddPicture[]=[]
  private postsUpdated = new Subject<AddMedicine[]>();
  constructor(private http:HttpClient) { }

  //post medicine
  postAddMedicine(farmOwner:string, 
    selectMedicine: string, 
    selectTank: string,
     dosage: number,) {
    const post: AddMedicine = {
      id: null,
      farmOwner: farmOwner ,
       selectMedicine: selectMedicine,
        selectTank: selectTank,
      dosage: dosage
    };
    this.http.
      post<{ message: string, postId: string ,farmId: string }>(
        environment.baseUrl + '/addFarmMedicine',
         post).subscribe(res => {
        const id = res.postId;
                post.id = id;
                this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  //post Water Report
  postAddWaterReport(farmOwner:string, 
    selectTank: string,
    selectTime: string, 
    selectPH: number,) {
    const post: AddWaterReport = {
      id: null,
      farmOwner: farmOwner ,
     selectTank: selectTank,
      selectTime: selectTime,
      selectPH: selectPH
    };
    this.http.
      post<{ message: string, postId: string ,farmId: string }>(
        environment.baseUrl + '/addFarmWaterReport',
         post).subscribe(res => {
        const id = res.postId;
                post.id = id;
                this.posts1.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
//add picture
//post Water Report
postAddPicture(farmOwner:string,selectTank: string,addFile: File) {
  const post: AddPicture = {
    id: null,
    farmOwner: farmOwner ,
   selectTank: selectTank,
   addFile: addFile
  };
  this.http.
    post<{ message: string, postId: string ,farmId: string }>(
      environment.baseUrl + '/addPicture',
       post).subscribe(res => {
      const id = res.postId;
              post.id = id;
              this.addPicture.push(post);
      this.postsUpdated.next([...this.posts]);
    });
}

}
