import { ConnectionAPI } from '../../environments/connectionAPI';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private jwtService: JwtService,
    
  ) { }
  private hostname: string= ConnectionAPI.getHost();

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    // if (this.jwtService.getToken()) {
    //   // headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    //   headersConfig['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDM0OTc1NjcsIm5hbWUiOiI0MiJ9.Iel55A2wimkJ5uQGT-jI4gAEgxH9NxfdwIxl6JqG3ro`;
    // }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${ConnectionAPI}${path}`, { headers: this.setHeaders(), search: params })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${ConnectionAPI}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() },
    )
      .map((res: Response) => res.json())
      .catch(this.formatErrors);
  }

  post(path: string, body: Object = {}): Observable<any> {
      return   this.http.post(
          // 'http://35.186.145.215:2345/cms/addEmployee1',
          this.hostname + `${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() },
    )
      .map((res: Response) => res.json())
      .catch(this.formatErrors);
      
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${ConnectionAPI}${path}`,
      { headers: this.setHeaders() },
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());

  }
}
