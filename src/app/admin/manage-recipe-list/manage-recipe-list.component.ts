import { Component, Input } from '@angular/core';
import { RecipeModel } from '../Model/recipeModel';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-manage-recipe-list',
  templateUrl: './manage-recipe-list.component.html',
  styleUrl: './manage-recipe-list.component.css'
})
export class ManageRecipeListComponent {

    recipeDetails:RecipeModel ={}

    allRecipes: any = []//to hold all recipes
    cuisineArray: any = []//to hold cuisine
    mealTypeArray: any = [] //single array with duplicated items
    newMealsArray:any=[] // items  without duplication
    dummyArray:any=[]
    ingrediantsArray:any=[]
    instructionsArray:any=[]
    updateMealsArray:any=[]

    @Input() id !:string

    constructor(private api: ApiService) { }

      ngOnInit(): void {
        this.getAllRecipes()
      }

      getAllRecipes() {
        this.api.getAllRecipeAPI().subscribe((res: any) => {
          console.log(res);

          if(this.id){
            this.recipeDetails=res.find((item:any)=>item._id==this.id)
            this.ingrediantsArray=this.recipeDetails.ingredients
            this.instructionsArray=this.recipeDetails.instructions
            this.updateMealsArray=this.recipeDetails.mealType
          }

          this.allRecipes = res
          this.dummyArray=this.allRecipes
          this.allRecipes.forEach((item: any) => {
            !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
          });
          console.log(this.cuisineArray);
    
          //meals array
          const meals=this.allRecipes.map((item: any) =>item.mealType)
          console.log(meals);//nested array
          
          console.log(meals.flat(Infinity));//single array
    
          this.mealTypeArray=meals.flat(Infinity)
          console.log(this.mealTypeArray);//single array
          
          
         this.mealTypeArray.forEach((item:any)=>{
            !this.newMealsArray.includes(item) && this.newMealsArray.push(item)
          })
    console.log(this.newMealsArray);
        })
      }
     
      addIngredients(ingredients:any){
        console.log(ingredients.value);
        if(ingredients.value){
            this.ingrediantsArray.push(ingredients.value)
            console.log(this.ingrediantsArray);
            
        }
        
      }
      removeItem(value:any){
        this.ingrediantsArray=this.ingrediantsArray.filter((item:any)=>item!=value)
      }
      addInstructions(instructions:any){
        console.log(instructions.value);
        this.instructionsArray.push(instructions.value)
        console.log(this.instructionsArray);
        
      }
      removeInstructions(value:any){
        this.instructionsArray=this.instructionsArray.filter((item:any)=>item!=value)
      }
      mealTypeSelect(event:any){
        console.log(event.target.checked);
        if(event.target.checked){//true
         !this.updateMealsArray.includes(event.target.name) && this.updateMealsArray.push(event.target.name)
          console.log(this.updateMealsArray);
        }
        else{
          this.updateMealsArray=this.updateMealsArray.filter((item:any)=>item!=event.target.name)
        }
        
      }
      addRecipe(){
        console.log(this.recipeDetails);
        //1 add instructions,ingridients, updatemealsarrry to recipe details
        this.recipeDetails.ingredients=this.ingrediantsArray
        this.recipeDetails.instructions=this.instructionsArray
        this.recipeDetails.mealType=this.updateMealsArray

        //2 check all fields have values
        if(this.recipeDetails.name && this.recipeDetails.ingredients!.length>0 && this.recipeDetails.instructions!.length>0 &&this.recipeDetails.prepTimeMinutes && this.recipeDetails.cookTimeMinutes && this.recipeDetails.servings && this.recipeDetails.difficulty && this.recipeDetails.cuisine && this.recipeDetails.caloriesPerServing && this.recipeDetails.image && this.recipeDetails.mealType!.length>0){
          //3 api calling
          this.api.addRecipe(this.recipeDetails).subscribe({
            next:(res:any)=>{
              console.log(res);
              alert("Recipe Added Successfully...")
            },
            error:(err:any)=>{
              console.log(err);
              
            }
          })

        }
        else{
          alert("Please fill the form")
        }
      }

      updateRecipe(){
        console.log(this.recipeDetails);
        //1 add instructions,ingridients, updatemealsarrry to recipe details
        this.recipeDetails.ingredients=this.ingrediantsArray
        this.recipeDetails.instructions=this.instructionsArray
        this.recipeDetails.mealType=this.updateMealsArray

        //2 check all fields have values
        if(this.recipeDetails.name && this.recipeDetails.ingredients!.length>0 && this.recipeDetails.instructions!.length>0 &&this.recipeDetails.prepTimeMinutes && this.recipeDetails.cookTimeMinutes && this.recipeDetails.servings && this.recipeDetails.difficulty && this.recipeDetails.cuisine && this.recipeDetails.caloriesPerServing && this.recipeDetails.image && this.recipeDetails.mealType!.length>0){
          // 3 api calling
          this.api.updateRecipeAPI(this.id,this.recipeDetails).subscribe({
            next:(res:any)=>{
              console.log(res);
              alert("Recipe Updated Successfully...")
            },
            error:(err:any)=>{
              console.log(err);
              
            }
          })
          // alert("clicked")

        }
        else{
          alert("Please fill the form")
        }
      }
}
