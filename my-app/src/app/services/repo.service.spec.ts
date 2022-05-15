import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RepoService } from './repo.service';
import { HttpClient } from '@angular/common/http';
import { Repository } from '../Repository';

describe('RepoService', () => {
  let repoService: RepoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [RepoService],
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    repoService = TestBed.inject(RepoService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(repoService).toBeTruthy();
  });

  describe('repoService tests', () => {
    let expectedRepos: Repository[];

    beforeEach(() => {
      repoService = TestBed.inject(RepoService);
      expectedRepos = [
        {
          description:
            'A XMPP server licensed under the Open Source Apache License.',
          html_url: 'https://github.com/bosch-io/Openfire',
          language: 'Java',
          name: 'openfire',
          stargazers_count: 1,
        },
        {
          description:
            "Wakaama (formerly liblwm2m) is an implementation of the Open Mobile Alliance's LightWeight M2M protocol (LWM2M).",
          html_url: 'https://github.com/bosch-io/wakaama',
          language: 'C',
          name: 'wakaama',
          stargazers_count: 1,
        },
      ] as Repository[];
    });

    it('should return expected repos (called once)', () => {
      const reposUrl = 'https://api.github.com/orgs/bosch-io/repos';
      repoService.getRepos().subscribe({
        next: (repos) =>
          expect(repos)
            .withContext('should return expected repos')
            .toEqual(expectedRepos),
        error: fail,
      });

      // RepoService should have made one request to GET repos from expected URL
      const req = httpTestingController.expectOne(reposUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock repos
      req.flush(expectedRepos);
    });

    it('should be OK returning no repos', () => {
      const reposUrl = 'https://api.github.com/orgs/bosch-io/repos';
      repoService.getRepos().subscribe({
        next: (repos) =>
          expect(repos.length)
            .withContext('should have empty repos array')
            .toEqual(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(reposUrl);
      req.flush([]); // Respond with no repos
    });
  });
});
