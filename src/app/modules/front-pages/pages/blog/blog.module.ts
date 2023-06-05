import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { ArticleComponent } from './article/article.component';
import { MaterialModule } from 'src/app/modules/material/material.module';



@NgModule({
  declarations: [
    BlogListComponent,
    ViewBlogComponent,
    ArticleComponent,
    
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialModule
  ],
  exports:[
    BlogListComponent,
    ViewBlogComponent
  ]
})
export class BlogModule { }
