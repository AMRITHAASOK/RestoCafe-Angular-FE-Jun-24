
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  appendToken(){
    let headers = new HttpHeaders()
    let token = sessionStorage.getItem("token")
    if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }
  viewRecipeAPI(id:any){
    return this.http.get(`${this.serverUrl}/viewRecipe/${id}`,this.appendToken())
  }
}
