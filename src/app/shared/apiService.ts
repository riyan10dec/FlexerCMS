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
    // const headersConfig = {
    //   'Content-Type' : 'text/plain',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDM3NTc4NTIsIm5hbWUiOiI5MyJ9.mSro0V7-jrFKYV3yrdbCRaYqeUG7f3WzSC4EdbbG9ms'
    // };
    let header: Headers = new Headers();
    const token = 'asd';
    header.append('Content-Type', 'text/plain');
    header.append('Accept', 'application/json');
    header.append('Authorization', 'Bearer '+ token);
    header.append('Access-Control-Allow-Headers', 'Content-Type');
    return new Headers(header);
  }

  private formatErrors(error: any) { 
    return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    let header: Headers = new Headers();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDM3NTc4NTIsIm5hbWUiOiI5MyJ9.mSro0V7-jrFKYV3yrdbCRaYqeUG7f3WzSC4EdbbG9ms';
    header.append('Content-Type', 'text/plain');
    header.append('Accept', 'application/json');
    header.append('Authorization', 'Bearer '+ token);
    return this.http.get(`${this.hostname}${path}`,{headers: header})
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.hostname}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() },
    )
      .map((res: Response) => res.json())
      .catch(this.formatErrors);
  }

  post(path: string, body: Object = {}): Observable<any> {
      return this.http.post(
        `${this.hostname}${path}`,
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
