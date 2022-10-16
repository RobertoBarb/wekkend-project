import { TestBed } from '@angular/core/testing';

import { VoteserviceService } from './voteservice.service';

describe('VoteserviceService', () => {
  let service: VoteserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
