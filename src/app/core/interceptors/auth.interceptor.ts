import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtStorageService} from '../services/storage/jwt-storage.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _jwtStorageService: JwtStorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authRequest = request;
    const jwt = this._jwtStorageService.get();

    if(request.url.startsWith(environment.api.url) && jwt) {
      authRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + jwt.token)
      });
    }

    return next.handle(authRequest);
  }
}
