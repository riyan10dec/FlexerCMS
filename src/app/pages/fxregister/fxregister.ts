import { FormGroup } from '@angular/forms';

export class FXRegister {
    clientID: number;
    userID: number;
    userName: string;
    employeeID: string;
    positionName: string;
    departmentName: string;
    superiorID: number;
    email: string;
    passwords: FormGroup;
    userPassword: string;
    activeStart: string;
    activeEnd: string;
    activeStatus: string;
    entryUser: number;
    lastActivity: string;

    // constructor(key:number, value:string) {}
}
