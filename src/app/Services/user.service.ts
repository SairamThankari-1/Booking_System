import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';

export interface User {
  userID?: number; // Optional because it won't be included in userData during updates
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7117/api/User'; // Replace with your actual API endpoint

  constructor(private http: HttpClient,private authService: AuthserviceService) {}

  getAllUsers(): Observable<User[]> {
    const token = this.authService.getToken();  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<User[]>(this.apiUrl,{ headers });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update user without including userID in the userData
  updateUser(userID: number, userData: Omit<User, 'userID'>): Observable<void> {
    const token = this.authService.getToken();  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(`${this.apiUrl}/${userID}`, userData, { headers });
  }

  deleteUser(userID: number): Observable<void> {
    const token = this.authService.getToken();  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${userID}`,{ headers });
  }
}