import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TwoFaVerificationComponent } from './two-fa-verification/two-fa-verification.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'2fa-verification', component:TwoFaVerificationComponent},
  {path:'dashboard', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
