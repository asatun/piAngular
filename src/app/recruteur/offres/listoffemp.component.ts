

interface model {

  num: number,
  titre: String,
  domaine: String,
  date: Date,
  etat: String

}
interface modelOffre {

  id: number,
  titre_offre: String,
  id_domaine: String,
  date_fin: Date,
  valider: String,
  nom_domaine: String,
}

interface modelDomaine {
  id: String,
  nom_domaine: String,
}

import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { OffreEmploiService } from '../services/offreEmploiService';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listoffemp',
  templateUrl: './listoffemp.component.html',
  styleUrls: ['./listoffemp.component.css']
})
export class ListoffempComponent implements OnInit {

  private listOffre: model[];
  private listOffrefromServer: modelOffre[];
  private listDomainefromServer: modelDomaine[];
  constructor(private router: Router, private offreEmploiService: OffreEmploiService, private modalService: NgbModal) { }

  page = 1;
  pageSize = 5;
  collectionSize;
  alert: Boolean = false;
  ref;
  idDomaine;
  fullListe = [];

  ngOnInit() {
    this.getListDomaines();
    this.getListOffreEmploi();


    this.alert = false;
    this.ref = null;
    this.idDomaine = "";




  }


  getListOffreEmploi() {
    this.offreEmploiService.getListOffreEmploiByIdRecruteur(1).subscribe((data) => {
      this.listOffrefromServer = data;
      console.log(this.listOffrefromServer);
      this.fullListe = [];
      Object.assign(this.fullListe, this.listOffrefromServer);
      this.collectionSize = this.listOffrefromServer.length;

      this.getDomaineName();

    }, (err) => {
      console.log("erreur from server")
    });

  }



  getDomaineNamef(num) {

    const result = this.listDomainefromServer.filter(word => { return word.id == num });
    return result[0].nom_domaine;

  }

  getListDomaines() {

    this.offreEmploiService.getListDomaines().subscribe((data) => {
      this.listDomainefromServer = data;
    }, (err) => {
      console.log("erreur from server")
    });

  }

  ajouter() {
    this.router.navigate(['recruteur/mesOffres/form'])
  }

  edit(id) {
    //this.offreEmploiService.getOffreById(id).subscribe((data) => {

    // })
    this.offreEmploiService.setIdOffre(id);
    this.router.navigate(['recruteur/mesOffres/form', { mode: 'edit' }])

  }

  delete(id) {

    const result = confirm(" voulez-vous Confirmer la Suppression de l'offre N°: " + id + " ?");
    if (result == true) {

      this.offreEmploiService.deleteOffre(id).subscribe((data) => {

      });
      this.alert = true;
      this.getListOffreEmploi();

    }

  }

  chercher() {
    console.log(this.ref + "************" + this.idDomaine);

    if (this.ref != null && this.idDomaine != "") {
      this.listOffrefromServer = this.fullListe.filter((offre) => { return offre.id == this.ref && offre.id_domaine == this.idDomaine })
    } else if (this.ref == null && this.idDomaine == "") {
      this.listOffrefromServer = this.fullListe;
    } else {
      this.listOffrefromServer = this.fullListe.filter((offre) => { return offre.id == this.ref || offre.id_domaine == this.idDomaine })

    }


  }

  getDomaineName() {

    this.listOffrefromServer.forEach(elm => {
      elm.nom_domaine = this.getDomaineNamef(elm.id_domaine);

    });
    Object.assign(this.fullListe, this.listOffrefromServer);

  }

}

