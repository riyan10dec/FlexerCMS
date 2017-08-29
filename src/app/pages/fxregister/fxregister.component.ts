import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { FXRegister } from './fxregister';
import { FXRegisterService } from './fxregister.service';

@Component({
  selector: 'fxregister',
  templateUrl: './fxregister.html',
  styleUrls: ['./fxregister.scss'],
  providers: [FXRegisterService],
})
export class FXRegisterComponent implements OnInit {
  superiorList: any;
  // superiorList: any;
  // form: FormGroup;
  name: string;
  employeeID: string;
  position: string;
  department: string;
  superior: number;
  email: string;
  password: string;
  cPassword: string;
  activeDate: string;
  endDate: string;

  // passwords: FormGroup;
  fxRegister: FXRegister;
  // fxRegisterSuperior: FXRegister;
  submitted: boolean = false;
  isAddEmployee: boolean = false;
  userid: number = 2;
  data: any;
  selectedSuperior: any;
  
  // onSuperiorChange(superiorID: any) {
  //   // some code I execute after ngModel changes.
  // }

  constructor(private fxRegisterService: FXRegisterService) {
    // this.form = fb.group({
    //   'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    //   'id': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    //   'position': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    //   'department': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    //   'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
    //   'passwords': fb.group({
    //     'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    //     'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    //   }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') }),
    // });
  }

  ngOnInit(): void {
    this.getSuperior();
    // this.getSuperiorDummy();
  }

  // onSubmit(values: Object): void {
  //   this.submitted = true;
  //   // if (this.form.valid) {
  //   //  } 
  //    // your code goes here
  //     //  console.log(values);

  //     this.mapData();
  //     this.mapJSON();
  //     //this.getPing();
  //     this.addNewEmployee();
  //   //}
  // }

  onSubmit(): void {
    this.submitted = true;
    // if (this.form.valid) {
    //  } 
     // your code goes here
      //  console.log(values);

      this.mapData();
      this.mapJSON();
      //this.getPing();
      this.addNewEmployee();
    //}
  }

  private getSuperior() {
    this.fxRegisterService.getSuperior(this.userid).subscribe(
      datax => {
        this.superiorList = [];
        datax.employees.forEach(data => {
          
          const value = new FXRegister();
          value.activeStatus = data.activeStatus;
          value.departmentName = data.departmentName;
          value.employeeID = data.employeeID;
          value.lastActivity = data.lastActivity;
          value.positionName = data.positionName;
          value.userID = data.userID;
          value.userName = data.userName;
          // a.push(value);
          this.superiorList.push(value);
          // console.log(this.superiorList);
        });
        // this.superiorList = a;
      },
      errors => {
// console.log(errors);
      });
      // const x = this.superiorList;
  }

//   superiorListx:any;
//   private getSuperiorDummy() {
//       this.superiorListx =[{
//         userName: 'asdasdsa',
//         userID: 1,
//       }];
       
// }

  private mapData() {
    this.fxRegister = new FXRegister();
    this.fxRegister.clientID = 1;
     this.fxRegister.userName = this.name;
    this.fxRegister.employeeID = this.employeeID;
    this.fxRegister.positionName = this.position;
    this.fxRegister.departmentName = this.department;
    this.fxRegister.superiorID = -1;
    this.fxRegister.email = this.email;
    this.password !== this.cPassword ? this.isAddEmployee = false : this.fxRegister.userPassword = this.password;
    this.fxRegister.activeStart = this.activeDate;
    this.fxRegister.activeEnd = this.endDate;
    this.fxRegister.entryUser = 1;

    this.fxRegister.clientID = 1;
    this.fxRegister.userName = 'asdssf';
    this.fxRegister.employeeID = 'riyalnfeasdrsssss';
    this.fxRegister.positionName = 'asdf';
    this.fxRegister.departmentName = 'asdf';
    this.fxRegister.superiorID = -1;
    this.fxRegister.email = 'asdf@asdf.com';
    this.fxRegister.userPassword = 'asdfasdf';
    this.fxRegister.activeStart = '2017-01-01 09:00:00';
    this.fxRegister.activeEnd = '2017-01-31 09:00:00';
    this.fxRegister.entryUser = 1;
  }

  private mapJSON() {
    const data = {
      'clientID': this.fxRegister.clientID,
      'employeeID': this.fxRegister.employeeID,
      'userName': this.fxRegister.userName,
      'positionName': this.fxRegister.positionName,
      'departmentName': this.fxRegister.departmentName,
      'superiorID': this.fxRegister.superiorID,
      'email': this.fxRegister.email,
      'userPassword': this.fxRegister.userPassword,
      'activeStart': this.fxRegister.activeStart,
      'activeEnd': this.fxRegister.activeEnd,
      'entryUser': this.fxRegister.entryUser,
    };
    this.data = data;
  }

  private getPing() {
    this.fxRegisterService.getPing().subscribe();
  }
  private addNewEmployee() {

    this.fxRegisterService.addEmployee(this.data).subscribe(
      data => {
        this.isAddEmployee = true;
      },
      errors => {
        this.isAddEmployee = false;
      });
  }
}

