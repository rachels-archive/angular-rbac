import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { authGuard } from './guard/auth.guard';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { DevDashboardComponent } from './components/dev-dashboard/dev-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'manager',
    component: ManagerDashboardComponent,
    canActivate: [authGuard],
    data: {
      role: 'manager',
    },
  },
  {
    path: 'developer',
    component: DevDashboardComponent,
    canActivate: [authGuard],
    data: {
      role: 'developer',
    },
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [authGuard],
    data: {
      role: 'manager',
    },
  },
];
