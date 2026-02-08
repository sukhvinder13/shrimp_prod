import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import { BaseDataTableComponent } from 'app/common/component/base-data-table.component';
import { takeUntil } from 'rxjs/operators';

export interface Tweet {
  text: string;
  in_reply_to_status_id?: string;
  created_at: Date;
  geo?: string;
  source: string;
  coordinates?: string;
  truncated?: boolean;
  in_reply_to_screen_name: string;
  entities?: Record<string, any>;
  retweeted?: boolean;
  place?: string;
  user?: Record<string, any>;
  favorited?: boolean;
  in_reply_to_user_id?: string;
  id: number;
}

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent extends BaseDataTableComponent<Tweet> {
  displayedColumns: string[] = ['text', 'source', 'in_reply_to_screen_name', 'created_at'];
  selectedRow: Tweet;
  closeResult: string;

  constructor(farmService: AddFarmService, private modalService: NgbModal) {
    super(farmService);
  }

  loadData(): void {
    this.farmService
      .getTweets()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const data = this.extractPostsData(response);
        this.setTableData(data);
      });
  }

  onRowClick(row: Tweet, modal: any): void {
    this.selectedRow = row;
    this.openModal(modal);
  }

  private openModal(content: any): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        () => {
          this.closeResult = 'Closed with success';
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    return `with: ${reason}`;
  }
}