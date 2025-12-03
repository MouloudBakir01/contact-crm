import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactsService } from '../../contacts/contacts.service';
import { CategoriesService } from '../../categories/categories.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalContacts = 0;
  totalFavorites = 0;
  totalCategories = 0;

  constructor(
    private readonly contactsService: ContactsService,
    private readonly categoriesService: CategoriesService
  ) {
    const contacts = this.contactsService.getAll();
    this.totalContacts = contacts.length;
    this.totalFavorites = contacts.filter((c) => c.favorite).length;
    this.totalCategories = this.categoriesService.getAll().length;
  }
}
