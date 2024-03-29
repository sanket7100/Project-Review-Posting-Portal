import { Routes } from '@angular/router';
import { DisplayItemsComponent } from './display-items/display-items.component';
import { LogoutHomeComponent } from './logout-home/logout-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { ProfileComponent } from './profile/profile.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ReviewHistoryComponent } from './review-history/review-history.component';
import { ItemHistoryComponent } from './item-history/item-history.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    {
        path:"", component: HomeComponent, children: [
            {path:"", component: LogoutHomeComponent },
            {path:"items", component: DisplayItemsComponent},
            {path:"additem",component:AddItemComponent},
            {path:"profile", component:ProfileComponent},
            {path:"viewitem", component:ViewItemComponent},
            {path:"reviewhistory",component:ReviewHistoryComponent},
            {path:"itemhistory",component:ItemHistoryComponent},
            {path:"aboutus",component:AboutUsComponent}
        ]
    },
    {path:"login",component:LoginComponent},
    {path:"signup",component:SignupComponent}
    

];
