import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app">
      <header class="app-header">
        <h1>Contact CRM</h1>
        <nav>
          <a routerLink="/" routerLinkActive="actif" [routerLinkActiveOptions]="{ exact: true }">Accueil</a>
          <a routerLink="/contacts" routerLinkActive="actif">Contacts</a>
          <a routerLink="/categories" routerLinkActive="actif">Catégories</a>
          <a routerLink="/favorites" routerLinkActive="actif">Favoris</a>
        </nav>
      </header>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>

      <footer class="app-footer">
        <span>© {{ year }} - Contact CRM</span>
      </footer>
    </div>
  `,
  styles: [`
    .app { min-height: 100vh; display: flex; flex-direction: column; font-family: system-ui, sans-serif; }
    .app-header, .app-footer { padding: 1rem; background: #222; color: #fff; }
    .app-header h1 { margin: 0 0 .5rem; font-size: 1.4rem; }
    nav a { margin-right: 1rem; color: #fff; text-decoration: none; font-size: .95rem; }
    nav a.actif { text-decoration: underline; }
    .app-main { flex: 1; padding: 1rem; background: #f5f5f5; }
  `]
})
export class LayoutComponent {
  readonly year = new Date().getFullYear();
}
