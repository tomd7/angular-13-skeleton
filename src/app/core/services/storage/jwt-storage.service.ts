import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { LocalStorageKey } from '../../enums/local-storage-key';
import { Jwt } from '../../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService extends TokenStorageService {

  protected readonly _keyToken: LocalStorageKey = LocalStorageKey.JWT;
  protected readonly _keyExpiration: LocalStorageKey = LocalStorageKey.JWT_EXPIRATION;
  protected readonly _keyRefreshToken: LocalStorageKey = LocalStorageKey.REFRESH_TOKEN;
  protected readonly _keyRefreshExpiration: LocalStorageKey = LocalStorageKey.REFRESH_EXPIRATION;

  /**
   * Save a JWT in the local storage
   * @param token Token object to be saved
   */
  public override save(token: Jwt): void {
    super.save(token);
    localStorage.setItem(this._keyRefreshToken, token.refreshToken);
    localStorage.setItem(this._keyRefreshExpiration, String(token.refreshExpiration));
  }

  /**
   * Retrieve the stored JWT
   */
  public override get(): Jwt | undefined {
    const token = super.get();
    const refreshToken = localStorage.getItem(this._keyRefreshToken);
    const refreshExpiration = localStorage.getItem(this._keyRefreshExpiration);

    if (!token || !refreshToken || !refreshExpiration) {
      return undefined;
    }

    return new Jwt(
      token.token,
      refreshToken,
      token.expiration,
      Number(refreshExpiration)
    );
  }

  /**
   * Clear the stored JWT
   */
  public override clear(): void {
    super.clear();
    localStorage.removeItem(this._keyRefreshToken);
    localStorage.removeItem(this._keyRefreshExpiration);
  }
}
