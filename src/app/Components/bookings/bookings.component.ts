import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
  
bookings = [
      {
        destination: 'Paris, France',
        dates: 'June 15, 2025 - June 22, 2025',
        package: 'Romantic Get 20, 2025',
        price: '$3,200'
      },
      {
        destination: 'New York, USA',
        dates: 'August 5, 2025 - August 12, 2025',
        package: 'City Adventure',
        price: '$2,800'
      }
    ];  

  constructor(private router: Router) {}

    goBack() {
      this.router.navigate(['/app-herosection']);
    }
  
}
