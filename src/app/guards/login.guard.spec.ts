import { TestBed } from "@angular/core/testing";
import { LoginGuard } from "./login.guard";

describe('LoginGuard', () => {
  let loginGuard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard],
    });

    loginGuard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(loginGuard).toBeTruthy();
  });

  it('should call canActivate', () => {
    spyOn(loginGuard, 'canActivate');
    loginGuard.canActivate();
    expect(loginGuard.canActivate).toHaveBeenCalled();
  });
});