'use client';

import React from 'react';
import MessageList from './MessageList';
import { useChat } from '@ai-sdk/react';

interface MainContentProps {
  onOpenSettings: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onOpenSettings }) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chat error:', error);
    }
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-dark-700 border-b border-dark-600 h-16 flex items-center justify-between px-4 md:px-6">
        <h1 id="pageTitle" className="text-xl font-semibold">Enhanced CoD Studio - DeepSeek V3-0324</h1>
        <div className="flex items-center gap-3">
          <div id="currentModelDisplay" className="bg-dark-600 text-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-deepseek-400 rounded-full animate-pulse"></div>
            <span id="modelDisplayText">DeepSeek V3-0324</span>
            <span id="adaptiveIndicator" className="hidden bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">🧠 Adaptive</span>
          </div>
          <button id="openSettings" onClick={onOpenSettings} className="flex items-center gap-1.5 bg-dark-600 hover:bg-dark-500 text-gray-300 px-3 py-1.5 rounded-lg transition">
            <span>Settings</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div id="progressContainer" className="bg-dark-600 h-2 overflow-hidden hidden">
        <div id="progressBar" className="progress-bar h-full w-0"></div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg mb-4">
            <p><strong>Error:</strong> {error.message}</p>
          </div>
        )}
        
        <MessageList messages={messages.map(m => ({ 
          ...m, 
          timestamp: m.createdAt?.getTime() || Date.now(),
          toolInvocations: m.toolInvocations?.map(t => ({
            toolName: t.toolName,
            args: t.args,
            result: 'state' in t && t.state === 'result' ? (t as any).result : undefined,
            timestamp: Date.now(),
            duration: 0
          })) || undefined
        }))} />
        
        {isLoading && (
          <div className="bg-dark-600 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-4 h-4 bg-deepseek-400 rounded-full animate-pulse"></div>
              <span>DeepSeek is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-dark-600 bg-dark-700">
        {/* Image Preview Area */}
        <div id="imagePreviewArea" className="mb-4 hidden">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Attached Images
          </div>
          <div id="imagePreviewContainer" className="flex flex-wrap gap-2 mb-3"></div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-dark-600 p-3 shadow-lg border border-dark-500 focus-within:border-deepseek-500 transition">
          <div className="flex-1">
            <textarea 
              id="userInput" 
              rows={1} 
              className="w-full bg-dark-700 text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-deepseek-500 resize-none text-base" 
              placeholder="Ask a complex research question for enhanced CoD reasoning with DeepSeek V3-0324..." 
              value={input} 
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <button 
              type="submit" 
              id="sendBtn" 
              disabled={isLoading || !input.trim()}
              title="Send Message" 
              className="deepseek-gradient hover:from-deepseek-600 hover:to-deepseek-700 text-white p-3 rounded-lg transition deepseek-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
            <label htmlFor="imageInput" className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-lg cursor-pointer transition" title="Upload Images (Vision Models)">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </label>
            <label htmlFor="fileInput" className="bg-dark-500 hover:bg-dark-400 text-gray-300 p-2.5 rounded-lg cursor-pointer transition" title="Upload Files">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
              </svg>
            </label>
          </div>
        </div>
        <input type="file" id="imageInput" className="hidden" multiple accept="image/*" aria-label="Image Input" />
        <input type="file" id="fileInput" className="hidden" multiple aria-label="File Input" />
        <div id="attachedFiles" className="mt-3 flex-wrap gap-3 hidden"></div>
      </form>
    </div>
  );
};

export default MainContent;
