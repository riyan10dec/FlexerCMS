import { el } from '@angular/platform-browser/testing/src/browser_util';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Component, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
const actionMapping: IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      alert(`context menu for ${node.data.name}`);
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) { TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event); }
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
    },
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  },
};
@Component({
  selector: 'employee',
  templateUrl: './employee.html',
  styleUrls: ['./employee.scss'],
  providers: [EmployeeService],
})
export class EmployeeComponent {

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

  isAddEmployee: boolean;
  employee: Employee;
  asyncChildren = [];
  
  constructor(private employeeService: EmployeeService) {
    this.isAddEmployee = false;
  }

  nodes: any[];

  ngOnInit() {
    this.employeeService.getInitialTree(localStorage.getItem('client_id')).subscribe(
      data => {
        data.forEach(el => {
          let hasChild: boolean = false;
          let username: string;
          if ( el.Subs > 0) {
            hasChild = true;
            username = el.User_name + " (" + el.Subs + ")";
          } else {
            username = el.User_name;
          }
          this.nodes.push({
            name: username,
            user_id: el.User_id,
            hasChildren: hasChild,
          });
        });
      }, 
      errors => {
        
      });
  }
  
  getChildren(node: any) {
    return new Promise((resolve, reject) => {
      resolve(this.employeeService.getChild(localStorage.getItem('client_id'), node.user_id).subscribe(
      data => {
        data.forEach(el => {
          let hasChild: boolean = false;
          let username: string;
          if ( el.Subs > 0) {
            hasChild = true;
            username = el.User_name + " (" + el.Subs + ")";
          } else {
            username = el.User_name;
          }
          this.nodes.push({
            name: username,
            user_id: el.User_id,
            hasChildren: hasChild,
          });
        });
      }, 
      errors => {

      }));
    });
  }

  onMoveNode($event) {
    this.customTemplateStringOptions['allowDrag'] = false;
    const param: any = {
      clientid : localStorage.getItem('clientid'),
      user_id_from : $event.node.user_id,
      user_id_to : $event.to.parent.user_id,
    };
    this.employeeService.moveNode(param)
    .subscribe(
      data => {
        this.customTemplateStringOptions['allowDrag'] = true;
      }, 
      errors => {
        location.reload();
      });
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  customTemplateStringOptions: ITreeOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    nodeHeight: 23,
    allowDrag: (node) => {
      // console.log('allowDrag?');
      return true;
    },
    allowDrop: (node) => {
      // console.log('allowDrop?');
      return true;
    },
    useVirtualScroll: true,
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
  };

  NavigateAddNew(): void {
    this.isAddEmployee = true;
  }

  AddNewEmployee(form: any): any {
    this.employeeService.addEmployee(this.employee).subscribe(
      data => {
        this.isAddEmployee = false;
      }, 
      errors => {
        this.isAddEmployee = false;
      });
  }
}
