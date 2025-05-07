// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   imports: [],
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.css'
// })
// export class ProfileComponent {

// }
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Output() backToHero = new EventEmitter<void>();

  user = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    tickets: [
      { id: 1, destination: 'Paris', date: '2025-05-01' },
      { id: 2, destination: 'New York', date: '2025-06-15' }
    ]
  };

  
constructor(private router: Router) {}

 goBack() {
 this.router.navigate(['/app-herosection']);
 }

}
