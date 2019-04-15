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

  private subscription = new Subscription();
  projectList: Repository[];

  ngOnInit() {
    this.subscription.add(this.repositoryService.getProjectList().subscribe(
        projectList => this.projectList = projectList,
        error => console.log(error)
    )); 
  }

  public ngOnDestroy(): void {
    console.log("unsubscribing ...")
    this.subscription.unsubscribe();
  }
}