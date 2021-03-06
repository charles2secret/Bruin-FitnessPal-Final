import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { FriendsComponent } from './friends/friends.component';
import { LoginComponent } from './login/login.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PlanComponent } from './plan/plan.component';
import {DataTableComponent} from "./data-table/data-table.component";
import { AuthGuard } from './auth.guard'
import { ChartComponent } from './chart/chart.component';
import { ProfileComponent } from './profile/profile.component';
import { DataTableFoodComponent } from './data-table-food/data-table-food.component';

const routes: Routes = [
  { path:'home', component: DashboardHomeComponent,canActivate:[AuthGuard] },
  { path:'login', component: LoginComponent},
  { path:'navigate', component:NavigationPanelComponent},
  { path:'signUp', component: SignUpComponent},
  //FriendsComponent
  { path:'table', component: DataTableComponent},
  { path:'foodTable', component: DataTableFoodComponent},
  { path:'friends', component: FriendsComponent,canActivate:[AuthGuard]},
  { path:'chart', component: ChartComponent},
  { path:'plan', component: PlanComponent,canActivate:[AuthGuard]},
  { path:'profile', component:ProfileComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
