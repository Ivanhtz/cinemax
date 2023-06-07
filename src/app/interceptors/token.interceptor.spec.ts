import { TestBed } from '@angular/core/testing';

import { Token } from './token.interceptor';

describe('Interceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Token
      ]
  }));

  it('should be created', () => {
    const interceptor: Token = TestBed.inject(Token);
    expect(interceptor).toBeTruthy();
  });
});
