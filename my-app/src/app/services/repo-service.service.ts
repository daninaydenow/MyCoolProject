import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  private url: string = 'https://api.github.com/orgs/bosch-io/repos';
  constructor(private http: HttpClient) {}

  getRepos(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
