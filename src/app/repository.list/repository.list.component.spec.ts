import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryListComponent } from './repository.list.component';
import { RepositoryService } from '../repository.service';
import { Repository } from '../model/repository';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let repositoryListService: RepositoryService;
  let testData: Repository[] = [
    new Repository("Test Project",
            "http://www.test.com/test",
            "Just a test project",
            100,
            200)
  ];
  let errorObservable = new Observable(subscriber => {
    subscriber.error("Some error!!!");
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryListComponent],
      providers: [RepositoryService],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    repositoryListService = TestBed.get(RepositoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#repo-list-container')).toBeTruthy();  
  });

  it('shows list of github projects for Google when there is any', () => {
    spyOn(repositoryListService, 'getProjectList').and.returnValue(of(testData));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.projectList).toEqual(testData);
  });

  it('shows nothing when there is an error', () => {
    spyOn(repositoryListService, 'getProjectList').and.returnValue(new Observable(subscriber => {
      subscriber.error("Some error!!!");
    }));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.projectList).toBeNull();
  });

  // Extended cases ...
  it('ngOnInit should add subscriptions', () => {
    spyOn(repositoryListService, 'getProjectList').and.returnValue(of(testData));
    spyOn(component.subscription, 'add');

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.subscription.add).toHaveBeenCalled();
  });

  it('ngOnDestroy should remove subscriptions', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();
    fixture.detectChanges();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });  
});