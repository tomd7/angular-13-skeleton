import {Injectable} from '@angular/core';
import {LocalStorageKey} from '../../enums/local-storage-key';
import {Token} from '../../types/token';
import {IStorage} from '../../interfaces/i-storage';

@Injectable({
  providedIn: 'root'
})
export abstract class TokenStorageService implements IStorage {

  /** Key for the token */
  protected abstract readonly _keyToken: LocalStorageKey;

  /** Key for the token expiration */
  protected abstract readonly _keyExpiration: LocalStorageKey;

  /**
   * Save a token in the local storage
   * @param token The token to store
   */
  public save(token: Token): void {
    this._token = token.token;
    this._expiration = token.expiration;
  }

  /**
   * Retrieve the saved token
   */
  public get(): Token | undefined {
    const token = this._token;
    const expiration = this._expiration;

    if (!token || !expiration) {
      return undefined;
    }

    return {token, expiration};
  }

  /**
   * Clear the saved token
   */
  public clear(): void {
    localStorage.removeItem(this._keyToken);
    localStorage.removeItem(this._keyExpiration);
  }

  /**
   * Retrieve the token string from local storage
   */
  protected get _token(): string | undefined {
    return localStorage.getItem(this._keyToken) ?? undefined;
  }

  /**
   * Set the token in the local storage
   * @param value The token to store
   */
  protected set _token(value: string | undefined) {
    if (value) {
      localStorage.setItem(this._keyToken, value);
    } else {
      localStorage.removeItem(this._keyToken);
    }
  }

  /**
   * Retrieve the token expiration
   */
  protected get expiration(): number {
    const value = localStorage.getItem(this._keyExpiration);
    const expiration = Number(value);
    return isNaN(expiration) ? 0 : expiration;
  }

  /**
   * Set the token expiration in the local storage
   * @param value The token expiration
   */
  protected set _expiration(value: number) {
    localStorage.setItem(this._keyExpiration, String(value));
  }

}
