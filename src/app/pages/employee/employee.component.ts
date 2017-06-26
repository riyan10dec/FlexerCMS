import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'employee',
  templateUrl: './employee.html',
  styleUrls: ['./employee.scss'],
})
export class EmployeeComponent {

  source: LocalDataSource = new LocalDataSource();
  settings = {
    hideSubHeader: true,
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    columns: {
      userID: {
        title: 'User ID',
        type: 'string'
      },
      employeeName: {
        title: 'Employee Name',
        type: 'string'
      },
      status: {
        title: 'Status',
        type: 'string'
      },
      lastLogin: {
        title: 'Last Login',
        type: 'string'
      },
    }
  };
  IsAddEmployee: boolean;
  constructor() {
    this.IsAddEmployee = false;
  }
  NavigateAddNew(): void {
    this.IsAddEmployee = true;
  }
  AddNewEmployee(form: any): any {
    this.IsAddEmployee = false;
  }
}