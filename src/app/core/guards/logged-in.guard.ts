import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {JwtStorageService} from '../services/storage/jwt-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _jwtStorageService: JwtStorageService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const jwt = this._jwtStorageService.get();

    // Log the user out if none of the tokens are valid
    if (jwt) {
      if (jwt.isExpired) {
        if (jwt.isRefreshExpired) {
          this._authService.logout();
        } else {
          this._authService.refreshToken().subscribe();
        }
      } else {
        this._authService.setRefreshTimeout();
      }
    } else {
      this._authService.logout();
    }

    return this._authService.isLoggedIn$.pipe(
      map(loggedIn => {
        if (!loggedIn) {
          this._router.navigateByUrl('/signin');
        }
        return loggedIn;
      })
    );
  }

}
