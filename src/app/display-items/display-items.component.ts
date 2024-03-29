import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { item } from '../item';
import { PortalServiceService } from '../portal.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-items',
  standalone: true,
  imports: [NgbRatingModule, FormsModule, CommonModule],
  templateUrl: './display-items.component.html',
  styleUrl: './display-items.component.css'
})
export class DisplayItemsComponent {

  hoveredIndex: number | null = null;
  items: item[] = [];
  show = true;
  id : string | null = null;

  sortItemsSubscription:Subscription;

  constructor(
    private service: PortalServiceService,
    private router : Router
  ) {
    this.sortItemsSubscription = service.getClickedCategory().subscribe((value) => {
      this.sortItems(value);
    })
   }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.service.getAllItems().subscribe(data => {
      this.items = data;
      if(this.items.length >= 1) {
        this.show = false;
      }else{
        this.show = true;
      }
      // console.log(this.items);
    })
  }

  sortItems(category : string){
    if(category == 'all'){
      this.getItems();
    }else if(category=='book' || category=='movie' || category=='place'){
      this.service.getItemsByCategory(category).subscribe(data => {
        this.items = data;
        if(this.items.length >= 1) {
          this.show = false;
        }else{
          this.show = true;
        }
      })
    }else{
      this.service.getItemsByName(category).subscribe(data => {
        this.items = data;
        if(this.items.length >= 1) {
          this.show = false;
        }else{
          this.show = true;
        }
      })
    }
  }

    // "averageRating":"", 
    // "creationtime": "",
    // "image": "",
    // "itemcategory": "",
    // "itemdescription": "",
    // "itemid": "",
    // "itemname": "",
    // "userid": ""

  selectedItem(item : any){
    // localStorage.setItem('averageRating', item.averageRating);
    // localStorage.setItem('creationtime', item.creationtime);
    // localStorage.setItem('image', item.image);
    // localStorage.setItem('itemcategory', item.itemcategory);
    // localStorage.setItem('itemdescription', item.itemdescription);
    // localStorage.setItem('itemid', item.itemid);
    // localStorage.setItem('itemname', item.itemname);
    this.service.setSelectedItem(item);
    this.router.navigate(['viewitem']);
  }


}
