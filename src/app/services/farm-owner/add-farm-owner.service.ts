import { Injectable } from '@angular/core';
import {AddFarmOwner } from './addFarmOwner.model'
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AddFarmOwnerService {
  private posts: AddFarmOwner[] = [];
  private postsUpdated = new Subject<AddFarmOwner[]>();

  constructor( private http : HttpClient) { }
  //get farm owner
  // get all Lesson
  getFarmOwner() {
    return this.http.get(environment.baseUrl + '/readFarmOwner');
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  //post farm owner
  postFarmOwner(firstName: string, lastName: string, mobile: number,
    // address: string, referral: string, pan: string, adhaar: number,
    // panFile:string,adhaarFile: string, companyName: string, companyPan: number,
    // companyAdhaar:number,companyGstNo:string,companyPanFile:string,
    // companyAdhaarFile:string
    ) {
    const post: AddFarmOwner = {
      id: null, firstName: firstName, lastName: lastName,
      mobile: mobile, 
      // address: address, referral: referral, pan: pan, adhaar: adhaar,
      // panFile: panFile, adhaarFile: adhaarFile, companyName: companyName,
      // companyPan: companyPan, companyAdhaar: companyAdhaar, companyGstNo: companyGstNo,
      // companyPanFile: companyPanFile, companyAdhaarFile: companyAdhaarFile,


    };

    this.http.
      post<{ message: string, postId: string }>(
        environment.baseUrl + '/addfarmowner',

        // 'http://localhost:3000/addFarm',
         post).subscribe(res => {
        // this.getFarm
        const id = res.postId;
                post.id = id;
                this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);
                
      });
  }
}
