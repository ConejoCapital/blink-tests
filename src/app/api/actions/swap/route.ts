import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { ActionGetResponse, ActionPostResponse } from '@/lib/types';
import { JupiterAPI, formatPriceImpact, formatRoute } from '@/lib/jupiter';
import { DEFAULT_INPUT_TOKEN, DEFAULT_OUTPUT_TOKEN, getTokenByMint, fromTokenAmount } from '@/lib/tokens';

// GET request - Return the Blink metadata
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const inputMint = url.searchParams.get('inputMint') || DEFAULT_INPUT_TOKEN.mint;
  const outputMint = url.searchParams.get('outputMint') || DEFAULT_OUTPUT_TOKEN.mint;

  const inputToken = getTokenByMint(inputMint);
  const outputToken = getTokenByMint(outputMint);

  if (!inputToken || !outputToken) {
    return NextResponse.json(
      { error: 'Invalid token pair' },
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

  const response: ActionGetResponse = {
    title: `Swap ${inputToken.symbol} to ${outputToken.symbol}`,
    icon: inputToken.logoURI || 'https://static.jup.ag/jup/icon.png',
    description: `Swap ${inputToken.symbol} for ${outputToken.symbol} using Jupiter's best routes`,
    label: 'Jupiter Swap',
    links: {
      actions: [
        {
          label: `Swap 0.1 ${inputToken.symbol}`,
          href: `/api/actions/swap?inputMint=${inputMint}&outputMint=${outputMint}&amount=0.1`,
        },
        {
          label: `Swap 1 ${inputToken.symbol}`,
          href: `/api/actions/swap?inputMint=${inputMint}&outputMint=${outputMint}&amount=1`,
        },
        {
          label: `Swap 5 ${inputToken.symbol}`,
          href: `/api/actions/swap?inputMint=${inputMint}&outputMint=${outputMint}&amount=5`,
        },
        {
          label: 'Custom Amount',
          href: `/api/actions/swap?inputMint=${inputMint}&outputMint=${outputMint}&amount={amount}`,
          parameters: [
            {
              name: 'amount',
              label: `${inputToken.symbol} Amount`,
              required: true,
              type: 'number',
            },
          ],
        },
      ],
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
    const inputMint = url.searchParams.get('inputMint') || DEFAULT_INPUT_TOKEN.mint;
    const outputMint = url.searchParams.get('outputMint') || DEFAULT_OUTPUT_TOKEN.mint;
    // For custom amounts, the amount comes in the request body
    // For preset amounts, the amount comes from URL params
    const amountParam = body.amount || url.searchParams.get('amount');
    const userPublicKey = body.account;

    // Log for debugging
    console.log('Swap request:', {
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

    // Get tokens
    const inputToken = getTokenByMint(inputMint);
    const outputToken = getTokenByMint(outputMint);

    if (!inputToken || !outputToken) {
      return NextResponse.json(
        { error: 'Invalid token pair' },
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

    // Create swap using Jupiter
    console.log(`Creating swap: ${amount} ${inputToken.symbol} -> ${outputToken.symbol}`);
    const { quote, transaction } = await JupiterAPI.createSwap({
      inputMint,
      outputMint,
      amount,
      slippageBps: 50, // 0.5% slippage
      userPublicKey,
    });
    console.log('Swap created successfully');

    // Calculate output amount for display
    const outputAmount = fromTokenAmount(
      parseInt(quote.outAmount),
      outputToken.decimals
    );

    // Format response message
    const route = formatRoute(quote);
    const priceImpact = formatPriceImpact(quote.priceImpactPct);
    
    const message = [
      `Swapping ${amount} ${inputToken.symbol} → ${outputAmount.toFixed(6)} ${outputToken.symbol}`,
      `Route: ${route}`,
      `Price Impact: ${priceImpact}`,
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
    console.error('Swap action error:', err);
    
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { error: `Swap failed: ${errorMessage}` },
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