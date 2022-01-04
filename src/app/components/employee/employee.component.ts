import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  editEmployee!: Employee;
  deleteEmployee!: Employee;

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  searchEmployees(searchKey: string): void{
    console.log(searchKey)
    const result: Employee[] = [];
    for(const employee of this.employees){
      //iterating through the entire employee list 
      //check to see if the index of the search key is present and puts it in the list
      if(employee.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 
          || employee.email.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
          || employee.phone.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
          || employee.role.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
      ){
        result.push(employee)
      }
    }
    this.employees = result;
    if(result.length === 0 || !searchKey){
    //resetting the employees from the backend
      this.getEmployees();
    }
  }

  onAddEmployee(addForm: NgForm):void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.createEmployee(addForm.value).subscribe(
      (response:Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.resetForm();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.resetForm();

      }
    )

  }

  onEditEmployee(employee: Employee):void{
    document.getElementById('delete-employee-form')?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response:Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onDeleteEmployee(employeeId: Number):void{
    document.getElementById('edit-employee-form')?.click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response:void) => {
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onOpenModel(employee: any, mode:string):void {
    const container = document.getElementById('main-container');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-bs-toggle','modal')

    switch (mode) {
      case 'add':
         btn.setAttribute('data-bs-target', '#addEmployeeModal');
         break;
      case 'edit':
        this.editEmployee = employee;
        btn.setAttribute('data-bs-target', '#editEmployeeModal');
        break;
      case 'delete':
        this.deleteEmployee = employee;
        btn.setAttribute('data-bs-target', '#deleteEmployeeModal')
        break;
      default:
        break;
    }

    container?.appendChild(btn);
    btn.click();
  }

}
