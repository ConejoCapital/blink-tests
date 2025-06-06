import { TOKENS } from '@/lib/tokens';
import TokenBuilder from '@/components/TokenBuilder';

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://blink-test-three.vercel.app';
  const solToUsdcLink = `/api/actions/swap?inputMint=${TOKENS.SOL.mint}&outputMint=${TOKENS.USDC.mint}`;
  const usdcToSolLink = `/api/actions/swap?inputMint=${TOKENS.USDC.mint}&outputMint=${TOKENS.SOL.mint}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Jupiter Swap Blink
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Swap tokens directly from anywhere on the web using Jupiter&apos;s best routes.
            Share these links on social media, Discord, or any platform that supports Blinks!
          </p>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg inline-block">
            🚀 Now supports 10+ popular tokens including FARTCOIN, WIF, BONK, PEPE, TRUMP and custom tokens!
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">
                🔄 SOL → USDC Swap
              </h2>
              <p className="text-gray-300 mb-4">
                Swap Solana (SOL) for USD Coin (USDC) using Jupiter&apos;s aggregated liquidity.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Blink URL:</p>
                <div className="bg-black/30 rounded-lg p-3 text-sm text-green-400 font-mono break-all">
                  {`${baseUrl}${solToUsdcLink}`}
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">
                💰 USDC → SOL Swap
              </h2>
              <p className="text-gray-300 mb-4">
                Swap USD Coin (USDC) for Solana (SOL) using Jupiter&apos;s best prices.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Blink URL:</p>
                <div className="bg-black/30 rounded-lg p-3 text-sm text-green-400 font-mono break-all">
                  {`${baseUrl}${usdcToSolLink}`}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Swap - NEW! */}
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8 border border-purple-400/50 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
                🚀 Dynamic Token Swap 
                <span className="ml-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm px-3 py-1 rounded-full font-bold">
                  NEW!
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Swap ANY token including <span className="text-yellow-400 font-bold">FARTCOIN</span>, <span className="text-blue-400 font-bold">WIF</span>, <span className="text-orange-400 font-bold">BONK</span>, <span className="text-green-400 font-bold">PEPE</span>, <span className="text-red-400 font-bold">TRUMP</span> and more! 
                Choose from popular tokens or enter custom mint addresses for ultimate flexibility.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">🎯 Popular Token Swaps</h3>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm text-gray-400 mb-1">SOL → FARTCOIN:</p>
                    <code className="text-yellow-300 text-xs break-all font-mono">
                      {`${baseUrl}/api/actions/dynamic-swap?inputMint=${TOKENS.SOL.mint}&outputMint=${TOKENS.FARTCOIN.mint}`}
                    </code>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm text-gray-400 mb-1">SOL → WIF:</p>
                    <code className="text-blue-300 text-xs break-all font-mono">
                      {`${baseUrl}/api/actions/dynamic-swap?inputMint=${TOKENS.SOL.mint}&outputMint=${TOKENS.WIF.mint}`}
                    </code>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm text-gray-400 mb-1">SOL → BONK:</p>
                    <code className="text-orange-300 text-xs break-all font-mono">
                      {`${baseUrl}/api/actions/dynamic-swap?inputMint=${TOKENS.SOL.mint}&outputMint=${TOKENS.BONK.mint}`}
                    </code>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">⚡ Features</h3>
                <ul className="space-y-2 text-gray-200">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Dynamic token pair selection
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Support for custom mint addresses
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    All popular meme coins included
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                    Jupiter&apos;s best routing & pricing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Works with any Solana token
                  </li>
                </ul>
                
                <div className="bg-black/30 rounded-lg p-3 mt-4">
                  <p className="text-sm text-gray-400 mb-1">Base Dynamic URL:</p>
                  <code className="text-green-300 text-sm break-all font-mono">
                    {`${baseUrl}/api/actions/dynamic-swap`}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Token Builder */}
          <TokenBuilder />

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mt-12">
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
                  Users can swap tokens directly without leaving the platform they&apos;re on.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
              <p className="text-yellow-200">
                <strong>Note:</strong> This Blink requires a Solana wallet extension like Phantom, Backpack, or Solflare to function.
                Make sure you&apos;re on Solana mainnet to test real swaps.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Supported Tokens</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {Object.values(TOKENS).map((token) => (
                  <div key={token.symbol} className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                    {token.logoURI && (
                      // eslint-disable-next-line @next/next/no-img-element
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
