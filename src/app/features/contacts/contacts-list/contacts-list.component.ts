import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { CategoriesService } from '../../categories/categories.service';
import { Contact } from '../../../shared/models/contact.model';
import { Category } from '../../../shared/models/category.model';

type SortField = 'name' | 'date';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent {
  contacts: Contact[] = [];
  categories: Category[] = [];

  searchTerm = '';
  categoryFilter: 'toutes' | string = 'toutes';
  onlyFavorites = false;
  sortField: SortField = 'name';
  sortDirection: SortDirection = 'asc';

  constructor(
    private readonly contactsService: ContactsService,
    private readonly categoriesService: CategoriesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.refreshData();
  }

  private refreshData(): void {
    this.contacts = this.contactsService.getAll();
    this.categories = this.categoriesService.getAll();
  }

  get filtered(): Contact[] {
    let list = [...this.contacts];

    const routeCategoryId = this.route.snapshot.paramMap.get('id');
    if (routeCategoryId && this.categoryFilter === 'toutes') {
      list = list.filter((c) => c.categoryId === routeCategoryId);
    }

    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      list = list.filter((c) =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(term)
      );
    }

    if (this.categoryFilter !== 'toutes') {
      list = list.filter((c) => c.categoryId === this.categoryFilter);
    }

    if (this.onlyFavorites) {
      list = list.filter((c) => c.favorite);
    }

    list.sort((a, b) => {
      if (this.sortField === 'name') {
        const nameA = `${a.lastName} ${a.firstName}`.toLowerCase();
        const nameB = `${b.lastName} ${b.firstName}`.toLowerCase();
        return this.sortDirection === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else {
        return this.sortDirection === 'asc'
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt);
      }
    });

    return list;
  }

  onAdd(): void {
    this.router.navigate(['/contacts/nouveau']);
  }

  onSearch(value: string): void {
    this.searchTerm = value;
  }

  onCategoryChange(value: string): void {
    this.categoryFilter = value as 'toutes' | string;
  }

  onToggleFavoritesOnly(value: boolean): void {
    this.onlyFavorites = value;
  }

  onSortFieldChange(value: string): void {
    this.sortField = value as SortField;
  }

  onSortDirectionChange(value: string): void {
    this.sortDirection = value as SortDirection;
  }

  onToggleFavorite(contact: Contact): void {
    this.contactsService.toggleFavorite(contact.id);
    this.refreshData();
  }

  onDelete(contact: Contact): void {
    const ok = confirm(
      `Voulez-vous vraiment supprimer le contact "${contact.firstName} ${contact.lastName}" ?`
    );
    if (!ok) return;

    this.contactsService.delete(contact.id);
    this.refreshData();
  }

  getCategoryName(id: string | null): string {
    const cat = this.categories.find((c) => c.id === id);
    return cat ? cat.name : 'Aucune';
  }

  trackById(_index: number, contact: Contact): string {
    return contact.id;
  }
}
