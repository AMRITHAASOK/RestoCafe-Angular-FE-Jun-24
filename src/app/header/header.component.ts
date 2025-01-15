import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private router:Router){}

      isLoggedInStatus:Boolean=false;
      isLoggedName:String=""

      ngOnInit(): void {
          if(sessionStorage.getItem("token")){
              this.isLoggedInStatus=true
              this.isLoggedName=JSON.parse(sessionStorage.getItem("user")||"").username
              console.log(this.isLoggedName);
           
          }
          else{
            this.isLoggedInStatus=false
            this.isLoggedName=" "
          }
      }

      logout(){
        sessionStorage.clear()
        this.router.navigateByUrl('/')
        window.location.reload()
      }

     

}
