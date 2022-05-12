import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  /** Contains cached HTTP responses */
  private _cache: Map<any, HttpResponse<any>> = new Map();

  /**
   * Retrieve a cached response from its key
   * @param key Key corresponding to the response
   */
  public get(key: any) {
    return this._cache.get(key);
  }

  /**
   * Save a response in the cache
   * @param key Key of the response
   * @param response Response to save in the cache
   */
  public save(key: any, response: HttpResponse<any>) {
    this._cache.set(key, response);
  }

  /** Clear the cache */
  public clear() {
    this._cache.clear();
  }
}
