import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';

@Component({
  selector: 'app-herosection',
  imports: [CommonModule],
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css']
})
export class HerosectionComponent {
  name= localStorage.getItem('Name');

  constructor(private router: Router,private authS: AuthserviceService) {}

  bookNow() {
    console.log('Book Now button clicked!');
    // Add your booking logic here
    this.router.navigate(['/app-booknow']);
  }

  navigateToProfile() {
    console.log('Navigating to Profile');
    this.router.navigate(['/app-profile']);
  }

  navigateToBookings() {
    console.log('Navigating to My Bookings');
    this.router.navigate(['/app-bookings']);
  }

  navigateToContact() {
    console.log('Navigating to Contact Us');
    this.router.navigate(['/app-assistance']);
  }
  
  logout(){
    this.authS.removeToken();
    this.authS.removeUser();
    this.router.navigate(['']);
  }
}
