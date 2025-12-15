/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TIMEATTACK_CONTRACT_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
