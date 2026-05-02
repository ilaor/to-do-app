import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  domain: string = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
  }

  getTasks() {
    return this.http.get<Task[]>(`${this.domain}/api/tareas`, { headers: this.getHeaders() })
      .pipe(map(res => res));
  }

  addTask(newTask: Task) {
    return this.http.post<Task>(`${this.domain}/api/tareas`, newTask, { headers: this.getHeaders() })
      .pipe(map(res => res));
  }

  deleteTask(id: any) {
    return this.http.delete<any>(`${this.domain}/api/tareas/${id}`, { headers: this.getHeaders() })
      .pipe(map(res => res));
  }

  updateTask(id: any, newTask: any) {
    return this.http.put<any>(`${this.domain}/api/tareas/${id}`, newTask, { headers: this.getHeaders() })
      .pipe(map(res => res));
  }
}