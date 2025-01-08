import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent implements OnInit{

  recipeId:string=""
  recipe:any={}

  constructor(private activatedRoute:ActivatedRoute,private api:ApiService){}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((res:any)=>{
        console.log(res);
        this.recipeId=res.id
        console.log(this.recipeId);
      })
      this.viewRecipe(this.recipeId)
  }

  viewRecipe(recipeId:any){
    this.api.viewRecipeAPI(recipeId).subscribe((res:any)=>{
      console.log(res);
      this.recipe=res
    })
  }



}
