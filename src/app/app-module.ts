import { NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Importamos las nuevas funciones de configuración HTTP
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// Importamos el nuevo interceptor funcional
import { AuthInterceptor } from './interceptors/auth-interceptor';
// Importamos FormsModule para el manejo de formularios en LoginComponent
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasksComponent } from './components/tasks/tasks.component';


@NgModule({
  declarations: [
    App,
    LoginComponent,
    NavbarComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // 1. Configuramos el cliente HTTP usando la API funcional
    // 2. Registramos el interceptor funcional dentro de withInterceptors
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ],
  bootstrap: [App]
})
export class AppModule { }