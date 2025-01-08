import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  
  registerForm:FormGroup 

      constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
        this.registerForm=this.fb.group({
          username:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
          email:["",[Validators.required,Validators.pattern("[a-zA-Z@.]*")]],
          password:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]

        })
      }

      register(){
        if(this.registerForm.valid){
          const username = this.registerForm.value.username
          const email = this.registerForm.value.email
          const password = this.registerForm.value.password
          console.log(username,email,password);
          //api call
          this.api.register({username,email,password}).subscribe({
            next:(res:any)=>{
              console.log(res);
              alert("Register Successful..")
              this.router.navigateByUrl('/login')
              this.registerForm.reset()
            },
            error:(err:any)=>{
              console.log(err);
              alert(err.error)
              
            }
          }
        )
        }
        else{
          alert("Invalid")
        }
      }




}
