import { Component, OnInit } from '@angular/core';
import { Repository } from 'src/app/Repository';
import { RepoService } from 'src/app/services/repo-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  dataSource!: MatTableDataSource<Repository>;

  // Table columns header cell names
  displayedColumns: string[] = [
    'name',
    'description',
    'language',
    'stargazers',
    'url',
  ];
  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    // Fill the data grid on initialization
    this.getRepos();
  }

  // Process the response and assign repos to dataSource
  getRepos(): void {
    this.repoService
      .getRepos()
      .subscribe((repos) => (this.dataSource = new MatTableDataSource(repos)));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
