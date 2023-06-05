import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';

import { ArticlesService } from 'src/app/services/articles-service/articles.service';

@Component({
  selector: 'app-articles-back-form',
  templateUrl: './articles-back-form.component.html',
  styleUrls: ['./articles-back-form.component.scss'],
})
export class ArticlesBackFormComponent implements OnInit {
  articleForm: FormGroup;
  editingArticle: Iarticle;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private articlesService: ArticlesService
  ) {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.editingArticle = {
      id: 0,
      title: '',
      image: '',
      content: ''
    };
  }

  ngOnInit(): void {
    this.articlesService.articleBeingEdited$.subscribe((article) => {
      if (article) {
        this.isEditing = true;
        this.editingArticle = article;
        this.articleForm = this.formBuilder.group({
          title: [article.title, Validators.required],
          image: [article.image, Validators.required],
          content: [article.content, Validators.required]
        });
      } else {
        this.isEditing = false;
        this.editingArticle = {
          id: 0,
          title: '',
          image: '',
          content: ''
        };
        this.articleForm = this.formBuilder.group({
          title: ['', Validators.required],
          image: ['', Validators.required],
          content: ['', Validators.required]
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.articlesService
        .updateArticle(this.editingArticle.id, this.articleForm.value)
        .subscribe(() => {
          this.articlesService.stopEditingArticle();
        });
    } else {
      this.articlesService.createArticle(this.articleForm.value).subscribe(() => {
        this.articlesService.stopEditingArticle();
      });
    }
  }

  cancel(): void {
    this.articlesService.stopEditingArticle();
  }
}