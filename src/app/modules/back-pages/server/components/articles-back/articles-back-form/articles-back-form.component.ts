import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Iarticle } from 'src/app/interfaces/iarticle.interface';
import { ArticlesService } from 'src/app/services/articles-service/articles.service';

@Component({
  selector: 'app-articles-back-form',
  templateUrl: './articles-back-form.component.html',
  styleUrls: ['./articles-back-form.component.scss'],
})
export class ArticlesBackFormComponent implements OnInit, OnDestroy {
  articleForm: FormGroup;
  editingArticle: Iarticle;
  isEditing: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private articlesService: ArticlesService,
    private snackBar: MatSnackBar
  ) {
    this.editingArticle = this.initArticle();
    this.articleForm = this.initForm();
  }

  ngOnInit(): void {
    this.articlesService.articleBeingEdited$
      .pipe(takeUntil(this.destroy$))
      .subscribe((article) => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(article?: Iarticle): FormGroup {
    return this.formBuilder.group({
      title: [
        article ? article.title : '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ],
      ],
      image: [
        article ? article.image : '',
        [Validators.required, Validators.pattern('https?://.+|/[^/]+')],
      ],
      content: [
        article ? article.content : '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
      text: [
        article ? article.text : '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(3100),
        ],
      ],
    });
  }

  private initArticle(): Iarticle {
    return {
      id: 0,
      title: '',
      image: '',
      content: '',
      text: '',
    };
  }

  // Maneja el envío del formulario
  onSubmit() {
    // Verifica la validez del formulario
    if (!this.articleForm.valid) {
      return;
    }

    // Crea o actualiza el artículo
    const articleObservable = this.isEditing
      ? this.articlesService.updateArticle(
          this.editingArticle.id,
          this.articleForm.value
        )
      : this.articlesService.createArticle(this.articleForm.value);

    const wasEditing = this.isEditing;

    articleObservable.subscribe(() => {
      // Reset de la edición
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
