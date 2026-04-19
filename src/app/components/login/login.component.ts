import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(public userService: UserService, public router: Router) {}

  login() {
    const user = { email: this.email, pass: this.password };
    this.userService.signIn(user).subscribe({
      next: (loggedUser: any) => {
        this.userService.setToken(loggedUser.token);
        console.log("Login correcto");
        console.log(loggedUser.token);
        // Navegación a la ruta indicada por el profesor
        this.router.navigateByUrl("/home");
      },
      error: (err) => {
        console.error("Error en el login");
        console.log(err);
      }
    });
  }
}