import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from 'src/app/content/accueil/accueil.component'
import { PostsComponent } from 'src/app/content/posts/posts.component'
import { PostshowComponent } from 'src/app/content/postshow/postshow.component'



const routes: Routes = [
  {
    path: '',
    component: AccueilComponent,

    children: [
      { path: '', component: PostsComponent },
      { path: 'postShow', component: PostshowComponent }


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
