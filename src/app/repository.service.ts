import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RepositoryService {
  constructor(private http: HttpClient) { }
  
  getProjectList(): Observable<any> {
    return this.http.get("https://api.github.com/users/google/repos")
                    .map(res => res)
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));                
  }
}