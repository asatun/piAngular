
interface modelOffre {

  id: number,
  titre_offre: String,
  id_domaine: String,
  date_fin: Date,
  valider: String,
  nom_domaine: String,
  id_recruteur: number;
}

interface modelDomaine {
  id: String,
  nom_domaine: String,
}


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

import { Component, OnInit } from '@angular/core';
import { OffreEmploiService } from '../services/offreEmploiService';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private offreEmploiService: OffreEmploiService) {


  }

  allOffresLength;
  barChartData: ChartDataSets[] = [];
  nbrMesOffres: number = 0;
  domaine: String[] = [];
  listDomaine: modelDomaine[] = [];
  uniqueItems: String[] = []
  numberDomaine: number[] = []

  ngOnInit() {
    this.getListDomaineName();
    this.getListDomaines();
    this.getListOffres();



  }
  setDomaineName() {
    // let nomDomaineArray: String[];
    //this.listDomaine.forEach((numDomaine) => {
    //const result = this.getDomaineNamef(numDomaine);
    //nomDomaineArray.push(result);
    //})
    //console.log(nomDomaineArray);
  }

  getListDomaineName() {

    this.offreEmploiService.getListDomaines().subscribe((data) => {
      this.listDomaine = data;
      console.log("listDomaine ************************************" + this.listDomaine);

    }, (err) => {
      console.log("erreur from server")
    });

  }

  getDomaineNamef(num) {
    const result = this.listDomaine.filter(word => { return word.id == num });
    return result[0].nom_domaine;

  }

  getListDomaines() {
    this.offreEmploiService.getListOffreEmploiByIdRecruteur(1).subscribe((data) => {

      const listOffre: modelOffre[] = data;
      console.log(listOffre)
      listOffre.forEach((elm) => { this.domaine.push(this.getDomaineNamef(elm.id_domaine)); })

      console.log(this.domaine);
      this.domaine = Object.assign([], Array.from(new Set(this.domaine)))
      console.log("filtred domaine ****" + this.domaine)
      let nb: number = 0;
      let felm: any = "";
      felm = this.domaine[0];
      ;
      this.domaine.forEach((elm) => {

        this.numberDomaine.push(1);


      })
      // Object.assign(this.domaine, this.uniqueItems);
      // console.log("######################" + this.domaine)



      // listDomaine = listDomaine.filter(onlyUnique);
      // listDomaine.forEach((elm) => { this.domaine.push(elm.nom_domaine) });


      // uniqueItems.forEach((data) => {
      //  const countOccurrences = (this.domaine, data) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

      // })





    }, (err) => {
      console.log("erreur from server")
    });

    //this.getListDomaineName();

  }

  getListOffres() {
    this.offreEmploiService.getListOffreEmploi().subscribe((data) => {
      const length = Object.keys(data).length;
      const listOffre: modelOffre[] = data;
      listOffre.filter(off => { if (off.id_recruteur === 1) { this.nbrMesOffres += 1; } });



      this.allOffresLength = length;
      this.doBarChart();

    }, (err) => {
      console.log("erreur from server")
    });
  }
  filtredDomaine(): String[] {

    return Array.from(new Set(this.domaine));
  }


  //bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [''];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;




  doBarChart() {
    this.barChartData = [
      { data: [parseInt(this.allOffresLength)], label: 'tous les  Offres' },
      { data: [this.nbrMesOffres, 0], label: 'mes Offres' }
    ];
  }


  //pie chart
  // Pie

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: String[] = this.domaine;
  public pieChartData: number[] = this.numberDomaine;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
}




