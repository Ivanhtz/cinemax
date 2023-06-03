import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { C404Component } from './components/c404/c404.component';
import { LoginGuard } from './guards/login.guard';
import { FormComponent } from './components/home/form/form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'principal', loadChildren: () => import('./modules/front-pages/principal/principal.module').then(m => m.PrincipalModule) },
  { path: 'back', component: FormComponent },
  // { path: 'back', loadChildren: () => import('./modules/back-pages/server/server.module').then(m => m.ServerModule) },
  { path: 'not-found', component: C404Component },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
