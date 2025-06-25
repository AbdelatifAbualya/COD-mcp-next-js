
'use client';

import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-80 bg-gradient-to-b from-dark-700 to-dark-800 border-r border-dark-600 flex flex-col overflow-y-auto hidden md:flex shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-dark-600/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 deepseek-gradient rounded-lg flex items-center justify-center deepseek-glow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Enhanced CoD Studio</h2>
            <p className="text-xs text-deepseek-300">DeepSeek V3-0324 + Advanced Reflection</p>
          </div>
        </div>
        
        {/* New Session Button */}
        <button id="newThreadBtn" className="w-full deepseek-gradient hover:from-deepseek-600 hover:to-deepseek-700 text-white py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 deepseek-glow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span className="font-medium">New Research Session</span>
        </button>
      </div>

      {/* System Status */}
      <div className="p-4 border-b border-dark-600/50">
        {/* DeepSeek Status */}
        <div className="bg-gradient-to-r from-deepseek-900/20 to-blue-900/20 border border-deepseek-500/30 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-deepseek-400 rounded-full animate-pulse"></div>
              <span className="text-deepseek-300 text-sm font-medium">DeepSeek V3-0324</span>
            </div>
            <span id="modelStatus" className="text-deepseek-400 text-xs bg-deepseek-900/30 px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="text-deepseek-200 text-xs">Latest reasoning model with reflection</div>
        </div>
        
        {/* Memory Status */}
        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-green-300 text-sm font-medium">Memory Active</span>
            </div>
            <span id="memoryCount" className="text-green-400 text-xs bg-green-900/30 px-2 py-1 rounded-full">0 items</span>
          </div>
          <div className="text-green-200 text-xs">Storing conversations & preferences</div>
        </div>
      </div>

      {/* Threads Section */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Recent Sessions</h3>
          <span id="threadCount" className="text-xs bg-dark-600 text-gray-400 px-2 py-1 rounded-full">1</span>
        </div>
        <ul id="threadList" className="space-y-2 mb-6">
          <li className="bg-dark-600/50 hover:bg-dark-600 text-deepseek-300 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border border-dark-500/50 hover:border-deepseek-500/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-deepseek-500/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-deepseek-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Research Session 1</p>
                <p className="text-xs text-gray-400">Just now</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Export & Actions Section */}
      <div className="p-4 border-t border-dark-600/50 space-y-3">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
          </svg>
          Export Research
        </div>
        
        {/* Export Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button id="downloadTxtBtn" className="bg-dark-600 hover:bg-dark-500 text-gray-300 hover:text-white py-3 px-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-1 border border-dark-500 hover:border-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span className="text-xs font-medium">TXT</span>
          </button>
          <button id="downloadPdfBtn" className="bg-dark-600 hover:bg-dark-500 text-gray-300 hover:text-white py-3 px-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-1 border border-dark-500 hover:border-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <span className="text-xs font-medium">PDF</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          Quick Actions
        </div>
        
        <div className="space-y-2">
          <button id="clearThreadBtn" className="w-full bg-dark-600 hover:bg-dark-500 text-gray-300 hover:text-white py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center gap-3 border border-dark-500 hover:border-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span className="text-sm">Clear Session</span>
          </button>
          
          <button id="deleteThreadBtn" className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center gap-3 border border-red-600/20 hover:border-red-500/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span className="text-sm">Delete Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
