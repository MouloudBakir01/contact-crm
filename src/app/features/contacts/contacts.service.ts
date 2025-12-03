import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { IdGeneratorService } from '../../core/services/id-generator.service';
import { Contact } from '../../shared/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly STORAGE_KEY = 'contacts';
  private contacts: Contact[] = [];

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly idGeneratorService: IdGeneratorService
  ) {
    // On laisse le service gérer le fallback et le JSON.parse
    this.contacts = this.localStorageService.getItem<Contact[]>(this.STORAGE_KEY, []);
  }

  private persist(): void {
    //  On lui donne directement le tableau typé
    this.localStorageService.setItem(this.STORAGE_KEY, this.contacts);
  }

  getAll(): Contact[] {
    return [...this.contacts];
  }

  getById(id: string): Contact | null {
    return this.contacts.find((c) => c.id === id) ?? null;
  }

  create(data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Contact {
    const now = new Date().toISOString();
    const contact: Contact = {
      ...data,
      id: this.idGeneratorService.generate(),
      favorite: data.favorite ?? false,
      createdAt: now,
      updatedAt: now
    };
    this.contacts.push(contact);
    this.persist();
    return contact;
  }

  update(id: string, changes: Partial<Contact>): void {
    const index = this.contacts.findIndex((c) => c.id === id);
    if (index === -1) return;

    this.contacts[index] = {
      ...this.contacts[index],
      ...changes,
      updatedAt: new Date().toISOString()
    };
    this.persist();
  }

  delete(id: string): void {
    this.contacts = this.contacts.filter((c) => c.id !== id);
    this.persist();
  }

  toggleFavorite(id: string): void {
    const contact = this.contacts.find((c) => c.id === id);
    if (!contact) return;
    contact.favorite = !contact.favorite;
    contact.updatedAt = new Date().toISOString();
    this.persist();
  }
}
