import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  constructor(
    private location : Location,
  ){}

  back(){
    this.location.back();
  }

}
