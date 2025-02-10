import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

// Définir l'interface pour la réponse de l'API
export interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response: LoginResponse) => {
          // Si la connexion est réussie, on stocke le token et on redirige
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          alert("Erreur de connexion, veuillez vérifier vos informations.");
        }
      });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  }
}
