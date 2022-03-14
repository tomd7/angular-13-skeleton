export enum Time {

  /** 1 Second in milliseconds */
  SEC = 1000,

  /** 1 Minute in milliseconds */
  MIN = 60000,

  /** 1 Hour in milliseconds */
  HOUR = 3600000,

  /** 1 Day in milliseconds */
  DAY = 86400000,

  /** 1 Month in milliseconds */
  MONTH = Time.DAY * 30,

  /** 1 Year in milliseconds */
  YEAR = Time.DAY * 365
}
