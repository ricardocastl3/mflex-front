declare namespace NodeJS {
  interface ProcessEnv {
    MFLEX_PUBLIC_ECDSA_KEY: string;
    MFLEX_NEXT_API_TOKEN: string;
    MFLEX_NEXT_PUBLIC_URL: string;
    MFLEX_SERVER_URL: string;
    MFLEX_SERVER_TOKEN: string;
    MFLEX_STREAMIN_SERVER_URL: string;
    MFLEX_STREAMING_SERVER_TOKEN: string;

    VAPID_PUBLIC_KEY: string;
  }
}
