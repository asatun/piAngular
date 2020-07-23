


interface modelCandidature {

  id: number,
  titre: String,
  id_domaine: String,
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
  templateUrl: './listCandidature.component.html',
  styleUrls: ['./listCandidature.component.css']
})
export class ListCandidatureComponent implements OnInit {

  private listDomainefromServer: modelDomaine[];
  private listCandidaturefromServer: modelCandidature[];
  constructor(private router: Router, private offreEmploiService: OffreEmploiService, private modalService: NgbModal) { }

  page = 1;
  pageSize = 5;
  collectionSize;
  alert: Boolean = false;
  nomEtPrenom = "";
  idDomaine;
  fullListe = [];

  ngOnInit() {
    this.getListDomaines();
    this.getListCandidature();


    this.alert = false;
    this.idDomaine = "";




  }


  getListCandidature() {
    this.offreEmploiService.getListCandidature().subscribe((data) => {
      this.listCandidaturefromServer = data;
      console.log(this.listCandidaturefromServer);
      this.fullListe = [];
      Object.assign(this.fullListe, this.listCandidaturefromServer);
      this.collectionSize = this.listCandidaturefromServer.length;
      // if you got a problem of async
      this.getDomaineName();
      console.log("list candidatures   **********" + this.listCandidaturefromServer)
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


  chercher() {
    console.log(this.nomEtPrenom + "************" + this.idDomaine);

    if (this.nomEtPrenom === "") {
      this.nomEtPrenom = null;
    }

    if (this.nomEtPrenom != null && this.idDomaine != "") {
      this.listCandidaturefromServer = this.fullListe.filter((cv: modelCandidature) => { return cv.titre == this.nomEtPrenom && cv.id_domaine == this.idDomaine })
    } else if (this.nomEtPrenom == null && this.idDomaine == "") {
      this.listCandidaturefromServer = this.fullListe;
    } else {
      this.listCandidaturefromServer = this.fullListe.filter((cv) => { return cv.titre == this.nomEtPrenom || cv.id_domaine == this.idDomaine })

    }


  }

  getDomaineName() {

    this.listCandidaturefromServer.forEach(elm => {
      elm.nom_domaine = this.getDomaineNamef(elm.id_domaine);

    });
    Object.assign(this.fullListe, this.listCandidaturefromServer);
  }
  consulterCv(id) {

    alert("consulter le cv N° : " + id);
  }

}

