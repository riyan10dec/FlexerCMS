import { Component, OnInit } from '@angular/core';
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

  // superiorList: FXRegister[] = [];
  superiorList: any;
  form: FormGroup;
  name: AbstractControl;
  id: AbstractControl;
  position: AbstractControl;
  department: AbstractControl;
  email: AbstractControl;
  superior: AbstractControl;
  password: AbstractControl;
  repeatPassword: AbstractControl;
  passwords: FormGroup;
  fxRegister: FXRegister;
  submitted: boolean = false;
  isAddEmployee: boolean = false;
  userid: number = 2;
  data: any;

  constructor(fb: FormBuilder, private fxRegisterService: FXRegisterService) {
    // this.ngOnInit();
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'id': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'position': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'department': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') }),
    });
    
    // this.getSuperior();
  }

  ngOnInit(): void {
    this.getSuperior();
  }

  onSubmit(values: Object): void {
    this.submitted = true;
    //if (this.form.valid) {
      // your code goes here
      //  console.log(values);

      this.mapData();
      this.mapJSON();
      //this.getPing();
      this.addNewEmployee();
    //}
  }

  private getSuperior() {
         this.superiorList = [];
         
    this.fxRegisterService.getSuperior(this.userid).subscribe(
      data => {
      
        // let a: any = [];  
        data.employees.forEach(data => {
          
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
        });
        // this.superiorList = a;
      },
      errors => {
// console.log(errors);
      });
      // const x = this.superiorList;
  }

  private mapData() {
    this.fxRegister = new FXRegister();
    this.fxRegister.clientID = 1;
    this.fxRegister.userName =this.form.get('name').value;
    this.fxRegister.employeeID = this.form.get('id').value;
    //  this.form.controls['id'].value;
    this.fxRegister.positionName = this.form.controls['position'].value;
    this.fxRegister.departmentName = this.form.controls['department'].value;
    this.fxRegister.superiorID = -1;
    this.fxRegister.email = this.form.controls['email'].value;
    this.fxRegister.passwords = <FormGroup>this.form.controls['passwords'];
    this.fxRegister.userPassword = this.fxRegister.passwords.controls['password'].value;
    // this.fxRegister.activeStart = this.fxRegister.activeStart['activestart'].value;
    // this.fxRegister.activeEnd = this.fxRegister.activeEnd['activeend'].value;
    this.fxRegister.entryUser = 1;

    this.fxRegister.clientID = 1;
    this.fxRegister.superiorID = -1;
    this.fxRegister.entryUser = 1;
    this.fxRegister.userName = 'asdssf';
    this.fxRegister.employeeID = 'riyalnfersssss';
    this.fxRegister.positionName = 'asdf';
    this.fxRegister.departmentName = 'asdf';
    this.fxRegister.email = 'asdf@asdf.com';
    this.fxRegister.userPassword = 'asdfasdf';
    this.fxRegister.activeStart = '2017-01-01 09:00:00';
    this.fxRegister.activeEnd = '2017-01-31 09:00:00';
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
