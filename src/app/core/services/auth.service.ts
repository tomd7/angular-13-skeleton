import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {JwtStorageService} from './storage/jwt-storage.service';
import {IUser} from '../interfaces/i-user';
import {ApiResourceService} from './api-resource.service';
import {UserStorageService} from './storage/user-storage.service';
import {LoginResponse} from '../types/login-response';
import {UserRole} from '../enums/user-role';
import {Jwt} from '../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiResourceService<IUser> {

  /** Authentication endpoint */
  protected readonly _endpoint: string = '/auth';

  /** Current user profile endpoint */
  private readonly _userEndpoint: string = this._endpoint + '/user';

  /** Reset password endpoint */
  private readonly _resetPasswordEndpoint: string = this._endpoint + '/reset_password';

  /** Refresh token endpoint */
  private readonly _refreshEndpoint: string = this._endpoint + '/refresh';

  /** User login state */
  public readonly isLoggedIn$: Observable<boolean>;
  private readonly _loginState: BehaviorSubject<boolean>;

  /** Refresh token timeout */
  private _timeout?: number;

  constructor(
    protected override _http: HttpClient,
    private _jwtStorageService: JwtStorageService,
    private _userStorageService: UserStorageService,
  ) {
    super(_http);
    this._loginState = new BehaviorSubject<boolean>(false);
    this.isLoggedIn$ = this._loginState.asObservable();
  }

  /** Log the user in */
  public login(email: string, password: string): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(this._fullUrl, {email, password}, this._httpOptions)
      .pipe(
        tap(response => this._setLoggedIn(response))
      );
  }

  /** Refresh the JWT */
  public refreshToken() {
    const url = this._url + this._refreshEndpoint;
    const body = { refresh_token: this._jwtStorageService.get()?.refreshToken };

    return this._http.post<LoginResponse>(url, body, this._httpOptions)
      .pipe(
        tap(response => this._setLoggedIn(response))
      );
  }

  /** Reset user password */
  public resetPasswordRequest(email: string) {
    const url = this._url + this._resetPasswordEndpoint;
    const options = this._paramsToOptions({ email: email });
    return this._http.get(url, options);
  }

  /** Request user password reset */
  public resetPassword(password: string, passwordConfirm: string) {
    const url = this._url + this._resetPasswordEndpoint;
    const body = {password, passwordConfirm};
    return this._http.post(url, body, this._httpOptions);
  }

  /** Log the user out */
  public logout() {
    this._loginState.next(false);
    this._jwtStorageService.clear();
    this._userStorageService.clear();

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  /**
   * Refresh the JWT 5 minutes before its expiration
   */
  public setRefreshTimeout(): void {

    const jwt = this._jwtStorageService.get();

    if (jwt) {

      const expiration = new Date(jwt.expiration * 1000);
      expiration.setMinutes(expiration.getMinutes() - 5);
      const diff = expiration.getTime() - Date.now();

      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      this._timeout = window.setTimeout(this._onRefreshTimeout.bind(this), diff);
    }
  }

  private _onRefreshTimeout() {
    const jwt = this._jwtStorageService.get();

    if (!jwt || jwt.isExpired) {
      this.logout();
    } else {
      this.refreshToken().subscribe();
    }
  }

  /** Retrieve the profile of the logged-in user */
  private _getUserProfile(): Observable<IUser> {
    const url = this._url + this._userEndpoint;
    return this._http.get<IUser>(url);
  }

  /** Change the user login state and save its data */
  private _setLoggedIn(response: LoginResponse) {

    // Change user login state
    this._loginState.next(true);

    // Store the JWT
    const jwt = new Jwt(response.token, response.refresh_token);
    this._jwtStorageService.save(jwt);

    this.setRefreshTimeout();

    // Retrieve logged in user profile
    this._getUserProfile()
      .subscribe(user => this._userStorageService.save(user));
  }

  /** Tells if the user is an administrator */
  public get isAdmin(): boolean {
    const user = this._userStorageService.get();
    return user ? user.roles.includes(UserRole.ADMIN) : false;
  }
}
