import { NextResponse } from 'next/server';

export async function GET() {
  const actionsJson = {
    rules: [
      // Main swap action
      {
        pathPattern: '/api/actions/swap',
        apiPath: '/api/actions/swap',
      },
      // Swap with specific token pairs
      {
        pathPattern: '/api/actions/swap/**',
        apiPath: '/api/actions/swap/**',
      },
      // Dynamic swap action - NEW!
      {
        pathPattern: '/api/actions/dynamic-swap',
        apiPath: '/api/actions/dynamic-swap',
      },
      // Dynamic swap with parameters
      {
        pathPattern: '/api/actions/dynamic-swap/**',
        apiPath: '/api/actions/dynamic-swap/**',
      },
      // Support for direct swap links
      {
        pathPattern: '/swap',
        apiPath: '/api/actions/swap',
      },
      {
        pathPattern: '/swap/**',
        apiPath: '/api/actions/swap/**',
      },
      // Dynamic swap direct links
      {
        pathPattern: '/dynamic-swap',
        apiPath: '/api/actions/dynamic-swap',
      },
      {
        pathPattern: '/dynamic-swap/**',
        apiPath: '/api/actions/dynamic-swap/**',
      },
    ],
  };

  return NextResponse.json(actionsJson, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding',
      'X-Action-Version': '2.1.3',
      'X-Blockchain-Ids': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    },
  });
}

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