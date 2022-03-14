import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../../enums/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export abstract class StorageService<T> {

  /** Key corresponding to the data */
  protected abstract readonly _key: LocalStorageKey;

  /** Used to cache the data */
  protected data?: T;

  constructor() {
    this.data = this._load();
  }

  /** Save the data in the local storage */
  public save(data: T): void {
    this.data = data;
    localStorage.setItem(this._key, JSON.stringify(data));
  }

  public get(): T | undefined {
    return this.data;
  }

  /** Clear the data corresponding to the key */
  public clear(): void {
    this.data = undefined;
    localStorage.removeItem(this._key);
  }

  /** Retrieve the data from the local storage */
  private _load(): T | undefined {
    const data = localStorage.getItem(this._key);
    return data ? JSON.parse(data) : undefined;
  }

}
