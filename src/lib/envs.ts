export const env = {
  contract: import.meta.env.VITE_DEPLOYED_ADDRESS as string,
  erc20: import.meta.env.VITE_ERC20_ADDRESS as string,
  rpc: import.meta.env.VITE_STRK_RPC as string,
  dev: import.meta.env.DEV,
};
