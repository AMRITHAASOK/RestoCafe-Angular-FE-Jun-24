import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allRecipe:[],searchKey:string): any[] {
    let result:any=[] // 
    if(!allRecipe || searchKey==""){
      return allRecipe
    }
    else{
      result = allRecipe.filter((item:any)=>item.name.toLowerCase().trim().includes(searchKey.toLowerCase().trim()))
      return result;
    }

    
  }

}
