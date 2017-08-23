import { FormGroup } from '@angular/forms';

export class FXRegister {
    clientID: number;
    userName: string;
    employeeID: string;
    positionName: string;
    departmentName: string;
    superiorID:number;
    email: string;
    passwords: FormGroup;
    userPassword: string;
    activeStart: string;
    activeEnd: string;
    entryUser: number;
}
