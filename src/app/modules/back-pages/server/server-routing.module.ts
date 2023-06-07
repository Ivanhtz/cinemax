import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersBackComponent } from './components/users-back/users-back.component';
import { ArticlesBackComponent } from './components/articles-back/articles-back.component';
import { MoviesBackComponent } from './components/movies-back/movies-back.component';
import { BackendComponent } from './backend/backend.component';
import { CommentsBackComponent } from './components/comments-back/comments-back.component';

const routes: Routes = [
  { 
    path: '', 
    component: BackendComponent, 
    children: [
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      { path: 'users', component: UsersBackComponent },
      { path: 'articles', component: ArticlesBackComponent },
      { path: 'movies', component: MoviesBackComponent },
      { path: 'comments', component: CommentsBackComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutingModule { }