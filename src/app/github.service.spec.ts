import { TestBed } from '@angular/core/testing';

import { GitHubService } from './github.service';
import { HttpClientModule } from '@angular/common/http';

describe('GithubService', () => {
  let service: GitHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GitHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
