import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,HeaderComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

    constructor(private api:ApiService){}

    allRecipe:any=[]
    feedbacks:any=[]
    ngOnInit(): void {
    this.getAllRecipe()
    this.getAllApprovedFeedBacks()
    }

     getAllRecipe(){
      this.api.getAllRecipeAPI().subscribe((res:any)=>{
        console.log(res); 
        this.allRecipe=res.slice(0,6)
        console.log(this.allRecipe);
        
      })
     }

     getAllApprovedFeedBacks(){
      this.api.getAllApprovedFeedbacksAPI().subscribe((res:any)=>{
        console.log(res);
        this.feedbacks=res
      })
     }
}
