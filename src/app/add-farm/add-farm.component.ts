import { Component, OnInit} from '@angular/core';
import { AddFarmService } from 'app/services/add-farm.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Subscription } from 'rxjs';
import { AddFarm } from 'app/services/addFarm.model';
import { AddFarmOwnerService } from 'app/services/add-farm-owner.service';
import { AddFarmOwner } from 'app/services/addFarmOwner.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.scss']
})
export class AddFarmComponent implements OnInit {
  // newFarmData={};
  posts: AddFarm[] = [];
  postsOwner: AddFarmOwner[] = [];
  // @ViewChild('closebutton') closebutton;
  private postsSub: Subscription;
  private postsSubOwner: Subscription;
  isLoading = false;
  constructor(private AddFarmService: AddFarmService , private addFarmOwnerService : AddFarmOwnerService ,
    private router:Router) { }

  postFarm(form: NgForm){
    if(form.invalid){
      console.log(form);
      return;
    }
    this.AddFarmService.postFarm(form.value.farmOwner,form.value.farmHistory,form.value.village,
      form.value.mandal,form.value.city,form.value.state,
      form.value.zip,form.value.country,form.value.noOfTanks,form.value.noOfEmployess);
      alert("Farm Saved Sucessfully");
      form.reset();
      document.getElementById('addFarm').click();

      // window.location.reload();
  }
//delete query
  onDelete(postId: string) {
  let x:boolean=confirm("Are You Sure ? Do you wan to delete ");
  console.log(x);
    if(x==true){
      this.AddFarmService.deleteFarm(postId);
      console.log(postId)
    }else{
      return
    }
  }
  ngOnInit() {
    this.isLoading = false;

    this.AddFarmService.getFarm();
    this.addFarmOwnerService.getFarmOwner();
    this.postsSub = this.AddFarmService.getPostUpdateListener()
    .subscribe((posts: AddFarm[]) => {
      this.isLoading = false;

      this.posts = posts;
    });
    this.postsSubOwner = this.addFarmOwnerService.getPostUpdateListener()
    .subscribe((posts: AddFarmOwner[]) => {
      this.isLoading = false;
      this.postsOwner = posts;
    });
  }

}
