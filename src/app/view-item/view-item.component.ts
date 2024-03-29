import { Component } from '@angular/core';
import { PortalServiceService } from '../portal.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { review } from '../reviews';

@Component({
  selector: 'app-view-item',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbRatingModule, MatIconModule],
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.css'
})
export class ViewItemComponent {

  showreviewform = false;
  showreplyform = false;
  rating = 0;
  review = "";
  reply = "";

  reviews : review [] = [];

  newreply = {
    "fk_username" : localStorage.getItem('user'),
    "reply":this.reply,
    "fk_itemid": 0,
    "fk_reviewid":0
  }

  newreview = {
    "fk_userid": localStorage.getItem('userid'),
    "fk_itemid": 0,
    "fk_username": localStorage.getItem("user"),
    "rating": 0,
    "review": ""
  }

  item = {
    "averageRating": 0,
    "creationtime": "",
    "image": "",
    "itemcategory": "",
    "itemdescription": "",
    "itemid": "",
    "itemname": "",
    "userid": "",
    "totalReviews":0
  }

  constructor(
    private service: PortalServiceService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.item = this.service.getSelectedItem();
    this.renderReviews(this.item.itemid);
  }

  renderReviews(itemid : any){
    this.service.getReviewsById(itemid).subscribe(res => {
      // console.log(res);
      this.reviews = res;
    })
  }

  openReviewForm() {
    this.showreviewform = true;
  }

  addReview() {
    if (this.review == "" || this.rating == 0) {
      alert(`Enter Review First......`)
      return;
    } else {
      this.newreview = {
        "fk_userid": localStorage.getItem('userid'),
        "fk_itemid": Number(this.item.itemid),
        "fk_username": localStorage.getItem('user'),
        "rating": this.rating,
        "review": this.review
      }

      this.service.addReview(this.newreview).subscribe(res => {
        if (res == 1) {
          this.renderReviews(this.item.itemid);
          alert(`Review Added Successfully`)
          this.showreviewform = false;
          this.router.navigate(['viewitem']);
        }else if(res==2){
          alert(`You have already reviewed this item`);
          this.showreviewform=false;
          this.router.navigate(['viewitem'])
        }else{
          alert( `Error in adding the review. please try again latter` );
          this.router.navigate(['viewitem']);
        }
      })
    }

  }

  openReplyform(selectedreview:any){
    this.showreplyform = true;
    this.newreply = {
      "fk_username" :localStorage.getItem('user'),
      "reply":this.reply,
      "fk_itemid": selectedreview.fk_itemid,
      "fk_reviewid":selectedreview.reviewid
    }
  }

  addReply(){
    this.newreply.reply = this.reply;
    console.log(this.newreply);
    this.service.addReply(this.newreply).subscribe(res => {
      if(res==true){
        this.renderReviews(this.item.itemid);
        alert(`Your reply has been added successfully.`);
        this.showreplyform = false;
        this.router.navigate(['viewitem']);
      }else{
        alert(`Reply Not Added........Please Try after some time`)
      }
    })
  }

  back() {
    this.location.back();
  }

  backfromReviewForm(){
    this.showreviewform = false;
  }
}
