import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {
  dataSource = [
    {
      name: 'asdasd',
      description: 'asdasd',
      language: 'asdasda',
      stargazers: 3,
      url: 'asdasd',
    },
  ];

  // Table columns
  displayedColumns: string[] = [
    'name',
    'description',
    'language',
    'stargazers',
    'url',
  ];
  constructor() {}

  ngOnInit(): void {}
}
