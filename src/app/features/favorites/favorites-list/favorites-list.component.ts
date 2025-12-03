import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactsService } from '../../contacts/contacts.service';


@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites-list.component.html'
})
export class FavoritesListComponent {
  private readonly contactsService = inject(ContactsService);

  get favorites() {
    return this.contactsService.getAll().filter((c) => c.favorite);
  }
}
