import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistance',
  imports: [CommonModule,FormsModule],
  templateUrl: './assistance.component.html',
  styleUrl: './assistance.component.css'
})

export class AssistanceComponent {
  packageId: string = '';
  issueDescription: string = '';
  issues: { packageId: string, issueDescription: string }[] = [];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/app-herosection']);
  }

  submitIssue() {
    if (this.packageId && this.issueDescription) {
      this.issues.push({
        packageId: this.packageId,
        issueDescription: this.issueDescription
      });
      this.packageId = '';
      this.issueDescription = '';
    }
  }
}

