import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from '../Repository';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  private url: string = 'https://api.github.com/orgs/bosch-io/repos';
  constructor(private http: HttpClient) {}

  // Fetch all repositories from the api
  getRepos(): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.url);
  }
}
