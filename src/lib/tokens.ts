import { Token } from './types';

// Popular Solana tokens for swapping
export const TOKENS: Record<string, Token> = {
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    mint: 'So11111111111111111111111111111111111111112', // Wrapped SOL
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg'
  },
  JUP: {
    symbol: 'JUP',
    name: 'Jupiter',
    mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    decimals: 6,
    logoURI: 'https://static.jup.ag/jup/icon.png'
  },
  RAY: {
    symbol: 'RAY',
    name: 'Raydium',
    mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    decimals: 6,
    logoURI: 'https://raydium.io/logo/raydium-logo.svg'
  }
};

// Default swap pairs
export const DEFAULT_INPUT_TOKEN = TOKENS.SOL;
export const DEFAULT_OUTPUT_TOKEN = TOKENS.USDC;

// Get token by mint address
export function getTokenByMint(mint: string): Token | undefined {
  return Object.values(TOKENS).find(token => token.mint === mint);
}

// Get token by symbol
export function getTokenBySymbol(symbol: string): Token | undefined {
  return TOKENS[symbol.toUpperCase()];
}

// Convert token amount to lamports (considering decimals)
export function toTokenAmount(amount: number, decimals: number): number {
  return Math.floor(amount * Math.pow(10, decimals));
}

// Convert lamports to token amount (considering decimals)
export function fromTokenAmount(lamports: number, decimals: number): number {
  return lamports / Math.pow(10, decimals);
} 