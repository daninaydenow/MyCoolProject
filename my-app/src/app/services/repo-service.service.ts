import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataGridItem } from '../components/data-grid/data-grid-datasource';

@Injectable({
  providedIn: 'root',
})
export class RepoServiceService {
  private url: string = 'https://api.github.com/orgs/bosch-io/repos';
  constructor(private http: HttpClient) {}

  getRepos(): Observable<DataGridItem[]> {
    return this.http.get<DataGridItem[]>(this.url);
  }
}
