

interface modelOffre {

  id: number,
  titre_offre: String,
  id_domaine: String,
  date_fin: Date,
  valider: String,
}
import { Component, OnInit } from '@angular/core';
import { OffreEmploiService } from 'src/app/recruteur/services/offreEmploiService';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private listOffrefromServer: modelOffre[];
  constructor(private offreEmploiService: OffreEmploiService) { }

  ngOnInit() {
    this.getListOffre();
  }


  getListOffre() {

    this.offreEmploiService.getListOffreEmploi().subscribe((data) => {
      this.listOffrefromServer = data;

    }, (err) => {
      console.log("erreur from server")
    });

  }
}
