import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { FriendsComponent } from './friends/friends.component';
import { LoginComponent } from './login/login.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PlanComponent } from './plan/plan.component';
import {DataTableComponent} from "./data-table/data-table.component";

const routes: Routes = [
  { path:'home', component: DashboardHomeComponent },
  { path:'login', component: LoginComponent},
  { path:'navigate', component:NavigationPanelComponent},
  { path:'signUp', component: SignUpComponent},
  //FriendsComponent
  { path:'friends', component: DataTableComponent},
  { path:'plan', component: PlanComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
