import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedGuard } from './guards/logged.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';

const routes: Routes = [
  {
    component: LoginComponent,
    path: '',
    canActivate: [NotLoggedGuard],
  },
  {
    component: RegisterComponent,
    path: 'register',
    canActivate: [NotLoggedGuard],
  },
  {
    component: HomeComponent,
    path: 'home',
    canActivate: [LoggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
