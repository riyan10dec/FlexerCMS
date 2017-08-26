import { FXDepartment } from './fxdepartment';
import { ApiService } from '../../shared/apiService';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class FXDepartmentService {
    constructor(private apiService: ApiService) { }

    private getDepartmentDataQuery: string = '/cms/GetAllDepartments/@0';

    getDepartmentData(payload): Observable<any> {
        return this.apiService.get(this.getDepartmentDataQuery.replace('@0', payload)).map(data =>
            data);
    }
}
