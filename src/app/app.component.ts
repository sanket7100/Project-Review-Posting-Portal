import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { DisplayItemsComponent } from './display-items/display-items.component';
import { HomeComponent } from './home/home.component';
import { LogoutHomeComponent } from './logout-home/logout-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,DisplayItemsComponent,HomeComponent,LogoutHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ReviewPostigPortal';
}
