
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionAPI {
     static getHost(): string {
        return 'http://35.186.145.215:2345';
    }
}
