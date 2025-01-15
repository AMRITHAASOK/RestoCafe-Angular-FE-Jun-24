import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent,HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileImage : string ="https://static.vecteezy.com/system/resources/previews/009/267/048/non_2x/user-icon-design-free-png.png"

  constructor(private api:ApiService){}
    
  ngOnInit(): void {
      const user =JSON.parse(sessionStorage.getItem("user")||"") 
      console.log(user);
      
      if(user.profilePic){
        this.profileImage=user.profilePic
      }
  }
//   ngOnInit(): void {
//     let user;
//     try {
//         user = JSON.parse(sessionStorage.getItem("user") || "{}");
//     } catch (e) {
//         console.error("Invalid JSON data in sessionStorage:", e);
//         user = {};
//     }
//     console.log(user);
    
//     if (user.profilePic) {
//         this.profileImage = user.profilePic;
//     }
// }
 

  getFile(event:any){
      let uploadFile = event.target.files[0]//file
      console.log(uploadFile);
      //img file to url converstion
     let fr = new FileReader()
     fr.readAsDataURL(uploadFile)//url
     fr.onload=(event:any)=>{
      console.log(event.target.result);
     this.profileImage=event.target.result
     }
            
  }

  updateProfile(){
    this.api.profileUpdate({profilePic:this.profileImage}).subscribe((res:any)=>{
     sessionStorage.setItem("user",JSON.stringify(res))
     
      this.profileImage=res.profilePic
      console.log(res);
      alert("Profile Pic Updated")
    })
  }
}
