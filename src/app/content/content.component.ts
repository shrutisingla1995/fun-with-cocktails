import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  cocktails;
  loading = false;
  constructor(
    private service : AppService,

  ) { }

  ngOnInit(): void {
    this.getCocktails();
  }

  getCocktails(){
    this.loading = true;
    this.service.getRandomCocktails().subscribe(data =>{
      if(data){
        this.cocktails = data['drinks'];
      }
    });
    this.loading = false;
  }

  updateCocktails(data){
    this.loading = true;
    this.cocktails = data;
    this.loading = false;
  }

}
