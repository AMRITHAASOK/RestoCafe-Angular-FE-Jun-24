import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { ManageRecipeListComponent } from './manage-recipe-list/manage-recipe-list.component';

const routes: Routes = [
  {
    path:'',component:DashboardComponent
  },
  {
    path:'download-list',component:DownloadListComponent
  },
  {
    path:'recipe-list',component:RecipeListComponent
  },
  {
    path:'user-list',component:UserListComponent
  },
  {
    path:'request-list',component:RequestListComponent
  },
  {
    path:'recipe/add',component:ManageRecipeListComponent
  },
  {
    path:'recipe/edit/:id',component:ManageRecipeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
