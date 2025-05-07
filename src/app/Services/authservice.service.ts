import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { of } from 'rxjs';
import { Constant } from '../Components/Constant/constant';
import { jwtDecode } from 'jwt-decode';

interface user {
  email: string;  
  password: string;
}
interface newUser {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) { 
   
  }

  login(userData:user): Observable<any>  {
    // const formData = new FormData();
    // formData.append('username',this.email);
    // formData.append('password',password);
    
    //call the API
    //In Post Supply 1. URL and 2. Param
    return this.http.post(Constant.BASE_URI+Constant.LOGIN,userData).pipe(
      catchError((error:any)=>{
        console.error(error);
        return of(error);
      })
    );
  }
  getToken(): string | null  {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);

  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
  // New method to decode the token and another method to extract tokens exp
  decodeToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token); // Decode the token and return its payload
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  getTokenExpiry(): Date | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      // Convert the exp value from Unix timestamp to a Date object
      const expiryDate = new Date(decodedToken.exp * 1000); // Multiply by 1000 to convert seconds to milliseconds
      return expiryDate;
    }
    return null;
  }
  getRole(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.Role) {
      const userrole= decodedToken.Role;
      
      return userrole;
    }
    return null;
  }

   // Method to get customers
   
getCustomers(): Observable<any> {
 const token = this.getToken();
 const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 return this.http.get(`${Constant.BASE_URI}User`, { headers });
 }
getPackages(): Observable<any> {
 const token = this.getToken();  
 const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 return this.http.get(`${Constant.BASE_URI}Package`, { headers }); 
}
getBookings(): Observable<any> {
 const token = this.getToken();
 const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 return this.http.get(`${Constant.BASE_URI}Booking`, { headers });
}
 registerUser(NewuserData: newUser): Observable<any> {   
    return this.http.post(`${Constant.BASE_URI+Constant.Register}`, NewuserData);
  }
  setUser(userId:number,Name:string,Email:string,ContactNumber:string): void {
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('Name', Name);
    localStorage.setItem('Email', Email);
    localStorage.setItem('ContactNumber', ContactNumber);
  }
  getUser(): { userId: number; Name: string; Email: string; ContactNumber: string } | null {
    const userId = localStorage.getItem('userId');
    const Name = localStorage.getItem('Name');
    const Email = localStorage.getItem('Email');
    const ContactNumber = localStorage.getItem('ContactNumber');

    if (userId && Name && Email && ContactNumber) {
      return {
        userId: parseInt(userId, 10),
        Name,
        Email,
        ContactNumber
      };
    }
    return null;
  }
  removeUser(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('Name');
    localStorage.removeItem('Email');
    localStorage.removeItem('ContactNumber');
  }
}
