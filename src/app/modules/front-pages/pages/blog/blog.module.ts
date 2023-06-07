import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { ArticleComponent } from './article/article.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentComponent } from './comment/comment.component';
import { AddIconPipe } from './pipes/add-icon.pipe';
import { ResaltarDirective } from './directives/resaltar.directive';




@NgModule({
  declarations: [
    BlogListComponent,
    ViewBlogComponent,
    ArticleComponent,
    CommentFormComponent,
    CommentComponent,
    AddIconPipe,
    ResaltarDirective

  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    BlogListComponent,
    ViewBlogComponent
  ]
})
export class BlogModule { }
