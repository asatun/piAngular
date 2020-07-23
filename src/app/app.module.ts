import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AccueilComponent } from './content/accueil/accueil.component';
import { LeftSideComponent } from './layout/left-side/left-side.component';
import { PostsComponent } from './content/posts/posts.component';
import { PostshowComponent } from './content/postshow/postshow.component';
import { MenuComponent } from './recruteur/leftside/menu.component';
import { ContentComponent } from './recruteur/ecran/content.component';
import { DashboardComponent } from './recruteur/dashboard/dashboard.component';
import { AcceuilComponent } from './recruteur/Acceuil/acceuil.component';
import { ListoffempComponent } from './recruteur/offres/listoffemp.component';
import { OffreFormComponent } from './recruteur/offres/form/offre-form/offre-form.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCandidatureComponent } from './recruteur/candidature/listCandidature.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    LeftSideComponent,
    PostsComponent,
    PostshowComponent,
    MenuComponent,
    ContentComponent,
    DashboardComponent,
    AcceuilComponent,
    ListoffempComponent,
    OffreFormComponent,
    ListCandidatureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
