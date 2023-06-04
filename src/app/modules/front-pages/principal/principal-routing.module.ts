import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal.component';
import { ViewFilmComponent } from '../pages/films/view-film/view-film.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'principal' },
  {
    path: 'principal', component: PrincipalComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'films' },
      { path: 'films', loadChildren: () => import('../pages/films/films.module').then(m => m.FilmsModule) },
      { path: 'films/:id', component: ViewFilmComponent },
      { path: 'about', loadChildren: () => import('../pages/about/about.module').then(m => m.AboutModule) },
      { path: 'contact', loadChildren: () => import('../pages/contact-form/contact-form.module').then(m => m.ContactFormModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
