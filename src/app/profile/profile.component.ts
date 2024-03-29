import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PortalServiceService } from '../portal.service';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule,FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  @ViewChild('profilePicture') profilePicture!: ElementRef;

  userid = localStorage.getItem("userid");
  username : string | null = "";
  useremail : string | null = "";
  numberofreviews = 0;
  numberofitems = 0;

  constructor(
    private router : Router,
    private service : PortalServiceService,
    private location : Location,
  ){}


  ngAfterViewInit() {
    const divHeight = this.profilePicture.nativeElement.clientHeight;
    const fontSize = divHeight * 0.8; // Adjust this value as needed
    this.profilePicture.nativeElement.style.fontSize = fontSize + 'px';
  }

  ngOnInit() {
    this.username = localStorage.getItem('user');
    this.useremail = localStorage.getItem('useremail');
    this.userid = localStorage.getItem("userid");
    this.getNumberOfReviews();
  }

  getNumberOfReviews(){
    this.service.getNumberOfReviewsByUser(this.service.loggedInUserid).subscribe(res => {
      this.numberofreviews = res;
      // console.log(this.numberofreviews);
    })

    this.service.getNumberOfItemsByUser(this.service.loggedInUserid).subscribe(res => {
      this.numberofitems = res;
      // console.log(this.numberofitems)
    })
  }

  viewItemHistory(){
    this.router.navigate(['itemhistory']);
  }

  viewReviewHistory(){
    this.router.navigate(['reviewhistory']);
  }

  logout(){
    localStorage.setItem( "user", `null`);
    localStorage.setItem("userid",`null`);
    localStorage.setItem("useremail",`null`);

    this.service.sendClickEvent();
    this.router.navigate(['']);
  }

  goBack(){
    this.location.back();
  }

}
