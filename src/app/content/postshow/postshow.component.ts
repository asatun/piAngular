

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { OffreEmploiService } from '../../../../src/app/recruteur/services/offreEmploiService';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { OffreEmploi } from 'src/app/recruteur/offres/Model/OffreEmploi';



function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}


export interface modelDomaine {
  id: number,
  nom_domaine: String,
}

@Component({
  selector: 'app-postshow',
  templateUrl: './postshow.component.html',
  styleUrls: ['./postshow.component.css']
})
export class PostshowComponent implements OnInit {
  offreEmploiForm: FormGroup;
  titreForm = "Ajouter Offre d'emploi";
  alert: boolean;
  idOffre;
  imageModif;
  minDate = formatDate(new Date());
  private listDomainefromServer: modelDomaine[];
  constructor(private offreEmploiService: OffreEmploiService, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { }
  public OffreObject: OffreEmploi;
  ngOnInit() {
    /*  this.imageModif = null;
     this.getListDomaines();
     let offre;
     this.alert = false; */

    // this.offreEmploiForm = new FormGroup({
    //   titre_offre: new FormControl(),
    //   objet: new FormControl(),
    //   des_offre: new FormControl(),
    //   date_fin: new FormControl(),
    //   id_domaine: new FormControl(),
    // });
    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      console.log("id**************" + this.route.snapshot.paramMap.get('id'))
      this.getOffreById(id);

    }
  }

  getOffreById(id: any) {
    this.offreEmploiService.getOffreById(id).subscribe((data: OffreEmploi) => {
      this.OffreObject = data;
      console.log("*************" + this.OffreObject['des_offre']);


    });
  }

  getListDomaines() {
    this.offreEmploiService.getListDomaines().subscribe((data) => {
      this.listDomainefromServer = data;
    }, (err) => {
      console.log("erreur from server")
    });

  }

  onFileSelect(event) {

  }

  valider() {


  }

  navigateAfterSuccess() {
    this.router.navigate(['recruteur/mesOffres/']);
  }


}
