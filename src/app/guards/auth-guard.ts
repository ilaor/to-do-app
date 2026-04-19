import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

/**
 * Verifica si el usuario está autenticado antes de permitir el acceso.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos las dependencias necesarias mediante la API funcional
  const router = inject(Router);
  const userService = inject(UserService);

  console.log('Ejecutando AuthGuard...');

  // Comprobamos el estado de autenticación a través del servicio
  if (userService.isAuth()) {
    console.log(`Acceso permitido a: ${state.url}`);
    return true;
  } else {
    console.log('Usuario no autenticado. Redirigiendo al login...');
    // Redirigimos al usuario a la página de inicio de sesión
    router.navigateByUrl('/login');
    // Retornamos false para cancelar la navegación actual
    return false;
  }
};