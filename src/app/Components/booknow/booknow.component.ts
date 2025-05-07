import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booknow',
  imports: [CommonModule, FormsModule],
  templateUrl: './booknow.component.html',
  styleUrl: './booknow.component.css'
})
export class BooknowComponent {
  startDate: string = '';
  duration: string = '';
  destination: string = '';
  name= localStorage.getItem('Name');
  constructor(private router: Router) {}

  viewPackages() {
    this.router.navigate(['/app-packages'], { queryParams: { startDate: this.startDate, duration: this.duration, destination: this.destination } });
  }
  goBack() {
        this.router.navigate(['/app-herosection']);
      }
}
