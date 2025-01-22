import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit{

  feedbacks:any=[]

    constructor(private api:ApiService){}
  

    ngOnInit(): void {
    this.getFeedbacks()
    }

    getFeedbacks(){
      this.api.getAllFeedbacksAPI().subscribe((res:any)=>{
        console.log(res);
        this.feedbacks=res
      })
    }
    updateFeedbacks(id:string,status:string){
      this.api.updateFeedbacksAPI(id,status).subscribe((res:any)=>{
        console.log(res);
       this.getFeedbacks()
      })
    }
    
}
