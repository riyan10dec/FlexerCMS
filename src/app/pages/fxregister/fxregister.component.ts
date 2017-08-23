import { Component } from '@angular/core';
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
export class FXRegisterComponent {

  public form: FormGroup;
  public name: AbstractControl;
  public id: AbstractControl;
  public position: AbstractControl;
  public department: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  public fxRegister: FXRegister;
  public submitted: boolean = false;
  public isAddEmployee: boolean = false;

  constructor(fb: FormBuilder, private fxRegisterService: FXRegisterService) {

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
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    // if (this.form.valid) {
      // your code goes here
      //  console.log(values);

      this.mapData();
      this.addNewEmployee();
    // }
  }

  private mapData() {
    this.fxRegister = new FXRegister();
    this.fxRegister.clientID = 1;
    this.fxRegister.userName = this.form.controls['name'].value;
    this.fxRegister.employeeID = this.form.controls['id'].value;
    this.fxRegister.positionName = this.form.controls['position'].value;
    this.fxRegister.departmentName = this.form.controls['department'].value;
    this.fxRegister.superiorID = -1;
    this.fxRegister.email = this.form.controls['email'].value;
    this.fxRegister.passwords = <FormGroup>this.form.controls['passwords'];
    this.fxRegister.userPassword = this.fxRegister.passwords.controls['password'].value;
    this.fxRegister.activeStart = '2017-01-01 09:00:00';
    this.fxRegister.activeEnd = '2017-01-01 09:00:00';
    this.fxRegister.entryUser = 1;

    this.fxRegister.userName = 'asdf';
    this.fxRegister.employeeID = 'riyan ferbatang';
    this.fxRegister.positionName = 'asdf';
    this.fxRegister.departmentName = 'asdf';
    this.fxRegister.email = 'asdf@asdf.com';
    this.fxRegister.userPassword = 'asdfasdf';
  }

  private addNewEmployee() {
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
    this.fxRegisterService.addEmployee(data).subscribe(
      result => {
        this.isAddEmployee = true;
      },
      errors => {
        this.isAddEmployee = false;
      });
  }
}
