import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { LoginComponent } from './login/login.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path:'home', component: DashboardHomeComponent },
  { path:'login', component: LoginComponent},
  {path:'navigate',component:NavigationPanelComponent},
  {path: 'signUp',component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
