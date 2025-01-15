import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent implements OnInit{

  recipeId:string=""
  recipe:any={}
  relatedRecipe:any=[]
  constructor(private activatedRoute:ActivatedRoute,private api:ApiService){}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((res:any)=>{
        console.log(res);
        this.recipeId=res.id
        console.log(this.recipeId);
      })
      this.viewRecipe(this.recipeId)
      // this.downloadRecipe()
      // this.recipe = { name: 'Sample Recipe', image: 'sample-image-url', cuisine: 'Sample Cuisine' };
  }

  viewRecipe(recipeId:any){
    this.api.viewRecipeAPI(recipeId).subscribe((res:any)=>{
      console.log(res);
      this.recipe=res
      console.log(this.recipe);//
      
      this.viewRelatedRecipe(res.cuisine)
    })
  }

  viewRelatedRecipe(cuisine:string){
    this.api.relatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if(res.length>1){
        this.relatedRecipe=res.filter((item:any)=>item.name!==this.recipe.name)
        console.log(this.relatedRecipe);//5
      }
      console.log(res);//6
      
    })
  }


  downloadRecipe(){
console.log(this.recipeId,this.recipe);
    this.api.addToDownloadRecipeAPI(this.recipeId,this.recipe).subscribe((res:any)=>{
      console.log(res);
      this.generatePDF()
    })
  }

  generatePDF(){
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine : ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipe.servings}`,10,25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`,10,30)
    pdf.text(`Total Preparation Time : ${this.recipe.prepTimeMinutes} Minutes`,10,35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes} Minutes`,10,40)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriesPerServing}`,10,45)
    let head = [['Ingredients Needed','Cooking Instructions']]
    let body = []
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
  }

  savedRecipe(){
    this.api.savedRecipeAPI(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        alert("Recipe added successfully...")
      },
      error:(err:any)=>{
        console.log(err);
        alert(err.error
        )
      }
    })
  }

}
