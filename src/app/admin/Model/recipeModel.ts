export class RecipeModel {
    name?:string
    ingredients?:Array<string>
    instructions?:Array<string>
    prepTimeMinutes?:number
    cookTimeMinutes?:number
    servings?:number
    difficulty?:number
    cuisine?:string
    caloriesPerServing?:number
    image?:string
    mealType?:Array<string>
}