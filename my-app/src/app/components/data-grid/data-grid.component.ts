import { Component, OnInit, ViewChild } from '@angular/core';
import { Repository } from 'src/app/Repository';
import { RepoService } from 'src/app/services/repo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  dataSource!: MatTableDataSource<Repository>;
  @ViewChild(MatSort) sort!: MatSort;

  // Table columns header cell names
  displayedColumns: string[] = [
    'name',
    'description',
    'language',
    'stargazers_count',
    'html_url',
  ];
  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    // Fill the data grid on initialization
    this.getRepos();
  }

  // Process the response and assign repos to dataSource
  getRepos(): void {
    this.repoService.getRepos().subscribe((repos) => {
      // Map repo name to lower case for correct client-side sorting
      let array = repos.map((item) => {
        return {
          name: item.name.toLocaleLowerCase(),
          description: item.description,
          language: item.language,
          stargazers_count: item.stargazers_count,
          html_url: item.html_url,
        };
      });

      this.dataSource = new MatTableDataSource(array);
      this.dataSource.sort = this.sort;
    });
  }

  // Filtering method
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
