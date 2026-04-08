import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.interface';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css'
})
export class CharacterdetailsComponent implements OnInit {
  character = signal<Character | null>(null);
  loading = signal<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private hpService: HarryPotterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.hpService.getCharacterById(id).subscribe({
      next: (data) => { this.character.set(data[0]); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  goBack(): void { this.location.back(); }
}
