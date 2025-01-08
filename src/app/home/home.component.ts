import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

    constructor(private api:ApiService){}

    allRecipe:any=[]

    ngOnInit(): void {
    this.getAllRecipe()
    }

     getAllRecipe(){
      this.api.getAllRecipeAPI().subscribe((res:any)=>{
        console.log(res); 
        this.allRecipe=res.slice(0,6)
        console.log(this.allRecipe);
        
      })
     }
}
