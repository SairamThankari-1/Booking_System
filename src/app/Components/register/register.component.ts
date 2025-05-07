import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
   registerForm!: FormGroup;
    constructor(private fb: FormBuilder, private router: Router,private authS: AuthserviceService) {
  
   
   this.registerForm = this.fb.group({
     name: ['', Validators.required],
     contactNumber: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     password: ['', Validators.required]
     });
     
    }
    //  email=this.registerForm?.get('email')?.value;
    //  password = this.registerForm?.get('password')?.value;
    //  name= this.registerForm?.get('name')?.value;
    //  contact= this.registerForm?.get('contact')?.value;
    //    user = {
    //     name: this.registerForm?.get('name')?.value,
    //     contact: this.registerForm?.get('contact')?.value,
    //     email: this.email,
    //     password: this.password
    //     }



  //  onSubmit(): void {
  // //  if (this.registerForm.valid) {
  // //  console.log('Form Submitted!', this.registerForm.value);
  // //  this.authS.registerUser(this.user).subscribe({
  // //   next: (response: any) => {
  // //     alert('Registration Successful now login');
  // //     this.router.navigate(['']);
  // //   }
  // //  }
  // //   );
  //   }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = {
        name: this.registerForm.get('name')?.value,
        contactNumber: this.registerForm.get('contactNumber')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };
  
      console.log('Form Submitted!', user);
      this.authS.registerUser(user).subscribe({
        next: (response: any) => {
          alert('Registration Successful, now login');
          this.router.navigate(['']);
        },
        error: (err: any) => {
          console.error('Registration failed:', err);
          alert('Registration failed. Please try again.');
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }  


}
  
