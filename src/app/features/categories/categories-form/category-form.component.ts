import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories.service';


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    color: ['#2196f3', [Validators.required]]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.categoriesService.create(value.name ?? '', value.color ?? '#2196f3');
    this.router.navigate(['/categories']);
  }

  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
