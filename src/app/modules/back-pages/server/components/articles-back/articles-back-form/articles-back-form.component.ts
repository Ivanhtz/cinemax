import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar aquí

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
    private articlesService: ArticlesService,
    private snackBar: MatSnackBar // Inyecta MatSnackBar aquí
  ) {
    this.editingArticle = this.initArticle();
    this.articleForm = this.initForm();
  }

  ngOnInit(): void {
    this.articlesService.articleBeingEdited$.subscribe((article) => {
      if (article) {
        this.isEditing = true;
        this.editingArticle = article;
        this.articleForm = this.initForm(article);
      } else {
        this.isEditing = false;
        this.editingArticle = this.initArticle();
        this.articleForm = this.initForm();
      }
    });
  }

  // Actualización del método initForm
  private initForm(article?: Iarticle): FormGroup {
    return this.formBuilder.group({
      title: [article ? article.title : '', Validators.required],
      image: [article ? article.image : '', Validators.required],
      content: [article ? article.content : '', Validators.required],
      text: [article ? article.text : '', Validators.required],
    });
  }

  // Actualización del método initArticle
  private initArticle(): Iarticle {
    return {
      id: 0,
      title: '',
      image: '',
      content: '',
      text: '',
    };
  }

  onSubmit(): void {
    const articleObservable = this.isEditing
      ? this.articlesService.updateArticle(
          this.editingArticle.id,
          this.articleForm.value
        )
      : this.articlesService.createArticle(this.articleForm.value);

    const wasEditing = this.isEditing;

    articleObservable.subscribe(() => {
      this.articlesService.stopEditingArticle();
      this.articleForm.reset();
      this.editingArticle = this.initArticle();

      // Muestra un mensaje de éxito
      this.snackBar.open(
        `Artículo ${wasEditing ? 'editado' : 'creado'} exitosamente`,
        'Cerrar',
        { duration: 5000 }
      );
    });
  }

  cancel(): void {
    this.articlesService.stopEditingArticle();
    this.articleForm.reset();
    this.editingArticle = this.initArticle();
  }
}
