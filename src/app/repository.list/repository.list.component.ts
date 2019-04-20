import { Component, OnInit } from '@angular/core';
import { Repository } from '../model/repository';
import { RepositoryService } from '../repository.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository.list.component.html',
  styleUrls: ['./repository.list.component.css']
})
export class RepositoryListComponent implements OnInit {
  constructor(private repositoryService:RepositoryService) { }

  subscription = new Subscription();
  projectList: Repository[];

  ngOnInit() {
    this.subscription.add(this.repositoryService.getProjectList().subscribe(
        projectList => this.onSuccess(projectList),
        error => this.onError(error)
    )); 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSuccess(projectList) {
    this.projectList = projectList;
  }

  onError(error): void {
    this.projectList = null;
  }
}