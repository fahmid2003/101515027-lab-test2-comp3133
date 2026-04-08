import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.css'
})
export class CharacterfilterComponent implements OnInit {
  houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  houseControl = new FormControl('Gryffindor');
  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);

  constructor(private hpService: HarryPotterService, private router: Router) {}

  ngOnInit(): void {
    this.fetchByHouse('Gryffindor');
    this.houseControl.valueChanges.subscribe(house => {
      if (house) this.fetchByHouse(house);
    });
  }

  fetchByHouse(house: string): void {
    this.loading.set(true);
    this.hpService.getCharactersByHouse(house).subscribe({
      next: (data) => { this.characters.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/character', id]);
  }
}