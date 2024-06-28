import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cocktail } from '../models/cocktail';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private apiUrl = '/cockails';
  constructor(private http: HttpClient) {}
  getCocktailDetail(id: string){
    return this.http.get<Cocktail>(`${this.apiUrl}/${id}`);
  }
  getCocktails(){
    return this.http.get<Cocktail[]>(this.apiUrl)  
  }

}

