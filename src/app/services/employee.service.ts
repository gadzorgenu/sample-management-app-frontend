import { Employee } from './../employee';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl  = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/all`);
  }
  
  createEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}/employee/add`,employee);
  }

  updateEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/employee/update`,employee);
  }

  deleteEmployee(employeeId: Number): Observable<void>{
     return this.http.delete<void>(`${this.apiUrl}/employee/delete/${employeeId}`);
  }

  getEmployeeById(employeeId: Number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}/employee/${employeeId}`);
  }
}
