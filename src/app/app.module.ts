import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AccueilComponent } from './content/accueil/accueil.component';
import { LeftSideComponent } from './layout/left-side/left-side.component';
import { PostsComponent } from './content/posts/posts.component';
import { PostshowComponent } from './content/postshow/postshow.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    LeftSideComponent,
    PostsComponent,
    PostshowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
