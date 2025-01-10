declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGO_URI: string;
        COINGECKO_BASE_URL: string;
        COINGECKO_API_KEY: string;
      }
    }
  }
  
  // Make sure the file is treated as a module
  export {};
  