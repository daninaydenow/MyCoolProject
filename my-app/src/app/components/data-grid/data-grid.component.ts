import { Component, OnInit } from '@angular/core';
import { Repository } from 'src/app/Repository';
import { RepoService } from 'src/app/services/repo-service.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  dataSource: Repository[] = [];

  // Table columns
  displayedColumns: string[] = [
    'name',
    'description',
    'language',
    'stargazers',
    'url',
  ];
  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    this.getRepos();
  }

  getRepos(): void {
    this.repoService.getRepos().subscribe((repos) => (this.dataSource = repos));
  }
}
