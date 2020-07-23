import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'
import { OffreEmploi } from '../offres/Model/OffreEmploi';






@Injectable({
    providedIn: 'root'
})
export class OffreEmploiService {

    private idOffre;

    constructor(private http: HttpClient, private router: Router) { }

    getIdOffre() {
        return this.idOffre;
    }

    setIdOffre(idOffre) {
        this.idOffre = idOffre;
    }
    deleteOffre(id: String) {

        return this.http.get("http://localhost:8000/deleteOffre/" + id, { responseType: 'json' });
    }
    modifOffre(obj: any, id: String) {
        return this.http.put("http://localhost:8000/updateOffre/" + id, obj, { responseType: 'json' });
    }

    addNewOffre(obj: any): Observable<any> {

        return this.http.post("http://localhost:8000/newOffre", obj, { responseType: 'json' });
    }

    getListDomaines(): Observable<any> {
        return this.http.get("http://localhost:8000/listeDomaines", { responseType: 'json' });
    }


    getListOffreEmploi(): Observable<any> {
        return this.http.get("http://localhost:8000/listeOffres", { responseType: 'json' });
    }

    getListOffreEmploiByIdRecruteur(id): Observable<any> {
        id = 1;
        return this.http.get("http://localhost:8000/getOffresByIdRecruteur/" + id, { responseType: 'json' });
    }

    getOffreById(id: string) {

        return this.http.get("http://localhost:8000/getOffreById/" + id, { responseType: 'json' });
    }

    getListCandidature(): Observable<any> {
        return this.http.get("http://localhost:8000/ShowAllCv", { responseType: 'json' });
    }

}
