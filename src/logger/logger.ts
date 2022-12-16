export interface Logger {
  id: string,
  info(objectOrMessage: object | string, message?: string): void,
  error(objectOrMessage: object | string, message?: string): void,
  warn(objectOrMessage: object | string, message?: string): void,
  debug(objectOrMessage: object | string, message?: string): void
}
