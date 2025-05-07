import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

 




@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.css']
})
export class UpdatePackageComponent implements OnInit {
  packageForm!: FormGroup; // Form group for package details
  packageId!: number; // Holds the package ID entered by the user
  loading = false; // Tracks if the package is being loaded
  error: string | null = null; // Holds error messages
  private baseUrl = 'https://localhost:7117/api'; // Base URL for API requests
 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.initForm(); // Initialize the form
  }
 
  // Initialize the form with validation
  private initForm() {
    this.packageForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      duration: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      includedServices: [''],
      category: [''],
      travelAgent: [''],
      image: ['', Validators.required]
    });
  }
 
  // Fetch package details by packageId
  fetchPackage() {
    if (!this.packageId) {
      this.error = 'Please enter a valid Package ID.';
      return;
    }
 
    this.loading = true;
    this.error = null;
 
    this.http.get<any>(`${this.baseUrl}/Package/${this.packageId}`).subscribe({
      next: (packageData) => {
        this.packageForm.patchValue(packageData); // Populate the form with fetched data
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load package details. Please try again.';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }
 
  // Submit the updated package details
  onSubmit() {
    if (this.packageForm.valid) {
      const updatedPackage = {
        ...this.packageForm.value,
        packageId: this.packageId // Include the packageId in the payload
      };
 
      this.http.put(`${this.baseUrl}/Package/${this.packageId}`, updatedPackage).subscribe({
        next: () => {
          alert('Package updated successfully!');
          this.router.navigate(['/packages']); // Navigate to the packages list
        },
        error: (error) => {
          this.error = 'Failed to update package. Please try again.';
          console.error('Error:', error);
        }
      });
    } else {
      this.error = 'Please fill out all required fields correctly.';
    }
  }
 
  // Cancel and navigate back
  onCancel() {
    this.router.navigate(['/packages']);
  }
}
 