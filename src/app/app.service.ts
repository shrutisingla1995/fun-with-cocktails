import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
    baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

    constructor(
        private http: HttpClient
    ) {}

    getCategories(){
        const url = `${this.baseUrl}list.php?c=list`;
        return this.http.get(url).pipe(map(
            data => {
                return data;
            }
        ));
    }
    getIngredients(){
        const url = `${this.baseUrl}list.php?i=list`;
        return this.http.get(url).pipe(map(
            data => {
                return data;
            }
        ));
    }
    filterCategory(cat){
        const url = `${this.baseUrl}/filter.php?c=${cat}`;
        return this.http.get(url).pipe(map(
            data => {
                return data;
            }
        ));
    }
    filterIngredients(cat){
        const url = `${this.baseUrl}/filter.php?i=${cat}`;
        return this.http.get(url).pipe(map(
            data => {
                return data;
            }
        ));
    }
    getRandomCocktails(){
        const url = `${this.baseUrl}/random.php`;
        return this.http.get(url).pipe(map(
            data => {
                return data;
            }
        ));
    }

}
