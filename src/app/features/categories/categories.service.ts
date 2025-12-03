import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { IdGeneratorService } from '../../core/services/id-generator.service';
import { Category } from '../../shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly STORAGE_KEY = 'categories';
  private categories: Category[] = [];

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly idGeneratorService: IdGeneratorService
  ) {
    // ⬇️ Fallback = []
    this.categories = this.localStorageService.getItem<Category[]>(this.STORAGE_KEY, []);
  }

  private persist(): void {
    this.localStorageService.setItem(this.STORAGE_KEY, this.categories);
  }

  getAll(): Category[] {
    return [...this.categories];
  }

  getById(id: string): Category | null {
    return this.categories.find((c) => c.id === id) ?? null;
  }

  create(name: string, color: string): Category {
    const now = new Date().toISOString();
    const category: Category = {
      id: this.idGeneratorService.generate(),
      name,
      color,
      createdAt: now
    };
    this.categories.push(category);
    this.persist();
    return category;
  }

  update(id: string, changes: Partial<Category>): void {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return;

    this.categories[index] = {
      ...this.categories[index],
      ...changes
    };
    this.persist();
  }

  delete(id: string): void {
    this.categories = this.categories.filter((c) => c.id !== id);
    this.persist();
  }
}
