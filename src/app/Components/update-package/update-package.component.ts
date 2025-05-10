import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentserviceService } from '../../Services/agentservice.service';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-update-package',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  standalone: true,
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.css']
})
export class UpdatePackageComponent implements OnInit {
  packageForm!: FormGroup; // Form group for package details
  loading = false; // Tracks if the package is being loaded
  error: string | null = null; // Holds error messages
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private agentService: AgentserviceService // Inject the service
  ) {}
 
  ngOnInit() {
    this.initForm(); // Initialize the form
 
    // Fetch the package details using the packageId from the signal
    const packageId = this.agentService.getPackageId();
    if (packageId) {
      this.fetchPackage(packageId);
    } else {
      this.error = 'No package ID provided.';
    }
  }
 
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
 
  fetchPackage(packageId: number): void {
    this.loading = true;
    this.error = null;
 
    this.agentService.getPackageById(packageId).subscribe({
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
 
  onSubmit() {
    if (this.packageForm.valid) {
      const updatedPackage = {
        ...this.packageForm.value,
        packageId: this.agentService.getPackageId() // Include the packageId in the payload
      };
 
      this.agentService.updatePackage(updatedPackage.packageId, updatedPackage).subscribe({
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
 
  onCancel() {
    this.router.navigate(['/packages']);
  }
  goBack():void {
    this.router.navigate(['/app-agent']);
  }
}
 