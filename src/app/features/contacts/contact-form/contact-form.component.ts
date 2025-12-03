
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { CategoriesService } from '../../categories/categories.service';
import { Contact } from '../../../shared/models/contact.model';
import { Category } from '../../../shared/models/category.model';

function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value as string | null) ?? '';
  if (!value) return null;
  const regex = /^[0-9+()\-\s]{6,20}$/;
  return regex.test(value) ? null : { phone: true };
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  isEdit = false;
  contactId: string | null = null;

  categories: Category[] = [];

  // on déclare  la propriété ici
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // et on l'initialise dans le constructeur
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [phoneValidator]],
      company: ['', [Validators.maxLength(100)]],
      jobTitle: ['', [Validators.maxLength(100)]],
      categoryId: [null as string | null],
      favorite: [false],
      notes: ['', [Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.getAll();

    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.isEdit = (this.route.snapshot.routeConfig?.path ?? '').includes('modifier');
      const contact = this.contactsService.getById(this.contactId);
      if (contact) {
        this.form.patchValue({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          jobTitle: contact.jobTitle,
          categoryId: contact.categoryId,
          favorite: contact.favorite,
          notes: contact.notes
        });
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.isEdit && this.contactId) {
      this.contactsService.update(this.contactId, value as Partial<Contact>);
    } else {
      this.contactsService.create(
        value as Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>
      );
    }

    this.router.navigate(['/contacts']);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}
