import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { QueryParams } from '../types/query-params';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiResourceService<T> {

  /** API URL */
  protected readonly _url: string = environment.api.url;

  /** Resource endpoint */
  protected abstract readonly _endpoint: string;

  /** HttpClient options */
  protected readonly _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  protected constructor(
    protected _http: HttpClient,
  ) { }

  /**
   * Create a resource
   * @param resource Resource to create
   */
  public create(resource: T): Observable<T> {
    return this._http.post<T>(this._fullUrl, resource, this._httpOptions);
  }

  /**
   * Retrieve a resource
   * @param id Resource identifier
   */
  public read(id: number): Observable<T> {
    const options = this._paramsToOptions({ id: id });
    return this._http.get<T>(this._fullUrl, options);
  }

  /**
   * Retrieves a list of resources
   * @param filters Filters to apply to the list of resources
   */
  public list(filters?: QueryParams): Observable<T[]> {

    const options = filters
      ? this._paramsToOptions(filters)
      : this._httpOptions;

    return this._http.get<T[]>(this._fullUrl, options);
  }

  /**
   * Update a resource
   * @param id Resource identifier
   * @param resource Resource to update
   */
  public update(id: number, resource: T): Observable<T> {
    const options = this._paramsToOptions({ id: id });
    return this._http.put<T>(this._fullUrl, resource, options);
  }

  /**
   * Delete a resource
   * @param id Resource identifier
   */
  public delete(id: number): Observable<T> {
    const options = this._paramsToOptions({ id: id });
    return this._http.delete<T>(this._fullUrl, options);
  }

  /**
   * Merge query params to the current HttpClient options
   * @param params Query parameters
   */
  protected _paramsToOptions(params: QueryParams) {
    const httpParams = new HttpParams();

    for (const key in params) {
      httpParams.append(key, params[key]);
    }

    return Object.assign({}, this._httpOptions, {params: httpParams});
  }

  /**
   * Return the full URL
   */
  protected get _fullUrl(): string {
    return this._url + this._endpoint;
  }
}
