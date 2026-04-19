import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { authGuard } from "./guards/auth-guard";

const routes: Routes = [
  { 
    path: '', 
    component: TasksComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  // Redirecciones
  { 
    path: 'home', 
    redirectTo: '' 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }