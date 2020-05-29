import { Component, OnInit, ViewChild } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Subscription } from 'rxjs';
import { AddFarm } from 'app/services/addFarm.model';


@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.scss']
})
export class AddFarmComponent implements OnInit {
  // newFarmData={};
  posts: AddFarm[] = [];
  // @ViewChild('closebutton') closebutton;
  private postsSub: Subscription;
  isLoading = false;

  constructor(private AddFarmService: AddFarmService) { }

  postFarm(form: NgForm){
    if(form.invalid){
      console.log(form);
      return;
    }
    this.AddFarmService.postFarm(form.value.farmOwner,form.value.farmHistory,form.value.village,
      form.value.mandal,form.value.city,form.value.state,
      form.value.zip,form.value.country,form.value.noOfTanks,form.value.noOfEmployess);
      // jQuery("#addFarm").modal("hide");
      // this.closebutton.nativeElement.click();
  }
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

  // resetFarm(){
  //   this.newFarmData={};
  // }
  ngOnInit() {
    this.isLoading = false;

    this.AddFarmService.getFarm();
    this.postsSub = this.AddFarmService.getPostUpdateListener()
    .subscribe((posts: AddFarm[]) => {
      this.isLoading = false;

      this.posts = posts;
    });
  }

}
