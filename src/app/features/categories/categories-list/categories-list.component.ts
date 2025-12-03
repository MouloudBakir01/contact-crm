import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { ContactsService } from '../../contacts/contacts.service';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent {
  categories: Category[] = [];
  errorMessage = '';

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly contactsService: ContactsService,
    private readonly router: Router
  ) {
    this.refresh();
  }

  private refresh(): void {
    this.categories = this.categoriesService.getAll();
  }

  onAdd(): void {
    this.router.navigate(['/categories/nouvelle']);
  }

  onDelete(id: string): void {
    this.errorMessage = '';

    const used = this.contactsService.getAll().some((c) => c.categoryId === id);
    if (used) {
      this.errorMessage =
        'Impossible de supprimer cette catégorie : elle est encore utilisée par au moins un contact.';
      return;
    }

    if (confirm('Supprimer cette catégorie ?')) {
      this.categoriesService.delete(id);
      this.refresh();
    }
  }
}
