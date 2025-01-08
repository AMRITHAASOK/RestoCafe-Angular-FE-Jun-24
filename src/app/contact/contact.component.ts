import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  testimonyForm:FormGroup

  constructor(private fb:FormBuilder,private api:ApiService){
    this.testimonyForm = this.fb.group({
      name:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      email:["",[Validators.required,Validators.pattern("[a-zA-Z@.]*")]],
      message:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]]
    })
  }

  addTestimony(){
   if(this.testimonyForm.valid){
      const name = this.testimonyForm.value.name
      const email = this.testimonyForm.value.email
      const message = this.testimonyForm.value.message
      console.log(name,email,message);
    this.api.addTestimony({name,email,message}).subscribe((res:any)=>{
      console.log(res);
      alert("Testimony Added Successfully")
      
    })
      

   }
   else{
    alert("invalid form")
   }
    
  }
}
