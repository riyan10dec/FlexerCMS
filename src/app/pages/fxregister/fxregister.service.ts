import { ApiService } from '../../shared/apiService';
import { Observable } from 'rxjs/Rx';
import { FXRegister } from './fxregister';
import { Injectable } from '@angular/core';

@Injectable()
export class FXRegisterService {
    constructor(private apiService: ApiService) { }

    // private hostname: string=this.apiService.getMessages();
    private getEmployeeQuery: string = '/cms/getEmployee/@0';
    // private addEmployeeQuery: string = '/cms/addEmployee';
    private addEmployeeQuery: string = '/cms/addEmployee1';
    private editEmployeeQuery: string = '/cms/editEmployee';
    // private getInitialTreeQuery: string = '/cms/initialTree/@0';
    // private getChildQuery: string = '/cms/childTree/@0/@1';

    // getEmployee(clientid: string): Observable<Employee> {
    //     return this.apiService.get(this.getEmployeeQuery.replace('@0', clientid))
    //         .map((data: {employee: Employee}) => data.employee);
    // }
    addEmployee(payload): Observable<any> {
        return this.apiService.post(this.addEmployeeQuery, JSON.stringify(payload)).map(data =>
            data);
    }
    // editEmployee(payload): any {
    //     return this.apiService.post(this.editEmployeeQuery, 
    //         {
    //             data : payload,
    //         }).map(data => data.result);
    // }
    // getInitialTree(clientid: string): Observable<any> {
    //     return this.apiService.get(this.getInitialTreeQuery.replace('@0', clientid))
    //         .map(r => r.json());
    // }
    // getChild(clientid: string, userid: number): Observable<any> {
    //     return this.apiService.get(this.getChildQuery.replace('@0', clientid).replace('@1', userid.toString()))
    //         .map(r => r.json());
    // }
    // moveNode(payload): any {
    //     // return this.apiService.post(this.moveNodeQuery, 
    //     //     {
    //     //         data : payload,
    //     //     }).map(data => data.result);
    // }
}
