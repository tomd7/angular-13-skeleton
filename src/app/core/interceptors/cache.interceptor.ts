import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {CacheService} from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private _cacheService: CacheService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Only cache response for GET requests
    if (request.method !== "GET") {
      return next.handle(request);
    }

    // Retrieve the cached response
    const cachedResponse = this._cacheService.get(request.urlWithParams);

    if (cachedResponse) {
      // Return the cached response
      return of(cachedResponse);
    }

    // Cache the response
    return next.handle(request).pipe(
      tap(response => {
        if (response instanceof HttpResponse) {
          this._cacheService.save(request.urlWithParams, response);
        }
      })
    );
  }
}
