import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{

      searchKey:any=""

    recipeList:any=[]

      constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getRecipes()
  }

      getRecipes(){
        this.api.getAllRecipeAPI().subscribe((res:any)=>{
          console.log(res);
          this.recipeList=res
        })
      }
      deleteRecipe(recipeId:any){
        this.api.deleteAPI(recipeId).subscribe((res:any)=>{
          console.log(res);
          this.getRecipes()
        })
      }
}
