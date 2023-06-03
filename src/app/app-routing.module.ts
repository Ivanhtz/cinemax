import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { C404Component } from './components/c404/c404.component';
import { LoginGuard } from './guards/login.guard';
import { FormComponent } from './components/home/form/form.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full', 
    redirectTo: 'home' 
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'login',
    component: FormComponent
  },
  {
    path: 'back',
    loadChildren: () => import('./modules/back-pages/server/server.module').then(m => m.ServerModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'not-found',
    component: C404Component
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
