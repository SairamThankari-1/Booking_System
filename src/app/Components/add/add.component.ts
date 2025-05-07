import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgentserviceService } from '../../Services/agentservice.service'; // Import the service
 
@Component({
  selector: 'app-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  newPackage: any = {
    title: '',
    duration: '', // Added duration field
    description: '',
    price: null,
    includedServices: '',
    category: '',
    travelAgent: '',
    image: '' // Added image field
  };
 
  constructor(private agentService: AgentserviceService) {}
 
  onSubmit(): void {
    if (this.newPackage.title && this.newPackage.price && this.newPackage.duration) {
      console.log('Request payload:', this.newPackage); // Debugging log
      this.agentService.addPackage(this.newPackage).subscribe({
        next: (response) => {
          console.log('Package added successfully!', response);
          this.resetForm(); // Clear the form after successful submission
        },
        error: (err) => {
          console.error('Error adding package:', err); // Log the error
        }
      });
    } else {
      console.error('Title, Price, and Duration are required fields');
    }
  }
 
  resetForm(): void {
    this.newPackage = {
      title: '',
      duration: '', // Reset duration field
      description: '',
      price: null,
      includedServices: '',
      category: '',
      travelAgent: '',
      image: '' // Reset image field
    };
  }
}
 