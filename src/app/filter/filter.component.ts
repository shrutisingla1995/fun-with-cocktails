import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() cocktailsData = new EventEmitter();
  categories = [];
  ingredients = [];
  cocktailSetOne : any;
  cocktailSetTwo : any;
  filterForm: FormGroup;
  constructor(
    private service : AppService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
   this.getCategories();
   this.getIngredients();
   this.filterForm = this.fb.group({
      selectedCategory: [[],''],
      selectedIngredients: [[],'']
    });
  }
  getCategories(){
    this.service.getCategories().subscribe(data =>{
      if(data){
        this.categories = data?.['drinks'];
      }
    })
  }

  getIngredients(){
    this.service.getIngredients().subscribe(data =>{
      if(data){
        this.ingredients = data?.['drinks'];
      }
    })
  }

  filter(){
    let form = this.filterForm.value;
    let categoryArr = [];
    let ingredientArr = [];
    if(form?.selectedCategory){
      for (let i = 0; i < form?.selectedCategory.length; i++) {
          let cat = form?.selectedCategory[i].replace(/[^a-zA-Z0-9]/g, '_');
          categoryArr.push(cat);
      }
      let key = categoryArr.join();
      this.service.filterCategory(key).subscribe(data =>{
        if(data){
          this.cocktailSetOne = data['drinks'];
          this.cocktailsData.emit(this.cocktailSetOne);
        }
      })
    }
    if(form?.selectedIngredients){
      for (let i = 0; i < form?.selectedIngredients.length; i++) {
        let ing = form?.selectedIngredients[i].replace(/[^a-zA-Z0-9]/g, '_');
        ingredientArr.push(ing);
      }
      let key = ingredientArr.join();
      this.service.filterIngredients(key).subscribe(data =>{
        if(data){
          this.cocktailSetTwo = [...this.cocktailSetOne,data?.['drinks']];
          this.cocktailsData.emit(this.cocktailSetTwo);
        }
      })
    }
  }
}
