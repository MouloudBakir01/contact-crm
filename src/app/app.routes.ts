import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { ContactsListComponent } from './features/contacts/contacts-list/contacts-list.component';
import { ContactFormComponent } from './features/contacts/contact-form/contact-form.component';
import { ContactDetailComponent } from './features/contacts/contact-detail/contact-detail.component';
import { CategoriesListComponent } from './features/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './features/categories/categories-form/category-form.component';
import { FavoritesListComponent } from './features/favorites/favorites-list/favorites-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },

      // 👉 c’est CETTE ligne qui doit envoyer vers la liste
      { path: 'contacts', component: ContactsListComponent },
      { path: 'contacts/nouveau', component: ContactFormComponent },
      { path: 'contacts/:id', component: ContactDetailComponent },
      { path: 'contacts/:id/modifier', component: ContactFormComponent },

      { path: 'categories', component: CategoriesListComponent },
      { path: 'categories/nouvelle', component: CategoryFormComponent },
      { path: 'categories/:id', component: ContactsListComponent },

      { path: 'favorites', component: FavoritesListComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

