import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'url-category',
  templateUrl: './url-category.html',
  styleUrls: ['./url-category.scss'],
})
export class URLCategoryComponent {

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
        title: 'URL Name',
        type: 'string'
      },
      employeeName: {
        title: 'Category',
        type: 'string'
      },
      status: {
        title: 'URL Type',
        type: 'string'
      },
    }
  };
  IsAddURLCategory: boolean;
  isWork: boolean;
  constructor() {
    this.IsAddURLCategory = false;
    this.isWork = false;
  }
  NavigateAddNew(): void {
    this.IsAddURLCategory = true;
  }
  AddNewURLCategory(form: any): any {
    this.IsAddURLCategory = false;
  }
}