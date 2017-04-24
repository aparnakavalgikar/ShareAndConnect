import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home-page/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ItemDescComponent } from './components/item-desc/item-desc.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { ShareModalComponent } from './components/share-modal/share-modal.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

const appRoutes: Routes = [
  {path:'', component:LandingComponent},
  {path:'signup', component:SignupComponent},
  {path:'home', component:HomeComponent},
  {path:'profile', component:ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignupComponent,
    HomeComponent,
    ProfileComponent,
    ItemDescComponent,
    PostItemComponent,
    ProfileComponent,
    ShareModalComponent,
    WishListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
