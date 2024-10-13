export const env = {
  contract: import.meta.env.VITE_DEPLOYED_ADDRESS as string,
  rpc: import.meta.env.VITE_STRK_RPC as string,
  dev: import.meta.env.DEV,
};
