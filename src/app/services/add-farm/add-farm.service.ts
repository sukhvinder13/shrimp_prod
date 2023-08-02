import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { AddFarm } from './addFarm.model';
import { Subject } from 'rxjs'
// import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getFarm() {
    return this.http.get(environment.baseUrl + '/readFarm');
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  postFarm(farmOwner: object, farmHistory: string, village: string,
    mandal: string, city: string, state: string, zip: number,
    country: string, noOfTanks: number, noOfEmployess: number,
    tankCode: string, tankArea: Array<any>) {
    const post: AddFarm = {
      id: null, farmOwner: farmOwner, farmHistory: farmHistory,
      village: village, mandal: mandal, city: city, state: state, zip: zip,
      country: country, noOfTanks: noOfTanks, noOfEmployess: noOfEmployess,
      tankCode: tankCode, tankArea: tankArea
    };
    // return
    this.http.
      post<{ message: string, postId: string }>(
        environment.baseUrl + '/addFarm',

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
  getCustoemrs() {
    return this.http.get(environment.baseUrl + '/getCustomers');
  }
  getTweets() {
    return this.http.get(environment.baseUrl + '/getTweets');
  }
  getInspections() {
    return this.http.get(environment.baseUrl + '/getInspections');
  }
  getSales(){
    return this.http.get(environment.baseUrl + '/getSales');
  } 
  getAccounts(){
    return this.http.get(environment.baseUrl + '/getAccounts');
  }
  getTransactions(){
    return this.http.get(environment.baseUrl + '/getTransactions');
  }
   httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  saveCustomer(data){
    return this.http.post(environment.baseUrl + '/saveCustomers',data,this.httpOptions);
  }
  deleteCustomer(data){
    return this.http.post(environment.baseUrl + '/deleteCustomer',data,this.httpOptions);
  }
  updateCustomer(data){
    return this.http.post(environment.baseUrl + '/updateCustomer',data,this.httpOptions);
  }
}