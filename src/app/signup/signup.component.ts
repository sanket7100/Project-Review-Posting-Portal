import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortalServiceService } from '../portal.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username = "";
  email = "";
  password = "";

  signup = true;
  userAdded = false;

  constructor(
    private router: Router,
    private service: PortalServiceService,
    private location: Location
  ) { }

  gotologin() {
    this.router.navigate([`login`]);
  }

  addUser() {
    let data = {
      "username": this.username,
      "email": this.email,
      "password": this.password
    };

    this.service.addUser(data).subscribe(res => {
      console.log(res);
      this.userAdded = res;
      this.signup = false;
      setTimeout(() => {
          this.userAdded = false;
          this.router.navigate(['']);
          this.signup = true;
      }, 1000);
    },
    error => {
      this.userAdded = false;
      this.signup = false;
      setTimeout(() => {
          this.userAdded = false;
          this.router.navigate(['']);
          this.signup = true;
      }, 1000);
    }
    )



  }

}
