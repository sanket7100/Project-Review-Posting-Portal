import { Component } from '@angular/core';
import { PortalServiceService } from '../portal.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  fk_userid = "";
  itemname = "";
  itemcategory = "Select a category";
  itemdescription = "";

  constructor(
    private service : PortalServiceService,
    private router : Router
  ) {}

  addItem() {
    let data = {
      "fk_userid": localStorage.getItem(`userid`),
      "itemname": this.itemname,
      "itemcategory": this.itemcategory,
      "itemdescription": this.itemdescription
    }

    if(data.itemcategory=='Select a category'){
      alert("Please Select Category");
      return;
    }else if(data.itemname == "" || data.itemdescription == ""){
      alert("Please fill all fields");
      return;
    }

    this.service.getAllItems().subscribe(items =>{
      console.log(`inside additems`);
      // items.map((item : any) => {
      //   if(item.itemname == data.itemname && item.itemcategory == data.itemcategory){
      //     return  alert('This Item already exists');
      //   }
      // })

      this.service.addItem(data).subscribe(data =>{
        if(data){
          alert(`item added successfully`);
          this.router.navigate(['/items']);
        }
      })


    })

    

  }
    
}
