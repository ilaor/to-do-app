import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

/**
 * Interceptor funcional para adjuntar el Token de Portador (Bearer Token)
 * a las cabeceras de las peticiones HTTP de forma automática.
 */
export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  
  // Inyectamos el servicio de usuario utilizando la nueva API funcional
  const userService = inject(UserService);
  const token = userService.getToken();

  // Si el token existe, clonamos la petición y añadimos la cabecera Authorization
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Pasamos la petición clonada al siguiente paso de la cadena
    return next(authReq);
  }

  // Si no hay token, enviamos la petición original sin modificaciones
  return next(req);
};  