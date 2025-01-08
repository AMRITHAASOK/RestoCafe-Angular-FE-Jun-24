
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   serverUrl = 'http://localhost:4000'
  constructor(private http:HttpClient) { }

  getAllRecipeAPI(){
   return this.http.get(`${this.serverUrl}/getAllRecipes`)
  }

  addTestimony(body:any){
    return this.http.post(`${this.serverUrl}/add-Testimony`,body)
  }

  register(body:any){
    return this.http.post(`${this.serverUrl}/register`,body)
  }
  login(body:any){
    return this.http.post(`${this.serverUrl}/login`,body)
  }
  viewRecipeAPI(id:any){
    
  }
}
