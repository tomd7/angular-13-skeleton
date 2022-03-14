export enum LocalStorageKey {

  /** Key corresponding to the JSON Web Token */
  JWT = 'jwt',

  /** Key corresponding to the JSON Web Token Expiration */
  JWT_EXPIRATION = 'jwt-expiration',

  /** Key corresponding to the token used to refresh the JWT */
  REFRESH_TOKEN = 'refresh-token',

  /** Key corresponding to the refresh Token Expiration */
  REFRESH_EXPIRATION = 'refresh-expiration',

  /** Key corresponding to the current session data */
  SESSION = 'session',

  /** Key corresponding to the user that is logged in */
  USER = 'session-user',

  /** Key corresponding to the user preferences */
  PREFERENCES = 'user-preferences',

  /** Key corresponding to the user theme preference */
  THEME = 'theme',

}
