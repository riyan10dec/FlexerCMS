import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { FXDepartment } from './fxdepartment';
import { FXDepartmentService } from './fxdepartment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'fxdepartment',
  template: `<router-outlet></router-outlet>`,
  templateUrl: './fxdepartment.html',
  styleUrls: ['./fxdepartment.scss'],
  providers: [FXDepartmentService],
})
export class FXDepartmentComponent {

  source: LocalDataSource = new LocalDataSource();
  public input: string = '<input type="checkbox">/input>';
  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true,
    },
    columns: {
      checkbox: {
        title: '',
        type: 'html',
        valuePrepareFunction: (value) => { return this._sanitizer.bypassSecurityTrustHtml(this.input); },
        filter: false,
      },
      name: {
        title: 'Department Name',
        type: 'string',
      },
      employee: {
        title: 'Number of Employee',
        type: 'number',
      },
    },
  };
  constructor( private fxDepartmentService: FXDepartmentService, private _sanitizer: DomSanitizer, private departmentService: FXDepartmentService) {

    this.departmentService.getDepartmentData(15).subscribe((data) => {
      this.source.load(data);
    });
  }

  public onSubmit(values: Object): void {
  }

  private mapData() {
  }
}
