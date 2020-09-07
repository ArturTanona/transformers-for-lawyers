import { TestBed } from '@angular/core/testing';

import { DocumentViewService } from './document-view.service';

describe('DocumentViewService', () => {
  let service: DocumentViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
