import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';

const routes: Routes = [
  { path:'', component: BlogListComponent},
  { path:'view-blog', component:ViewBlogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
