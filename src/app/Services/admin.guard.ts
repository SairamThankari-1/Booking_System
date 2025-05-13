import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  
  constructor(private authService: AuthserviceService, private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole'); // Assuming this method exists in your AuthserviceService
    if (userRole === 'Admin') {
      return true; // Allow access
    } else {
      this.router.navigate([' ']); // Redirect to a "Not Authorized" page
      return false; // Block access
    }
  }
}