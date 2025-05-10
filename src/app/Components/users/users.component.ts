import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public userData: Omit<User, 'userID'> = {
    name: '',
    email: '',
    password: '',
    contactNumber: ''
  };
  public userID: number | null = null; // Separate variable for userID
  public userList: User[] = [];
  public isEditing: boolean = false;
  public successMessage: string = '';
  public errorMessage: string = '';

  constructor(private userService: UserService,private router:Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.clearMessages();
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.userList = users;
      },
      error: (error: Error) => {
        console.error('Error loading users:', error);
        this.errorMessage = 'Error loading users';
      }
    });
  }

  public editUser(user: User): void {
    this.isEditing = true;
    this.userID = user.userID!; // Store userID separately
    this.userData = {
      name: user.name,
      email: user.email,
      password: user.password,
      contactNumber: user.contactNumber
    };
    this.clearMessages();
  }

  public updateUser(): void {
    if (this.userID) {
      this.clearMessages();
      this.userService.updateUser(this.userID, this.userData).subscribe({
        next: () => {
          this.successMessage = 'User updated successfully';
          this.loadUsers();
          this.resetForm();
        },
        error: (error: Error) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'Error updating user';
        }
      });
    }
  }
  public deleteUser(userID: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userID).subscribe({
        next: () => {
          this.successMessage = 'User deleted successfully';
          this.loadUsers(); // Refresh the user list
        },
        error: (error: Error) => {
          console.error('Error deleting user:', error);
          this.errorMessage = 'Error deleting user';
        }
      });
    }
  }
  public resetForm(): void {
    this.clearMessages();
    this.userData = {
      name: '',
      email: '',
      password: '',
      contactNumber: ''
    };
    this.userID = null; // Reset userID
    this.isEditing = false;
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
  goBack(): void {
    this.router.navigate(['/app-admincomponent']);
  }
}