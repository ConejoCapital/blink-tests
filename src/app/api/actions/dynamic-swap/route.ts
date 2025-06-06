import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { ActionGetResponse, ActionPostResponse } from '@/lib/types';
import { JupiterAPI, formatPriceImpact, formatRoute } from '@/lib/jupiter';
import { getAllTokens, getTokenByMint, createCustomToken, fromTokenAmount, TOKENS } from '@/lib/tokens';

// GET request - Return the dynamic Blink metadata
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const inputMint = url.searchParams.get('inputMint') || TOKENS.SOL.mint;
  const outputMint = url.searchParams.get('outputMint') || TOKENS.FARTCOIN.mint;

  const inputToken = getTokenByMint(inputMint) || createCustomToken(inputMint);
  const outputToken = getTokenByMint(outputMint) || createCustomToken(outputMint);

  // Get all supported tokens for dynamic selection
  const allTokens = getAllTokens();
  
  // Create action buttons - prioritize preset amounts
  const popularActions = [
    // Preset amounts for current token pair (top priority)
    {
      label: `Swap 0.1 ${inputToken.symbol} → ${outputToken.symbol}`,
      href: `/api/actions/dynamic-swap?inputMint=${inputMint}&outputMint=${outputMint}&amount=0.1`,
    },
    {
      label: `Swap 0.5 ${inputToken.symbol} → ${outputToken.symbol}`,
      href: `/api/actions/dynamic-swap?inputMint=${inputMint}&outputMint=${outputMint}&amount=0.5`,
    },
    {
      label: `Swap 1 ${inputToken.symbol} → ${outputToken.symbol}`,
      href: `/api/actions/dynamic-swap?inputMint=${inputMint}&outputMint=${outputMint}&amount=1`,
    },
    // Custom amount for current token pair
    {
      label: `Custom ${inputToken.symbol} → ${outputToken.symbol}`,
      href: `/api/actions/dynamic-swap?inputMint=${inputMint}&outputMint=${outputMint}&amount={amount}`,
      parameters: [
        {
          name: 'amount',
          label: `${inputToken.symbol} Amount`,
          required: true,
          type: 'number' as const,
        },
      ],
    },
    // Different token pair option
    {
      label: 'Different Token Pair',
      href: `/api/actions/dynamic-swap?inputMint={inputMint}&outputMint={outputMint}&amount={amount}`,
      parameters: [
        {
          name: 'inputMint',
          label: 'Input Token Mint Address',
          required: true,
          type: 'text' as const,
        },
        {
          name: 'outputMint',
          label: 'Output Token Mint Address',
          required: true,
          type: 'text' as const,
        },
        {
          name: 'amount',
          label: 'Token Amount',
          required: true,
          type: 'number' as const,
        },
      ],
    },
  ];

  const response: ActionGetResponse = {
    title: `Dynamic Token Swap: ${inputToken.symbol} → ${outputToken.symbol}`,
    icon: inputToken.logoURI || 'https://static.jup.ag/jup/icon.png',
    description: `Swap any token using Jupiter's best routes. Currently configured for ${inputToken.symbol} to ${outputToken.symbol}. Supports ${allTokens.length}+ tokens including FARTCOIN, WIF, BONK, PEPE, TRUMP and more!`,
    label: 'Dynamic Swap',
    links: {
      actions: popularActions,
    },
  };

  return NextResponse.json(response, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
      'X-Action-Version': '2.1.3',
      'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    },
  });
}

// POST request - Create and return the swap transaction
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const body = await request.json();

    // Extract parameters
    const inputMint = body.inputMint || url.searchParams.get('inputMint') || TOKENS.SOL.mint;
    const outputMint = body.outputMint || url.searchParams.get('outputMint') || TOKENS.FARTCOIN.mint;
    const amountParam = body.amount || url.searchParams.get('amount');
    const userPublicKey = body.account;

    // Log for debugging
    console.log('Dynamic swap request:', {
      inputMint,
      outputMint,
      amountParam,
      userPublicKey: userPublicKey ? 'present' : 'missing',
      body: body,
      urlParams: Object.fromEntries(url.searchParams)
    });

    // Validate required parameters
    if (!userPublicKey) {
      return NextResponse.json(
        { error: 'Missing user public key' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
            'X-Action-Version': '2.1.3',
            'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
          }
        }
      );
    }

    if (!amountParam) {
      return NextResponse.json(
        { error: 'Missing swap amount' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
            'X-Action-Version': '2.1.3',
            'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
          }
        }
      );
    }

    const amount = parseFloat(amountParam);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid swap amount' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
            'X-Action-Version': '2.1.3',
            'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
          }
        }
      );
    }

    // Validate public key
    try {
      new PublicKey(userPublicKey);
    } catch {
      return NextResponse.json(
        { error: 'Invalid user public key' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
            'X-Action-Version': '2.1.3',
            'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
          }
        }
      );
    }

    // Validate mint addresses
    try {
      new PublicKey(inputMint);
      new PublicKey(outputMint);
    } catch {
      return NextResponse.json(
        { error: 'Invalid token mint address' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
            'X-Action-Version': '2.1.3',
            'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
          }
        }
      );
    }

    // Get tokens (create custom tokens for unknown mints)
    const inputToken = getTokenByMint(inputMint) || createCustomToken(inputMint);
    const outputToken = getTokenByMint(outputMint) || createCustomToken(outputMint);

    // Create swap using Jupiter
    console.log(`Creating dynamic swap: ${amount} ${inputToken.symbol} -> ${outputToken.symbol}`);
    const { quote, transaction } = await JupiterAPI.createSwap({
      inputMint,
      outputMint,
      amount,
      slippageBps: 50, // 0.5% slippage
      userPublicKey,
    });
    console.log('Dynamic swap created successfully');

    // Calculate output amount for display
    const outputAmount = fromTokenAmount(
      parseInt(quote.outAmount),
      outputToken.decimals
    );

    // Format response message
    const route = formatRoute(quote);
    const priceImpact = formatPriceImpact(quote.priceImpactPct);
    
    const message = [
      `🔄 Dynamic Swap: ${amount} ${inputToken.symbol} → ${outputAmount.toFixed(6)} ${outputToken.symbol}`,
      `📈 Route: ${route}`,
      `💡 Price Impact: ${priceImpact}`,
      `🚀 Powered by Jupiter`,
    ].join('\n');

    const response: ActionPostResponse = {
      transaction,
      message,
    };

    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
        'X-Action-Version': '2.1.3',
        'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
      },
    });

  } catch (err) {
    console.error('Dynamic swap action error:', err);
    
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { error: `Dynamic swap failed: ${errorMessage}` },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
          'X-Action-Version': '2.1.3',
          'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
        }
      }
    );
  }
}

// Support CORS for cross-origin requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
      'X-Action-Version': '2.1.3',
      'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    },
  });
} 