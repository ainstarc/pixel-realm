export class Logger {
  public static log(message: string, ...optionalParams: any[]) {
    console.log(`[Pixel Realm]: ${message}`, ...optionalParams);
  }

  public static error(message: string, ...optionalParams: any[]) {
    console.error(`[Pixel Realm ERROR]: ${message}`, ...optionalParams);
  }
}
