import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'application-category',
  templateUrl: './application-category.html',
  styleUrls: ['./application-category.scss'],
})
export class ApplicationCategoryComponent {

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
        title: 'Application Name',
        type: 'string'
      },
      employeeName: {
        title: 'Category',
        type: 'string'
      },
      status: {
        title: 'Application Type',
        type: 'string'
      },
    }
  };
  isWork: boolean;
  IsAddApplicationCategory: boolean;
  constructor() {
    this.IsAddApplicationCategory = false;
    this.isWork = false;
  }
  NavigateAddNew(): void {
    this.IsAddApplicationCategory = true;
  }
  AddNewApplicationCategory(form: any): any {
    this.IsAddApplicationCategory = false;
  }
}