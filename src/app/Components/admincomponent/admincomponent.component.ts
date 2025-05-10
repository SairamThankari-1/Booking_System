import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthserviceService } from '../../Services/authservice.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChartOptions, ChartType, ChartDataset,ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admincomponent',
  imports: [CommonModule,NgChartsModule,FormsModule],
  templateUrl: './admincomponent.component.html',
  styleUrl: './admincomponent.component.css'
})
export class AdmincomponentComponent implements OnInit {
  bookings: any[] = [];
  customers: any[] = [];
  packages: any[] = [];
  categories: any[] = [];
  reviews: any[] = [];
  users: any[] = [];
  totalUsers: number = 0;
  totalPackages: number = 0;
  totalAdmins: number = 0;
  totalCustomers: number = 0;
  totalTravelAgents: number = 0;
  visibleRows: number = 5;
 
 
  // Chart properties
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e5e5',
        },
      },
    },
    elements: {
      bar: {
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false, // Ensures full border rounding
      },
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [
    { data: [], label: 'Bookings' }
  ];
  doughnutChartLabels: string[] = ['Cancelled', 'Confirmed'];
  doughnutChartData: ChartData<'doughnut'> = {
  labels: this.doughnutChartLabels,
  datasets: [
    {
      data: [0, 0],
      backgroundColor: ['#ffc107', '#28a745']
    }
  ]
};
doughnutChartType: ChartType = 'doughnut';
  constructor(private apiService: AuthserviceService,private router:Router) { }
 
  ngOnInit(): void {
    this.getBookings();
    this.getPackages();
    this.getReviews();
    this.getTotalUsers();
    this.getUsersByRole();
  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  getTotalUsers(): void {
    this.apiService.getTotalUsers().subscribe(data => {
      this.users = data
      this.totalUsers = data.length;
    });
  }
 
  getUsersByRole(): void {
    this.apiService.getUsersByRole('Admin').subscribe(admins => {
    this.totalAdmins = admins.length;
    });
    this.apiService.getUsersByRole('Travel Agent').subscribe(data => { 
      this.totalTravelAgents = data.length;
    });
    this.apiService.getUsersByRole('Customer').subscribe(data => {
      this.customers = data;
      this.totalCustomers = data.length;
    });

  }
  

  getBookings(): void {
    this.apiService.getBookings().subscribe(data => {
      this.bookings = data; 
      // Generate Bar Chart
      this.generateMonthlyBookingsChart();
    const Cancelled = this.bookings.filter(b => b.status === 'Cancelled').length;
    const confirmed = this.bookings.filter(b => b.status === 'Confirmed').length;
 
    this.doughnutChartData.datasets[0].data = [Cancelled, confirmed];
    });
  }
 
 
 
  getPackages(): void {
    this.apiService.getPackages().subscribe(data => {
      this.packages = data;
      this.totalPackages = data.length;
    });
  }
 
  getReviews(): void {
    this.apiService.getReviews().subscribe(data => {
      this.reviews = data;
    });
  }
 
 
 
  generateMonthlyBookingsChart(): void {
    const monthlyCounts = Array(12).fill(0);
 
    this.bookings.forEach(booking => {
      const startDate = new Date(booking.startDate);
      const month = startDate.getMonth(); // 0 = January, 11 = December
      monthlyCounts[month]++;
    });
 
    this.barChartLabels = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.barChartData[0].data = monthlyCounts;
  }

  openAddAgentForm(): void {
    this.router.navigate(['/app-admin-register']); // Adjust the route as per your app's routing configuration
  }
  seeMore(): void {
    this.visibleRows += 5; // Increase the number of visible rows by 5
  }
  
gotoAssistance(): void {
  this.router.navigate(['/app-assistance']);
}
gotoPackages(): void {
  this.router.navigate(['/app-agent']);
}
goToUsers(): void {
  this.router.navigate(['/app-users']);
}

logout(): void {
  this.apiService.removeUser();
  this.apiService.removeToken();
  this.router.navigate(['/']); // Redirect to the login page
}

// enableEdit(user: any): void {
//   user.isEditing = true;
//   user.originalData = { ...user }; // Save original data in case of cancel
// }

// saveEdit(user: any): void {
//   this.apiService.updateUserProfile(user).subscribe(() => {
//     user.isEditing = false;
//     alert('User updated successfully.');
//   }, error => {
//     console.error('Error updating user:', error);
//     alert('Failed to update user.');
//   });
// }

// cancelEdit(user: any): void {
//   Object.assign(user, user.originalData); // Revert to original data
//   user.isEditing = false;
// }

// deleteUser(userId: number): void {
//   if (confirm('Are you sure you want to delete this user?')) {
//     this.apiService.deleteUser(userId).subscribe(() => {
//       this.users = this.users.filter(user => user.id !== userId);
//       alert('User deleted successfully.');
//     }, error => {
//       console.error('Error deleting user:', error);
//       alert('Failed to delete user.');
//     });
//   }
// }

}







