import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryListComponent } from './repository.list.component';
import { RepositoryService } from '../repository.service';
import { Repository } from '../model/repository';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// - Mocking by overriding functions
class MockRepositoryService extends RepositoryService {
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

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let mockRepositoryListService: MockRepositoryService = new MockRepositoryService();
  let errorObservable = new Observable(subscriber => {
    subscriber.error("Some error!!!");
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryListComponent],
      providers: [
        {provide: RepositoryService, useValue: mockRepositoryListService},
      ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(fixture.nativeElement.querySelector('#repo-list-container')).toBeTruthy();  
  }));

  it('ngOnInit should add subscriptions', async(() => {
    spyOn(component.subscription, 'add');
    component.ngOnInit();
    expect(component.subscription.add).toHaveBeenCalled();
  }));

  it('getProjectList should show list of Google projects when there is any', async(() => {
    component.ngOnInit();
    expect(component.projectList).toEqual(mockRepositoryListService.testData);
  }));

  it('getProjectList should show nothing when there is an error', async(() => {
    spyOn(mockRepositoryListService, 'getProjectList').and.returnValue(new Observable(subscriber => {
      subscriber.error("Some error!!!");
    }));
    component.ngOnInit();
    expect(component.projectList).toBeNull();
  }));

  it('ngOnDestroy should remove subscriptions', async(() => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  }));
});