import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DisplayItemsComponent } from '../display-items/display-items.component';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortalServiceService } from '../portal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,FormsModule,CommonModule,MatSelectModule,MatFormFieldModule,DisplayItemsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  dropdown = false;
  logged = false;
  itemname = "";

  isNavbarVisible: boolean = true;
  prevScrollPos: number = window.scrollY || document.documentElement.scrollTop;

  clickEventsubscription:Subscription;

  constructor(
    private router : Router,
    private service : PortalServiceService
  ){
    this.clickEventsubscription = this.service.getClickEvent().subscribe((value)=>{
      console.log(value+ " inside subscription");
      this.changeLogged();
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPos = window.scrollY || document.documentElement.scrollTop;
    this.isNavbarVisible = currentScrollPos <= this.prevScrollPos || currentScrollPos < 10;
    this.prevScrollPos = currentScrollPos;
  }

  ngOnInit(){
    // this.logged = localStorage.getItem("user") != 'null' ? true : false;
    // console.log(this.logged);
    this.changeLogged();
  }

  changeLogged(){
    this.logged = localStorage.getItem("user") != 'null' ? true : false;
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  loginpage(){
    this.router.navigate([`login`]);
  }

  profile(){
    this.router.navigate(['profile']);
  }

  addItem(){
    if(localStorage.getItem("user")==`null`){
      alert("You're Not Logged In");
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['additem']);
    }

  }

  gotoAllItems(){
    this.service.sendClickedCategory('all');
  }

  gotoBooks(){
    this.service.sendClickedCategory('book');
  }

  gotoMovies(){
    this.service.sendClickedCategory('movie');
  }

  gotoPlaces(){
    this.service.sendClickedCategory('place');
  }

  searchItems(){
    if(this.itemname==""){
      this.gotoAllItems();
    }else{
      this.service.sendClickedCategory(this.itemname);
    } 
  }

  gotohome(){
    if(localStorage.getItem(`user`)!="null"){
      this.router.navigate(['items']);
    }else{
      alert(`Please Login First`);
      this.router.navigate(['login']);
    }
  }

  gotoAboutUsPage(){
    this.router.navigate(["aboutus"]);
  }

}
