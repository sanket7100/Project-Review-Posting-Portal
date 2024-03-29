import { Component} from '@angular/core';
import { reviewhistory } from '../reviewshistory';
import { PortalServiceService } from '../portal.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-review-history',
  standalone: true,
  imports: [NgbRatingModule,CommonModule,FormsModule,MatIconModule],
  templateUrl: './review-history.component.html',
  styleUrl: './review-history.component.css'
})
export class ReviewHistoryComponent {

  reviewsbyuser : reviewhistory[] = [];

  constructor(
    private service : PortalServiceService,
    private location : Location
  ){}

  ngOnInit(){
    this.getUserReviews();
  }

  getUserReviews(){
    this.service.getReviewHistory(this.service.loggedInUserid).subscribe(res => {
      this.reviewsbyuser = res;
    })
  }

  back(){
    this.location.back();
  }

}
