import { Time } from '../enums/time';

export class Jwt {

  protected _token: string;
  protected _expiration: number;
  protected _refreshToken: string;
  protected _refreshExpiration: number;

  constructor(
    token: string,
    refreshToken: string,
    expiration?: number,
    refreshExpiration?: number,
  ) {
    this._token = token;
    this._refreshToken = refreshToken;

    this._expiration = expiration
      ? expiration
      : this._parseExpiration(token);

    this._refreshExpiration = refreshExpiration
      ? refreshExpiration
      : Date.now() + Time.MONTH;
  }

  /**
   * Parse the JWT payload
   * @param jwt JWT as string
   */
  protected _parsePayload(jwt: string): any {
    const payloadBase64 = jwt.split('.')[1];
    const payloadStr = atob(payloadBase64);
    return JSON.parse(payloadStr);
  }

  /**
   * Parse the JWT expiration
   * @param jwt JWT as string
   */
  protected _parseExpiration(jwt: string): number {
    const payload = this._parsePayload(jwt);
    return isNaN(payload.exp) ? 0 : payload.exp * 1000;
  }

  public get token(): string {
    return this._token;
  }

  public get expiration(): number {
    return this._expiration;
  }

  public get refreshToken(): string {
    return this._refreshToken;
  }

  public get refreshExpiration(): number {
    return this._refreshExpiration;
  }

  /** Tells if the JWT is expired */
  public get isExpired(): boolean {
    return this.expiration <= Date.now();
  }

  /** Tells if the refresh token is expired */
  public get isRefreshExpired(): boolean {
    return this.refreshExpiration <= Date.now();
  }
}
