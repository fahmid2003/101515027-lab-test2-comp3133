import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.interface';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css'
})
export class CharacterlistComponent implements OnInit {
  characters = signal<Character[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');

  constructor(private hpService: HarryPotterService, private router: Router) {}

  ngOnInit(): void {
    this.hpService.getAllCharacters().subscribe({
      next: (data) => { this.characters.set(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to load characters.'); this.loading.set(false); }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/character', id]);
  }
}