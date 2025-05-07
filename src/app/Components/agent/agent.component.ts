import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Import Router for navigation
import { AgentserviceService } from '../../Services/agentservice.service'; // Import the service
 
@Component({
  selector: 'app-agent',
  imports: [CommonModule],
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  packages: any[] = []; // Array to hold all packages
 
  constructor(private agentService: AgentserviceService, private router: Router) {} // Inject Router
 
  ngOnInit(): void {
    this.loadPackages(); // Fetch packages on component initialization
  }
 
  loadPackages(): void {
    this.agentService.getAllPackages().subscribe({
      next: (data: any[]) => {
        this.packages = data; // Assign fetched packages to the array
        console.log('Fetched packages:', this.packages); // Debugging log
      },
      error: (err) => {
        console.error('Error fetching packages:', err);
      }
    });
  }
 
  navigateToUpdate(packageId: number): void {
    this.router.navigate(['/app-update-package'], { queryParams: { id: packageId } }); // Navigate to update page with package ID
  }
 
  navigateToDelete(packageId: number): void {
    this.router.navigate(['/app-delete-package'], { queryParams: { id: packageId } }); // Navigate to delete confirmation page with package ID
  }
 
  // Add the onImageError method to handle image loading errors
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default-image.jpg'; // Replace with the path to your default image
  }
}
 