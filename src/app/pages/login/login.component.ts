import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginobj = new Login();
  message: string = '';
  router = inject(Router);
   

  constructor(private http: HttpClient) {}

  onLogin() {
  this.http.post<any>('https://localhost:7202/api/Auth/login', this.loginobj)
    .subscribe({
      next: (res) => {
        if (res.message === 'Login Success') {
          console.log(" Login success, navigating to /home...");
          this.router.navigateByUrl('home');  
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Server error!');
      }
    });
}
}

export class Login {
  UserName: string = '';
  Password: string = '';
}

