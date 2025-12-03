import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../../../shared/models/contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent {
  contact: Contact | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly contactsService: ContactsService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contact = this.contactsService.getById(id);
    }
  }

  onBack(): void {
    this.router.navigate(['/contacts']);
  }

  onDelete(): void {
    if (!this.contact) return;
    const ok = confirm(
      `Voulez-vous vraiment supprimer "${this.contact.firstName} ${this.contact.lastName}" ?`
    );
    if (!ok) return;

    this.contactsService.delete(this.contact.id);
    this.router.navigate(['/contacts']);
  }

  onToggleFavorite(): void {
    if (!this.contact) return;
    this.contactsService.toggleFavorite(this.contact.id);
    const updated = this.contactsService.getById(this.contact.id);
    this.contact = updated ?? this.contact;
  }
}
