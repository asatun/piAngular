import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from 'src/app/content/accueil/accueil.component'
import { PostsComponent } from 'src/app/content/posts/posts.component'
import { PostshowComponent } from 'src/app/content/postshow/postshow.component'
import { ContentComponent } from 'src/app/recruteur/ecran/content.component'
import { DashboardComponent } from 'src/app/recruteur/dashboard/dashboard.component'
import { AcceuilComponent } from 'src/app/recruteur/Acceuil/acceuil.component'
import { ListoffempComponent } from 'src/app/recruteur/offres/listoffemp.component'
import { OffreFormComponent } from 'src/app/recruteur/offres/form/offre-form/offre-form.component'
import { ListCandidatureComponent } from 'src/app/recruteur/candidature/listCandidature.component'



const routes: Routes = [
  {
    path: '',
    component: AccueilComponent,

    children: [
      { path: '', component: PostsComponent },
      { path: 'postShow/:id', component: PostshowComponent }


    ]
  },
  {
    path: 'recruteur',
    component: ContentComponent,

    children: [
      { path: '', component: AcceuilComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'mesOffres', component: ListoffempComponent },
      { path: 'mesOffres/form', component: OffreFormComponent },
      { path: 'candidatures', component: ListCandidatureComponent }



    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
