import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  constructor(private api: ApiService,private route:Router) { }
  allRecipes: any = []//to hold all recipes
  cuisineArray: any = []//to hold cuisine
  mealTypeArray: any = [] //single array with duplicated items
  newMealsArray:any=[] // items  without duplication
  dummyArray:any=[]
  searchKey:string="" //to hold search value 
  p: number = 1;
  ngOnInit(): void {
    this.getAllRecipes()
  }
  getAllRecipes() {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      console.log(res);
      this.allRecipes = res
      this.dummyArray=this.allRecipes
      this.allRecipes.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      });
      console.log(this.cuisineArray);

      //meals array
      const meals=this.allRecipes.map((item: any) =>item.mealType)
      console.log(meals);//nested array
      
      console.log(meals.flat(Infinity));//single array

      this.mealTypeArray=meals.flat(Infinity)
      console.log(this.mealTypeArray);//single array
      
      
     this.mealTypeArray.forEach((item:any)=>{
        !this.newMealsArray.includes(item) && this.newMealsArray.push(item)
      })
console.log(this.newMealsArray);
    })
  }

  filterAllRecipes(key:string,value:string){
    //key:cuisine,value:italian
   this.allRecipes=this.dummyArray.filter((item:any)=>item[key].includes(value))

  }

  viewRecipe(recipeId:any){
      //api calling
      if(sessionStorage.getItem("token")){
        //navigate to view recipe page
        this.route.navigateByUrl(`view-recipe/${recipeId}`)
      }
      else{
        alert("You dont have the right to access the page")
      }
  }
}
