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
  },
  FARTCOIN: {
    symbol: 'FARTCOIN',
    name: 'Fartcoin',
    mint: '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',
    decimals: 6,
    logoURI: 'https://pump.fun/_next/image?url=https%3A%2F%2Fipfs.io%2Fipfs%2FQmU7ngdaLBhwVnMPjzEm6gXiYS2h87FHe2CX8YGjMqKLHE&w=256&q=75'
  },
  WIF: {
    symbol: 'WIF',
    name: 'dogwifhat',
    mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
    decimals: 6,
    logoURI: 'https://dd.dexscreener.com/ds-data/tokens/solana/EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm.png'
  },
  BONK: {
    symbol: 'BONK',
    name: 'Bonk',
    mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    decimals: 5,
    logoURI: 'https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I'
  },
  POPCAT: {
    symbol: 'POPCAT',
    name: 'Popcat',
    mint: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
    decimals: 9,
    logoURI: 'https://dd.dexscreener.com/ds-data/tokens/solana/7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr.png'
  },
  PEPE: {
    symbol: 'PEPE',
    name: 'Pepe',
    mint: 'BzTXT17ZZX94x9auzBnXVczw8iQiJxjZAo4fJe9YL1d3',
    decimals: 6,
    logoURI: 'https://dd.dexscreener.com/ds-data/tokens/solana/BzTXT17ZZX94x9auzBnXVczw8iQiJxjZAo4fJe9YL1d3.png'
  },
  TRUMP: {
    symbol: 'TRUMP',
    name: 'OFFICIAL TRUMP',
    mint: '6pg9b9SSdKwkmQP5xv9Pv1KkqKgjkfMKEqEPBXKZ6Y9Q',
    decimals: 6,
    logoURI: 'https://dd.dexscreener.com/ds-data/tokens/solana/6pg9b9SSdKwkmQP5xv9Pv1KkqKgjkfMKEqEPBXKZ6Y9Q.png'
  },
  MELANIA: {
    symbol: 'MELANIA',
    name: 'Melania Meme',
    mint: 'H6Wa8hTGBLJoKjRzrBKLkQLbYvWQQWiFWCdCWNhPXZ7D',
    decimals: 6,
    logoURI: 'https://dd.dexscreener.com/ds-data/tokens/solana/H6Wa8hTGBLJoKjRzrBKLkQLbYvWQQWiFWCdCWNhPXZ7D.png'
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

// Get all supported tokens as an array
export function getAllTokens(): Token[] {
  return Object.values(TOKENS);
}

// Search tokens by symbol or name
export function searchTokens(query: string): Token[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllTokens().filter(token => 
    token.symbol.toLowerCase().includes(lowercaseQuery) ||
    token.name.toLowerCase().includes(lowercaseQuery)
  );
}

// Get popular token pairs for SOL
export function getSolTokenPairs(): Token[] {
  return [TOKENS.USDC, TOKENS.USDT, TOKENS.FARTCOIN, TOKENS.WIF, TOKENS.BONK, TOKENS.PEPE, TOKENS.TRUMP];
}

// Create a fallback token for unknown mints
export function createCustomToken(mint: string, symbol?: string): Token {
  return {
    symbol: symbol || 'UNKNOWN',
    name: symbol || 'Unknown Token',
    mint: mint,
    decimals: 6, // Default to 6 decimals
    logoURI: 'https://static.jup.ag/jup/icon.png' // Fallback logo
  };
} 