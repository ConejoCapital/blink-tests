import Link from 'next/link';
import { TOKENS } from '@/lib/tokens';

export default function Home() {
  const solToUsdcLink = `/api/actions/swap?inputMint=${TOKENS.SOL.mint}&outputMint=${TOKENS.USDC.mint}`;
  const usdcToSolLink = `/api/actions/swap?inputMint=${TOKENS.USDC.mint}&outputMint=${TOKENS.SOL.mint}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Jupiter Swap Blink
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Swap tokens directly from anywhere on the web using Jupiter's best routes.
            Share these links on social media, Discord, or any platform that supports Blinks!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">
                🔄 SOL → USDC Swap
              </h2>
              <p className="text-gray-300 mb-4">
                Swap Solana (SOL) for USD Coin (USDC) using Jupiter's aggregated liquidity.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Blink URL:</p>
                <div className="bg-black/30 rounded-lg p-3 text-sm text-green-400 font-mono break-all">
                  {`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${solToUsdcLink}`}
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">
                💰 USDC → SOL Swap
              </h2>
              <p className="text-gray-300 mb-4">
                Swap USD Coin (USDC) for Solana (SOL) using Jupiter's best prices.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Blink URL:</p>
                <div className="bg-black/30 rounded-lg p-3 text-sm text-green-400 font-mono break-all">
                  {`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${usdcToSolLink}`}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              How to Use Jupiter Swap Blinks
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">1. Copy Blink URL</h3>
                <p className="text-gray-300">
                  Copy one of the Blink URLs above or create a custom one with specific parameters.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">2. Share Anywhere</h3>
                <p className="text-gray-300">
                  Share the URL on Twitter, Discord, Telegram, or any platform that supports Blinks.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">3. Instant Swap</h3>
                <p className="text-gray-300">
                  Users can swap tokens directly without leaving the platform they're on.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
              <p className="text-yellow-200">
                <strong>Note:</strong> This Blink requires a Solana wallet extension like Phantom, Backpack, or Solflare to function.
                Make sure you're on Solana mainnet to test real swaps.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Supported Tokens</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {Object.values(TOKENS).map((token) => (
                  <div key={token.symbol} className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                    {token.logoURI && (
                      <img src={token.logoURI} alt={token.symbol} className="w-6 h-6 rounded-full" />
                    )}
                    <span className="text-white font-medium">{token.symbol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
