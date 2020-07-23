import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { OffreEmploiService } from '../../../services/offreEmploiService';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { OffreEmploi } from '../../Model/OffreEmploi';


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
  selector: 'app-offre-form',
  templateUrl: './offre-form.component.html',
  styleUrls: ['./offre-form.component.css']
})
export class OffreFormComponent implements OnInit {
  offreEmploiForm: FormGroup;
  titreForm = "Ajouter Offre d'emploi";
  alert: boolean;
  idOffre;
  imageModif;
  minDate = formatDate(new Date());
  private listDomainefromServer: modelDomaine[];
  constructor(private offreEmploiService: OffreEmploiService, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { }
  private OffreObject: OffreEmploi;
  ngOnInit() {
    this.imageModif = null;
    this.getListDomaines();
    let offre;
    this.alert = false;

    // this.offreEmploiForm = new FormGroup({
    //   titre_offre: new FormControl(),
    //   objet: new FormControl(),
    //   des_offre: new FormControl(),
    //   date_fin: new FormControl(),
    //   id_domaine: new FormControl(),
    // });


    this.offreEmploiForm = this.formBuilder.group({
      titre_offre: ['', Validators.required],
      objet: ['', Validators.required],
      des_offre: [''],
      date_fin: [formatDate(new Date()), Validators.required],
      id_domaine: [this.listDomainefromServer, Validators.required],
      email: ['', Validators.required],
      image_offre: ['']
    })



    if (this.route.snapshot.paramMap.get('mode')) {
      if (this.route.snapshot.paramMap.get('mode') == "edit") {
        this.titreForm = "Modifier Offre d'emploi";
        this.idOffre = this.offreEmploiService.getIdOffre();
        this.offreEmploiService.getOffreById(this.idOffre).subscribe((data) => {
          offre = data;
          console.log(offre);
          this.imageModif = offre["image_offre"];
          this.offreEmploiForm.patchValue({
            titre_offre: offre["titre_offre"],
            objet: offre["objet"],
            des_offre: offre["des_offre"],
            date_fin: formatDate(offre["date_fin"]),
            id_domaine: offre["id_domaine"],
            email: offre["email"],
            image_offre: offre["image_offre"]

          })
        });

      } else {
        this.router.navigate(['recruteur/mesOffres/'])
      }

    } else {

    }



    // alert(this.route.snapshot.paramMap.get('offre'));
  }

  getListDomaines() {
    this.offreEmploiService.getListDomaines().subscribe((data) => {
      this.listDomainefromServer = data;
    }, (err) => {
      console.log("erreur from server")
    });

  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.offreEmploiForm.get('image_offre').setValue(file['name']);
      console.log(this.offreEmploiForm.get('image_offre').value);
    }
  }

  valider() {


    this.OffreObject = {
      titre_offre: this.offreEmploiForm.get('titre_offre').value
      , id_domaine: parseInt(this.offreEmploiForm.get('id_domaine').value),
      date_fin: "",
      des_offre: this.offreEmploiForm.get('des_offre').value,
      valider: 0, objet: this.offreEmploiForm.get('objet').value,
      date_postule: "",
      id_recruteur: 1, image_offre: this.offreEmploiForm.get('image_offre').value,
      email: this.offreEmploiForm.get('email').value

    };

    console.log(this.OffreObject);
    let datePostule = new Date().toISOString().slice(0, 10);
    let dateFin = this.offreEmploiForm.get('date_fin').value;
    let obj = {
      "email": this.offreEmploiForm.get('email').value,
      "titre_offre": this.offreEmploiForm.get('titre_offre').value,
      "id_domaine": this.offreEmploiForm.get('id_domaine').value,
      "date_fin": dateFin + 'T00:00:00+02:00',
      "des_offre": this.offreEmploiForm.get('des_offre').value,
      "objet": this.offreEmploiForm.get('objet').value,
      "valider": 0,
      "id_recruteur": 1,
      "image_offre": this.offreEmploiForm.get('image_offre').value,
      "date_postule": datePostule + 'T00:00:00+02:00'


    }
    if (this.route.snapshot.paramMap.get('mode') == "edit") {
      let objModif = {
        "email": this.offreEmploiForm.get('email').value,
        "titre_offre": this.offreEmploiForm.get('titre_offre').value,
        "id_domaine": this.offreEmploiForm.get('id_domaine').value,
        "date_fin": dateFin + 'T00:00:00+02:00',
        "des_offre": this.offreEmploiForm.get('des_offre').value,
        "objet": this.offreEmploiForm.get('objet').value,
        "valider": 0,
        "id_recruteur": 1,
        "image_offre": this.offreEmploiForm.get('image_offre').value,



      }
      this.offreEmploiService.modifOffre(objModif, this.idOffre).subscribe(() => {

      }, () => {
        this.alert = true;
        setTimeout(() => { this.navigateAfterSuccess(); }, 2000);
      });
    } else {
      console.log(obj)
      this.offreEmploiService.addNewOffre(obj).subscribe(() => {

      }, () => {
        this.alert = true;
        setTimeout(() => { this.navigateAfterSuccess(); }, 2000);
      });
    }


  }

  navigateAfterSuccess() {
    this.router.navigate(['recruteur/mesOffres/']);
  }


}
