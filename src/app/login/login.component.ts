import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent],
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
              this.loginForm.reset()
              if(res.user.role=="User"){
                alert("Login Successful..")
                this.router.navigateByUrl('/')
              }
              else{
                //admin panel
                this.router.navigateByUrl('/admin')
              }
              //window.location.reload()
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

