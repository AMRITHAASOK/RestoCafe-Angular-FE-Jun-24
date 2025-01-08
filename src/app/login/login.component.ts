import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:FormGroup 

      constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
        this.loginForm=this.fb.group({
          email:["",[Validators.required,Validators.pattern("[a-zA-Z@.]*")]],
          password:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]

        })
      }

      login(){
        if(this.loginForm.valid){
          const email = this.loginForm.value.email
          const password = this.loginForm.value.password
          console.log(email,password);
       
          this.api.login({email,password}).subscribe({
            next:(res:any)=>{
              console.log(res);
              sessionStorage.setItem("user",JSON.stringify(res.user))
              sessionStorage.setItem("token",res.token)
              alert("Login Successful..")
              if(res.user.role="User"){
                this.router.navigateByUrl('/')
                this.loginForm.reset()
              }
              else{
                //admin panel
              }
          
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

