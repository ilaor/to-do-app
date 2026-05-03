import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent implements OnInit {
  title = 'toDoApp para SD';
  displayName = '';
  menuOpen = false;

  constructor(public userService: UserService, public router: Router) { }
  ngOnInit(): void {
    console.log('ngOnInit: navbar');
    this.userService.getUser().subscribe({
      next: user => {
        console.log("Usuario cargado: ", user);
        return this.displayName = user.displayName
  },
  error: err => {
    this.router.navigateByUrl("/login");
    console.error("Error cargando datos del usuario");
    console.log(err);
  }
  });
}
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.menuOpen = false;
    this.userService.signOut();
    console.log('Cerrando sesión: borrando token y redirigiendo al login...'); 
  }


}