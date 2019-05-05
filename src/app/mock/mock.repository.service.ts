import { Repository } from "../model/repository";
import { RepositoryService } from '../repository.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class MockRepositoryService extends RepositoryService {
    constructor(http: HttpClient = null) {
      super(http);
    }
  
    testData: Repository[] = [
      new Repository("Test Project",
              "http://www.test.com/test",
              "Just a test project",
              100,
              200)
    ];
  
    getProjectList(): Observable<any> {
      return of(this.testData);
    }   
  }