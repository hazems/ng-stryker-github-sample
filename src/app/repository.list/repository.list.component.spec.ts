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
  });

  it('shows list of github projects for Google when there is any', () => {
    let getRepoList = spyOn(repositoryListService, 'getProjectList').and.returnValue(
      of(testData)
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.projectList).toEqual(testData);
  });

  it('shows nothing when there is an error', () => {
    let getRepoList = spyOn(repositoryListService, 'getProjectList').and.returnValue(
        new Observable(subscriber => {
          subscriber.error("Some error!!!");
        })
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.projectList).not.toBeTruthy();
  });
});