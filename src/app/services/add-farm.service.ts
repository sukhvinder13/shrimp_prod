import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { AddFarm } from './addFarm.model';
import { Subject } from 'rxjs'
// import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AddFarmService {
  private posts: AddFarm[] = [];
  //AddFarm is array of posted farms
  private postsUpdated = new Subject<AddFarm[]>();


  Farms = [];
  constructor(private http: HttpClient) { }
  // getFarm() {
  //   this.http.get('http://localhost:3000/addFarm').subscribe(res => {
  //     this.Farms = res.json();
  //   });
  // }
  getFarm() {
    this.http
      .get<{ message: string; posts: any }>(
        environment.baseUrl + '/readFarm'
        // "http://localhost:3000/readFarm"
      )
      .pipe(map((postData) => {
        console.log(postData);
        // this.Farms=postData;
        // console.log(posts);

        return postData.posts.map(post => {
          return {
            farmOwner: post.farmOwner,
            farmHistory: post.farmHistory,
            village: post.village,
            mandal: post.mandal, 
            city: post.city,
            state: post.state, 
            zip: post.zip,
            country: post.country,
            noOfEmployess: post.noOfEmployess,
            noOfTanks: post.noOfTanks,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  postFarm(farmOwner: string, farmHistory: string, village: string,
    mandal: string, city: string, state: string, zip: number,
    country: string, noOfTanks: number, noOfEmployess: number) {
    const post: AddFarm = {
      id: null, farmOwner: farmOwner, farmHistory: farmHistory,
      village: village, mandal: mandal, city: city, state: state, zip: zip,
      country: country, noOfTanks: noOfTanks, noOfEmployess: noOfEmployess
    };

    this.http.
      post<{ message: string, postId: string }>(
        environment.baseUrl + '/addFarm',

        // 'http://localhost:3000/addFarm',
         post).subscribe(res => {
        // this.getFarm
        const id = res.postId;
                post.id = id;
                this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
                
      });
  }
  deleteFarm(postId: string) {
    this.http.delete(
      environment.baseUrl + '/deletefarm/' + postId)

      // "http://localhost:3000/deletefarm/" + postId)
      .subscribe(() => {
        
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}