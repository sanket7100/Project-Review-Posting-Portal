import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortalServiceService } from '../portal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = "";
  password = "";

  constructor(
    private router: Router,
    private service: PortalServiceService,
  ) { }

  gotoSingup() {
    this.router.navigate([`signup`]);
  }

  login() {
    let data = {
      "email": this.email,
      "password": this.password
    }

    this.service.login(data).subscribe(res => {
      if (res == 1) {
        alert(`Logged In Successfully.....`);
        this.service.getUser(this.email).subscribe(res2 => {
          localStorage.setItem(`user`, res2.username);
          localStorage.setItem(`userid`, res2.userid);
          localStorage.setItem(`useremail`,res2.useremail);
          this.service.loggedInUserid = localStorage.getItem(`userid`);
          this.service.loggedInUseremail = localStorage.getItem("useremail");
          this.service.loggedInusername = localStorage.getItem('user');
          this.router.navigate([`/items`]);
        })
      } else if (res == 2) {
        alert(`please Enter valid Username and Password!!!!!!`)
      }else{
        alert(`User does not exist........Please Signup first`);
        this.router.navigate(['signup']);
      }
    })

  }

}
