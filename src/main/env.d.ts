/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly MAIN_VITE_APP_DB_PATH: string
    readonly MAIN_VITE_APP_DB_PATH_PACKAGED: string
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}