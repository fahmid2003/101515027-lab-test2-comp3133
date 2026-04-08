import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  {
    path: 'characters',
    loadComponent: () => import('./components/characterlist/characterlist').then(m => m.CharacterlistComponent)
  },
  {
    path: 'filter',
    loadComponent: () => import('./components/characterfilter/characterfilter').then(m => m.CharacterfilterComponent)
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./components/characterdetails/characterdetails').then(m => m.CharacterdetailsComponent)
  },
];