import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { item } from '../item';
import { PortalServiceService } from '../portal.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-history',
  standalone: true,
  imports: [FormsModule,CommonModule,NgbRatingModule],
  templateUrl: './item-history.component.html',
  styleUrl: './item-history.component.css'
})
export class ItemHistoryComponent {

  items : item[] = [];
  constructor(
    private service : PortalServiceService,
    private location : Location,
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    this.service.getUserCreatedItems(this.service.loggedInUserid).subscribe(res => {
      this.items = res;
      console.log(this.items);
    })
  }

  back(){
    this.location.back();
  }

}
