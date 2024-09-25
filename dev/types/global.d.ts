// global.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // define environment variables
      DB_URI: string;
    }
  }

  // outside NodeJS namesepace
  // eslint-disable-next-line no-var
  var isMongoConnected: boolean;
}
export {};
