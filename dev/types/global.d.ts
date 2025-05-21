interface CookieStore {
  get(name: string): Promise<{ value: string } | undefined>;
  set(options: {
    name: string;
    value: string;
    path?: string;
    expires?: number;
  }): Promise<void>;
}

// global.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // define environment variables
      DB_URI: string;
    }
  }
  interface Window {
    cookieStore: CookieStore;
  }

  // outside NodeJS namesepace
  // eslint-disable-next-line no-var
  var isMongoConnected: boolean;
}
export {};
