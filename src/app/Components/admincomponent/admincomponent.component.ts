import { Component } from '@angular/core';
import { AuthserviceService } from '../../Services/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admincomponent',
  imports: [CommonModule],
  templateUrl: './admincomponent.component.html',
  styleUrl: './admincomponent.component.css'
})
export class AdmincomponentComponent {

    bookings: any[] = [];
   customers: any[] = [];
   packages: any[] = [];
  
   constructor(private apiService: AuthserviceService) { }
  
   ngOnInit(): void {
   this.getBookings();
   this.getCustomers();
   this.getPackages();
   }
  
    getBookings(): void {
   this.apiService.getBookings().subscribe(data => {
   this.bookings = data;
    });
   }
  
   getCustomers(): void {
   this.apiService.getCustomers().subscribe(data => {
   this.customers = data;
   });
   }
  
    getPackages(): void {
   this.apiService.getPackages().subscribe(data => {
    this.packages = data;
   });
   }
  }
  

