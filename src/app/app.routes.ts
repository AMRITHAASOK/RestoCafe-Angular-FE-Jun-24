import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SavedRecipeComponent } from './saved-recipe/saved-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:"" , component:HomeComponent
    },
    {
        path:"about",component:AboutComponent
    },
    {
        path:'contact',component:ContactComponent
    },
    {
        path:'all-recipes',component:RecipesComponent
    },
    {
        path:'saved-recipe',component:SavedRecipeComponent
    },
    {
        path:'view-recipe/:id',component:ViewRecipeComponent
    },
    {
        path:'profile',component:ProfileComponent
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'register',component:RegisterComponent
    }
];
