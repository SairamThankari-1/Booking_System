import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Booking {
  userID: number; // User ID
  packageID: number;
  startDate: string; // Change to string
  endDate: string; // Change to string
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7117/api/Booking';

  constructor(private http: HttpClient) {}

  addBooking(booking: Booking): Observable<any> {
    booking.userID = Number(localStorage.getItem('userId')) || 1; // Set user ID dynamically
    return this.http.post<any>(this.apiUrl, booking).pipe(
      catchError((error) => {
        console.error('Error adding booking:', error);
        return throwError(() => error);
      })
    );
  }
}