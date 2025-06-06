'use client';

import { useState } from 'react';
import { getAllTokens, searchTokens, TOKENS } from '@/lib/tokens';

export default function TokenBuilder() {
  const [inputToken, setInputToken] = useState(TOKENS.SOL);
  const [outputToken, setOutputToken] = useState(TOKENS.FARTCOIN);
  const [searchInput, setSearchInput] = useState('');
  const [searchOutput, setSearchOutput] = useState('');
  const [showInputDropdown, setShowInputDropdown] = useState(false);
  const [showOutputDropdown, setShowOutputDropdown] = useState(false);

  const allTokens = getAllTokens();
  const filteredInputTokens = searchInput ? searchTokens(searchInput) : allTokens;
  const filteredOutputTokens = searchOutput ? searchTokens(searchOutput) : allTokens;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://blink-test-three.vercel.app';
  const generatedUrl = `${baseUrl}/api/actions/dynamic-swap?inputMint=${inputToken.mint}&outputMint=${outputToken.mint}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    // You could add a toast notification here
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">
        🔧 Token Swap URL Builder
      </h3>
      
      <div className="space-y-6">
        {/* Input Token Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Input Token (What you&apos;re swapping FROM)
          </label>
          <div className="relative">
            <div 
              className="w-full bg-black/30 rounded-lg p-3 border border-gray-600 cursor-pointer flex items-center justify-between"
              onClick={() => setShowInputDropdown(!showInputDropdown)}
            >
              <div className="flex items-center space-x-3">
                {inputToken.logoURI && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={inputToken.logoURI} alt={inputToken.symbol} className="w-6 h-6 rounded-full" />
                )}
                <span className="text-white font-medium">{inputToken.symbol}</span>
                <span className="text-gray-400 text-sm">{inputToken.name}</span>
              </div>
              <span className="text-gray-400">▼</span>
            </div>
            
            {showInputDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-gray-600 rounded-lg max-h-60 overflow-y-auto z-10">
                <input
                  type="text"
                  placeholder="Search tokens..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full p-3 bg-transparent text-white placeholder-gray-400 border-b border-gray-600 focus:outline-none"
                />
                {filteredInputTokens.map((token) => (
                  <div
                    key={token.mint}
                    className="p-3 hover:bg-white/10 cursor-pointer flex items-center space-x-3"
                    onClick={() => {
                      setInputToken(token);
                      setShowInputDropdown(false);
                      setSearchInput('');
                    }}
                  >
                    {token.logoURI && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={token.logoURI} alt={token.symbol} className="w-5 h-5 rounded-full" />
                    )}
                    <span className="text-white font-medium">{token.symbol}</span>
                    <span className="text-gray-400 text-sm">{token.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              const temp = inputToken;
              setInputToken(outputToken);
              setOutputToken(temp);
            }}
            className="bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Output Token Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Output Token (What you&apos;re swapping TO)
          </label>
          <div className="relative">
            <div 
              className="w-full bg-black/30 rounded-lg p-3 border border-gray-600 cursor-pointer flex items-center justify-between"
              onClick={() => setShowOutputDropdown(!showOutputDropdown)}
            >
              <div className="flex items-center space-x-3">
                {outputToken.logoURI && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={outputToken.logoURI} alt={outputToken.symbol} className="w-6 h-6 rounded-full" />
                )}
                <span className="text-white font-medium">{outputToken.symbol}</span>
                <span className="text-gray-400 text-sm">{outputToken.name}</span>
              </div>
              <span className="text-gray-400">▼</span>
            </div>
            
            {showOutputDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-gray-600 rounded-lg max-h-60 overflow-y-auto z-10">
                <input
                  type="text"
                  placeholder="Search tokens..."
                  value={searchOutput}
                  onChange={(e) => setSearchOutput(e.target.value)}
                  className="w-full p-3 bg-transparent text-white placeholder-gray-400 border-b border-gray-600 focus:outline-none"
                />
                {filteredOutputTokens.map((token) => (
                  <div
                    key={token.mint}
                    className="p-3 hover:bg-white/10 cursor-pointer flex items-center space-x-3"
                    onClick={() => {
                      setOutputToken(token);
                      setShowOutputDropdown(false);
                      setSearchOutput('');
                    }}
                  >
                    {token.logoURI && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={token.logoURI} alt={token.symbol} className="w-5 h-5 rounded-full" />
                    )}
                    <span className="text-white font-medium">{token.symbol}</span>
                    <span className="text-gray-400 text-sm">{token.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Generated URL */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Generated Blink URL:
          </label>
          <div className="bg-black/30 rounded-lg p-3 border border-gray-600">
            <code className="text-green-400 text-sm break-all font-mono">
              {generatedUrl}
            </code>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
          >
            📋 Copy Blink URL
          </button>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Quick Popular Swaps:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setInputToken(TOKENS.SOL);
                setOutputToken(TOKENS.FARTCOIN);
              }}
              className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 text-sm py-2 px-3 rounded border border-yellow-600/50 transition-colors"
            >
              SOL → FARTCOIN
            </button>
            <button
              onClick={() => {
                setInputToken(TOKENS.SOL);
                setOutputToken(TOKENS.WIF);
              }}
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-sm py-2 px-3 rounded border border-blue-600/50 transition-colors"
            >
              SOL → WIF
            </button>
            <button
              onClick={() => {
                setInputToken(TOKENS.SOL);
                setOutputToken(TOKENS.BONK);
              }}
              className="bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 text-sm py-2 px-3 rounded border border-orange-600/50 transition-colors"
            >
              SOL → BONK
            </button>
            <button
              onClick={() => {
                setInputToken(TOKENS.SOL);
                setOutputToken(TOKENS.TRUMP);
              }}
              className="bg-red-600/20 hover:bg-red-600/30 text-red-300 text-sm py-2 px-3 rounded border border-red-600/50 transition-colors"
            >
              SOL → TRUMP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 