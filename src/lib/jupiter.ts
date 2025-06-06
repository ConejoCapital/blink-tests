import { SwapQuote, SwapParams } from './types';
import { getTokenByMint, toTokenAmount } from './tokens';

const JUPITER_API_BASE = 'https://quote-api.jup.ag/v6';
const JUPITER_SWAP_API_BASE = 'https://quote-api.jup.ag/v6';

export class JupiterAPI {
  /**
   * Get a quote for a token swap
   */
  static async getQuote(params: {
    inputMint: string;
    outputMint: string;
    amount: number;
    slippageBps?: number;
  }): Promise<SwapQuote> {
    const { inputMint, outputMint, amount, slippageBps = 50 } = params;

    const inputToken = getTokenByMint(inputMint);
    if (!inputToken) {
      throw new Error(`Unknown input token: ${inputMint}`);
    }

    // Convert amount to lamports based on token decimals
    const amountInLamports = toTokenAmount(amount, inputToken.decimals);

    const url = new URL(`${JUPITER_API_BASE}/quote`);
    url.searchParams.set('inputMint', inputMint);
    url.searchParams.set('outputMint', outputMint);
    url.searchParams.set('amount', amountInLamports.toString());
    url.searchParams.set('slippageBps', slippageBps.toString());

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Jupiter quote failed: ${response.status} ${errorText}`);
    }

    const quote = await response.json();
    return quote as SwapQuote;
  }

  /**
   * Get swap transaction from Jupiter
   */
  static async getSwapTransaction(params: {
    quote: SwapQuote;
    userPublicKey: string;
    wrapAndUnwrapSol?: boolean;
    feeAccount?: string;
  }): Promise<string> {
    const { quote, userPublicKey, wrapAndUnwrapSol = true, feeAccount } = params;

    const swapRequest = {
      quoteResponse: quote,
      userPublicKey,
      wrapAndUnwrapSol,
      ...(feeAccount && { feeAccount }),
    };

    const response = await fetch(`${JUPITER_SWAP_API_BASE}/swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(swapRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Jupiter swap transaction failed: ${response.status} ${errorText}`);
    }

    const { swapTransaction } = await response.json();
    return swapTransaction;
  }

  /**
   * Complete swap flow: get quote and transaction
   */
  static async createSwap(params: SwapParams): Promise<{
    quote: SwapQuote;
    transaction: string;
  }> {
    // Get quote
    const quote = await this.getQuote({
      inputMint: params.inputMint,
      outputMint: params.outputMint,
      amount: params.amount,
      slippageBps: params.slippageBps,
    });

    // Get swap transaction
    const transaction = await this.getSwapTransaction({
      quote,
      userPublicKey: params.userPublicKey,
    });

    return { quote, transaction };
  }

  /**
   * Get supported tokens from Jupiter
   */
  static async getSupportedTokens(): Promise<any[]> {
    const response = await fetch(`${JUPITER_API_BASE}/tokens`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch supported tokens: ${response.status}`);
    }

    return response.json();
  }
}

// Helper function to format price impact
export function formatPriceImpact(priceImpactPct: string): string {
  const impact = parseFloat(priceImpactPct);
  return `${(impact * 100).toFixed(2)}%`;
}

// Helper function to format route information
export function formatRoute(quote: SwapQuote): string {
  return quote.routePlan
    .map(step => step.swapInfo.label)
    .join(' → ');
} 