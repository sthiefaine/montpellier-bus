/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FLIXBUS_API_KEY: string;
  readonly VITE_FLIXBUS_STATION_ID: string;
  readonly VITE_BLABLABUS_API_KEY: string;
  readonly VITE_BLABLABUS_STATION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
