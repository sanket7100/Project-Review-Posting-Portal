import { CUSTOM_ELEMENTS_SCHEMA ,Component } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-logout-home',
  standalone: true,
  imports: [],
  templateUrl: './logout-home.component.html',
  styleUrl: './logout-home.component.css'
})
export class LogoutHomeComponent {

}
