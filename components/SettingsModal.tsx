'use client';

import React, { useState, useContext } from 'react';
import { SettingsContext } from '@/app/context/SettingsContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const context = useContext(SettingsContext);
  const [activeTab, setActiveTab] = useState('modelTab');
  
  // Additional state for form inputs not in settings
  const [codWordLimit, setCodWordLimit] = useState('5');
  const [streamingEnabled, setStreamingEnabled] = useState(true);
  const [reflectionSettings, setReflectionSettings] = useState({
    selfVerification: true,
    errorDetection: true,
    alternativeSearch: true,
    confidenceAssessment: true
  });
  const [memorySettings, setMemorySettings] = useState({
    savePersonalInfo: true,
    saveProjectDetails: true,
    saveTechnicalKnowledge: true,
    saveReflectionHistory: true
  });

  if (!isOpen || !context) return null;

  const { settings, updateSettings } = context;

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-700 rounded-xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-dark-600 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Enhanced AI Configuration - DeepSeek V3-0324</h2>
          <button onClick={onClose} title="Close Settings" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-5">
          {/* Tab Navigation */}
          <div className="bg-dark-600 rounded-lg p-1 flex mb-5 overflow-x-auto">
            <button onClick={() => handleTabClick('modelTab')} className={`tab-btn flex-shrink-0 py-2 px-4 rounded-md ${activeTab === 'modelTab' ? 'text-white bg-deepseek-500' : 'text-gray-400'} transition`} data-tab="modelTab">🤖 Model</button>
            <button onClick={() => handleTabClick('codTab')} className={`tab-btn flex-shrink-0 py-2 px-4 rounded-md ${activeTab === 'codTab' ? 'text-white bg-deepseek-500' : 'text-gray-400'} transition`} data-tab="codTab">🧠 CoD Settings</button>
            <button onClick={() => handleTabClick('parametersTab')} className={`tab-btn flex-shrink-0 py-2 px-4 rounded-md ${activeTab === 'parametersTab' ? 'text-white bg-deepseek-500' : 'text-gray-400'} transition`} data-tab="parametersTab">⚙️ Parameters</button>
            <button onClick={() => handleTabClick('reflectionTab')} className={`tab-btn flex-shrink-0 py-2 px-4 rounded-md ${activeTab === 'reflectionTab' ? 'text-white bg-deepseek-500' : 'text-gray-400'} transition`} data-tab="reflectionTab">🔄 Reflection</button>
            <button onClick={() => handleTabClick('memoryTab')} className={`tab-btn flex-shrink-0 py-2 px-4 rounded-md ${activeTab === 'memoryTab' ? 'text-white bg-deepseek-500' : 'text-gray-400'} transition`} data-tab="memoryTab">💾 Memory</button>
          </div>
          
          {/* Model Selection Tab */}
          <div id="modelTab" className={`tab-content ${activeTab === 'modelTab' ? '' : 'hidden'}`}>
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-dark-600">DeepSeek V3-0324 Configuration</h3>
            
            {/* DeepSeek Model Info */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-deepseek-900/20 to-blue-900/20 border border-deepseek-500/30 rounded-lg p-4">
                <div className="flex items-center text-deepseek-300 text-sm font-medium mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  DeepSeek V3-0324 - Latest Reasoning Model
                  <span className="bg-deepseek-600/20 text-deepseek-300 text-xs px-2 py-1 rounded-full ml-2">FIREWORKS.AI</span>
                </div>
                <div className="text-deepseek-100 text-xs space-y-1">
                  <p>• 671B total parameters with 37B activated per token (MoE architecture)</p>
                  <p>• Enhanced reasoning capabilities with R1 distillation</p>
                  <p>• Optimized for complex problem-solving and mathematical reasoning</p>
                  <p>• Built-in verification and reflection patterns</p>
                </div>
              </div>
            </div>
            
            {/* Model Path Configuration */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Model Path</h4>
              <div className="bg-dark-600 rounded-lg p-4 border border-dark-500">
                <label htmlFor="modelPath" className="sr-only">Model Path</label>
                <input type="text" id="modelPath" value="accounts/fireworks/models/deepseek-v3-0324" readOnly
                       className="w-full bg-dark-700 text-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-deepseek-500 font-mono"/>
                <div className="text-xs text-gray-400 mt-2">
                  Model path for Fireworks.ai API - DeepSeek V3-0324 is the latest version with enhanced reasoning
                </div>
              </div>
            </div>
            
            {/* Temperature Mapping Info */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center text-blue-300 text-sm font-medium mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                DeepSeek Temperature Mapping
              </div>
              <div className="text-blue-100 text-xs">
                DeepSeek V3-0324 uses temperature mapping: API temp 1.0 → Model temp 0.3 for optimal performance
              </div>
            </div>
          </div>
          
          {/* CoD Settings Tab */}
          <div id="codTab" className={`tab-content ${activeTab === 'codTab' ? '' : 'hidden'}`}>
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-dark-600">Enhanced Chain of Draft Configuration</h3>
            
            {/* Reasoning Method Selection */}
            <div className="bg-dark-600 border border-dark-500 rounded-lg p-4 mb-5">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Reasoning Method</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input type="radio" id="standardReasoning" name="reasoningMethod" value="standard" checked={settings.reasoningEnhancement === 'standard'} onChange={() => updateSettings({ reasoningEnhancement: 'standard' })} className="w-4 h-4 mt-1 text-deepseek-500 bg-dark-500 border-dark-400 focus:ring-deepseek-500 focus:ring-offset-dark-700"/>
                  <label htmlFor="standardReasoning" className="ml-3 block text-sm font-medium text-white">
                    Standard (No special reasoning)
                    <div className="text-gray-400 text-xs mt-1">Direct model responses without Chain of Draft methodology.</div>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input type="radio" id="enhancedCoD" name="reasoningMethod" value="adaptive" checked={settings.reasoningEnhancement === 'adaptive'} onChange={() => updateSettings({ reasoningEnhancement: 'adaptive' })} className="w-4 h-4 mt-1 text-deepseek-500 bg-dark-500 border-dark-400 focus:ring-deepseek-500 focus:ring-offset-dark-700"/>
                  <label htmlFor="enhancedCoD" className="ml-3 block text-sm font-medium text-white">
                    Enhanced Chain of Draft with Dual-Stage Verification
                    <div className="text-gray-400 text-xs mt-1">Advanced CoD with two-stage API calls: Draft + Reflection → Final Verification & Answer</div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* CoD Word Limit Settings */}
            <div id="codWordLimitSection" className="mb-5">
              <h4 className="text-sm font-medium text-gray-300 mb-3">CoD Word Limits (Research-Optimized)</h4>
              <div className="bg-dark-600 border border-dark-500 rounded-lg p-4 space-y-3">
                <div className="flex items-start">
                  <input 
                    type="radio" 
                    id="cod5Words" 
                    name="codWordLimit" 
                    value="5" 
                    checked={codWordLimit === '5'}
                    onChange={(e) => setCodWordLimit(e.target.value)}
                    className="w-4 h-4 mt-1 text-deepseek-500 bg-dark-500 border-dark-400"
                  />
                  <label htmlFor="cod5Words" className="ml-3 block text-sm font-medium text-white">
                    5 words per step
                    <div className="text-gray-400 text-xs mt-1">Original paper recommendation - maximum efficiency (7.6% of CoT tokens)</div>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="radio" 
                    id="cod8Words" 
                    name="codWordLimit" 
                    value="8" 
                    checked={codWordLimit === '8'}
                    onChange={(e) => setCodWordLimit(e.target.value)}
                    className="w-4 h-4 mt-1 text-deepseek-500 bg-dark-500 border-dark-400"
                  />
                  <label htmlFor="cod8Words" className="ml-3 block text-sm font-medium text-white">
                    8 words per step
                    <div className="text-gray-400 text-xs mt-1">Enhanced clarity while maintaining efficiency - optimal for research</div>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="radio" 
                    id="cod12Words" 
                    name="codWordLimit" 
                    value="12" 
                    checked={codWordLimit === '12'}
                    onChange={(e) => setCodWordLimit(e.target.value)}
                    className="w-4 h-4 mt-1 text-deepseek-500 bg-dark-500 border-dark-400"
                  />
                  <label htmlFor="cod12Words" className="ml-3 block text-sm font-medium text-white">
                    12 words per step
                    <div className="text-gray-400 text-xs mt-1">Balanced approach for complex scientific reasoning</div>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="radio" 
                    id="cod15Words" 
                    name="codWordLimit" 
                    value="15" 
                    checked={codWordLimit === '15'}
                    onChange={(e) => setCodWordLimit(e.target.value)}
                    className="w-4 h-4 mt-1 text-deepseek-500 bg-dark-500 border-dark-400"
                  />
                  <label htmlFor="cod15Words" className="ml-3 block text-sm font-medium text-white">
                    15 words per step
                    <div className="text-gray-400 text-xs mt-1">Detailed steps for mathematical and analytical tasks</div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Adaptive Reasoning Section */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-4 mb-5">
              <h4 className="text-sm font-medium text-purple-300 mb-3 flex items-center gap-2">
                <span>🧠</span>
                Adaptive Reasoning Enhancement
                <span className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full">AI-POWERED</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <input type="radio" id="adaptiveComplexity" name="reasoningEnhancement" value="adaptive" className="w-4 h-4 mt-1 text-purple-500 bg-dark-500 border-dark-400"/>
                  <label htmlFor="adaptiveComplexity" className="ml-3 block text-sm font-medium text-white">
                    Adaptive Complexity Detection
                    <div className="text-purple-200 text-xs mt-1">Automatically adjusts reasoning depth and word limits based on problem complexity analysis</div>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="radio" 
                    id="fixedReasoning" 
                    name="reasoningEnhancement" 
                    value="standard" 
                    checked={settings.reasoningEnhancement === 'standard'}
                    onChange={() => updateSettings({ reasoningEnhancement: 'standard' })}
                    className="w-4 h-4 mt-1 text-purple-500 bg-dark-500 border-dark-400"
                  />
                  <label htmlFor="fixedReasoning" className="ml-3 block text-sm font-medium text-white">
                    Fixed Reasoning Depth
                    <div className="text-purple-200 text-xs mt-1">Uses consistent reasoning approach and word limits for all problems</div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Parameters Tab Content */}
          <div id="parametersTab" className={`tab-content ${activeTab === 'parametersTab' ? '' : 'hidden'}`}>
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-dark-600">DeepSeek V3-0324 Parameters</h3>
            
            <div className="flex items-center justify-between mb-5 bg-dark-600 rounded-lg p-3 border border-dark-500">
              <label htmlFor="streamingToggle" className="flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-deepseek-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <div>
                  <div className="font-medium text-sm">Enable Streaming Responses</div>
                  <div className="text-gray-400 text-xs mt-0.5">See responses appear in real-time as they're generated</div>
                </div>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  id="streamingToggle" 
                  className="sr-only peer" 
                  checked={streamingEnabled}
                  onChange={(e) => setStreamingEnabled(e.target.checked)}
                />
                <div className="w-11 h-6 bg-dark-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-deepseek-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-deepseek-600"></div>
              </label>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="temp" className="block text-sm font-medium text-gray-300">Temperature (Auto-mapped for DeepSeek)</label>
                <span id="tempValue" className="text-sm text-gray-400">0.3</span>
              </div>
              <input type="range" id="temp" min="0" max="2" step="0.01" defaultValue="0.3" className="w-full h-2 rounded-lg appearance-none cursor-pointer"/>
              <p className="text-xs text-gray-500 mt-1">DeepSeek automatically maps API temperature for optimal performance</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="topP" className="block text-sm font-medium text-gray-300">Top P</label>
                <span id="topPValue" className="text-sm text-gray-400">0.9</span>
              </div>
              <input type="range" id="topP" min="0" max="1" step="0.01" defaultValue="0.9" className="w-full h-2 rounded-lg appearance-none cursor-pointer"/>
              <p className="text-xs text-gray-500 mt-1">Controls diversity via nucleus sampling.</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="topK" className="block text-sm font-medium text-gray-300">Top K</label>
                <span id="topKValue" className="text-sm text-gray-400">40</span>
              </div>
              <input type="range" id="topK" min="0" max="100" step="1" defaultValue="40" className="w-full h-2 rounded-lg appearance-none cursor-pointer"/>
              <p className="text-xs text-gray-500 mt-1">Restricts selection to the K most likely tokens.</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-300">Max Tokens</label>
                <span id="maxTokensValue" className="text-sm text-gray-400">8192</span>
              </div>
              <input type="range" id="maxTokens" min="1" max="16384" step="128" defaultValue="8192" className="w-full h-2 rounded-lg appearance-none cursor-pointer"/>
              <p className="text-xs text-gray-500 mt-1">Maximum length of the response.</p>
            </div>
          </div>
          
          {/* Reflection Tab */}
          <div id="reflectionTab" className={`tab-content ${activeTab === 'reflectionTab' ? '' : 'hidden'}`}>
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-dark-600">Advanced Reflection & Verification System</h3>
            
            <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center text-indigo-300 text-sm font-medium mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Two-Stage API System
                <span className="bg-indigo-600/20 text-indigo-300 text-xs px-2 py-1 rounded-full ml-2">ENHANCED</span>
              </div>
              <div className="text-indigo-100 text-xs space-y-1">
                <p><strong>Stage 1:</strong> Analysis → CoD Steps → Initial Reflection → Draft Solution</p>
                <p><strong>Stage 2:</strong> Deep Verification → Error Checking → Final Reflection → Comprehensive Answer</p>
              </div>
            </div>
            
            {/* Reflection Techniques */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-4">Reflection Techniques</h4>
              
              <div className="space-y-3">
                <label className="flex items-start p-3 bg-dark-600 rounded-lg border border-dark-500 cursor-pointer hover:border-indigo-500/50 transition">
                  <input 
                    type="checkbox" 
                    id="enableSelfVerification" 
                    checked={reflectionSettings.selfVerification}
                    onChange={(e) => setReflectionSettings(prev => ({...prev, selfVerification: e.target.checked}))}
                    className="w-4 h-4 mt-1 text-indigo-500 bg-dark-500 border-dark-400 rounded focus:ring-indigo-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-white">Self-Verification</div>
                    <div className="text-gray-400 text-xs mt-1">Model checks its own reasoning steps for logical consistency</div>
                  </div>
                </label>
                
                <label className="flex items-start p-3 bg-dark-600 rounded-lg border border-dark-500 cursor-pointer hover:border-indigo-500/50 transition">
                  <input 
                    type="checkbox" 
                    id="enableErrorDetection" 
                    checked={reflectionSettings.errorDetection}
                    onChange={(e) => setReflectionSettings(prev => ({...prev, errorDetection: e.target.checked}))}
                    className="w-4 h-4 mt-1 text-indigo-500 bg-dark-500 border-dark-400 rounded focus:ring-indigo-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-white">Error Detection & Correction</div>
                    <div className="text-gray-400 text-xs mt-1">Actively searches for and corrects potential errors in reasoning</div>
                  </div>
                </label>
                
                <label className="flex items-start p-3 bg-dark-600 rounded-lg border border-dark-500 cursor-pointer hover:border-indigo-500/50 transition">
                  <input 
                    type="checkbox" 
                    id="enableAlternativeSearch" 
                    checked={reflectionSettings.alternativeSearch}
                    onChange={(e) => setReflectionSettings(prev => ({...prev, alternativeSearch: e.target.checked}))}
                    className="w-4 h-4 mt-1 text-indigo-500 bg-dark-500 border-dark-400 rounded focus:ring-indigo-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-white">Alternative Approach Search</div>
                    <div className="text-gray-400 text-xs mt-1">Explores alternative solution paths to validate the primary approach</div>
                  </div>
                </label>
                
                <label className="flex items-start p-3 bg-dark-600 rounded-lg border border-dark-500 cursor-pointer hover:border-indigo-500/50 transition">
                  <input 
                    type="checkbox" 
                    id="enableConfidenceAssessment" 
                    checked={reflectionSettings.confidenceAssessment}
                    onChange={(e) => setReflectionSettings(prev => ({...prev, confidenceAssessment: e.target.checked}))}
                    className="w-4 h-4 mt-1 text-indigo-500 bg-dark-500 border-dark-400 rounded focus:ring-indigo-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-white">Confidence Assessment</div>
                    <div className="text-gray-400 text-xs mt-1">Evaluates confidence levels and identifies areas of uncertainty</div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Verification Depth */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Verification Depth</h4>
              <div className="bg-dark-600 rounded-lg p-4">
                <select 
                  id="verificationDepth" 
                  title="Verification Depth Selection"
                  value={settings.verificationDepth}
                  onChange={(e) => updateSettings({ verificationDepth: e.target.value as any })}
                  className="w-full bg-dark-700 text-gray-100 rounded-lg p-3 border border-dark-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="basic">Basic - Quick validation of key steps</option>
                  <option value="standard">Standard - Comprehensive verification</option>
                  <option value="deep">Deep - Exhaustive analysis with multiple approaches</option>
                  <option value="research">Research - Academic-level rigor with extensive validation</option>
                </select>
                <div className="text-gray-400 text-xs mt-2">
                  Higher verification depth increases accuracy but requires more processing time
                </div>
              </div>
            </div>
          </div>
          
          {/* Memory Control Tab */}
          <div id="memoryTab" className={`tab-content ${activeTab === 'memoryTab' ? '' : 'hidden'}`}>
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-dark-600">Memory Control System</h3>
            
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center text-green-300 text-sm font-medium mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Memory System Status
                <span className="bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded-full ml-2">VERCEL KV</span>
              </div>
              <div className="text-green-100 text-xs">
                Powered by Vercel KV (Redis) for persistent, high-performance memory storage. Stores conversations, preferences, and context across sessions.
              </div>
            </div>
            
            {/* Information Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Information Categories to Save
              </h4>
              
              <div className="space-y-3">
                <label className="flex items-start p-3 bg-dark-600 rounded-lg border border-dark-500 cursor-pointer hover:border-green-500/50 transition">
                  <input 
                    type="checkbox" 
                    id="savePersonalInfo" 
                    checked={memorySettings.savePersonalInfo}
                    onChange={(e) => setMemorySettings(prev => ({...prev, savePersonalInfo: e.target.checked}))}
                    className="w-4 h-4 mt-1 text-green-500 bg-dark-500 border-dark-400 rounded focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-white">Personal Information & Research Preferences</div>
                    <div className="text-gray-400 text-xs mt-1">Store user preferences, research style, and personal context</div>
                  </div>
                </label>
                
                <label className="flex items-start p-3 bg-dark-600 rounded-lg border border-dark-500 cursor-pointer hover:border-green-500/50 transition">
                  <input 
                    type="checkbox" 
                    id="saveProjectDetails" 
                    checked={memorySettings.saveProjectDetails}
                    onChange={(e) => setMemorySettings(prev => ({...prev, saveProjectDetails: e.target.checked}))}
                    className="w-4 h-4 mt-1 text-green-500 bg-dark-500 border-dark-400 rounded focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-white">Research Projects & Methodologies</div>
                    <div className="text-gray-400 text-xs mt-1">Remember ongoing research, methodologies, and project-related information</div>
                  </div>
                </label>
                
                <label className="flex items-start p-3 bg-dark-600 rounded-lg border border-dark-500 cursor-pointer hover:border-green-500/50 transition">
                  <input 
                    type="checkbox" 
                    id="saveTechnicalKnowledge" 
                    checked={memorySettings.saveTechnicalKnowledge}
                    onChange={(e) => setMemorySettings(prev => ({...prev, saveTechnicalKnowledge: e.target.checked}))}
                    className="w-4 h-4 mt-1 text-green-500 bg-dark-500 border-dark-400 rounded focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-white">Technical Knowledge & CoD Patterns</div>
                    <div className="text-gray-400 text-xs mt-1">Store reasoning patterns, technical decisions, and CoD optimization insights</div>
                  </div>
                </label>
                
                <label className="flex items-start p-3 bg-dark-600 rounded-lg border border-dark-500 cursor-pointer hover:border-green-500/50 transition">
                  <input 
                    type="checkbox" 
                    id="saveReflectionHistory" 
                    checked={memorySettings.saveReflectionHistory}
                    onChange={(e) => setMemorySettings(prev => ({...prev, saveReflectionHistory: e.target.checked}))}
                    className="w-4 h-4 mt-1 text-green-500 bg-dark-500 border-dark-400 rounded focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-white">Reflection & Verification History</div>
                    <div className="text-gray-400 text-xs mt-1">Store successful reflection patterns and verification strategies</div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Memory Statistics */}
            <div className="bg-dark-600 rounded-lg p-4 border border-dark-500">
              <h5 className="text-sm font-medium text-gray-300 mb-3">Memory Statistics</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-dark-700 rounded-lg p-3">
                  <div id="memoryPersonalCount" className="text-lg font-bold text-green-400">0</div>
                  <div className="text-xs text-gray-400">Personal</div>
                </div>
                <div className="bg-dark-700 rounded-lg p-3">
                  <div id="memoryProjectCount" className="text-lg font-bold text-blue-400">0</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="bg-dark-700 rounded-lg p-3">
                  <div id="memoryTechnicalCount" className="text-lg font-bold text-purple-400">0</div>
                  <div className="text-xs text-gray-400">Technical</div>
                </div>
                <div className="bg-dark-700 rounded-lg p-3">
                  <div id="memoryReflectionCount" className="text-lg font-bold text-indigo-400">0</div>
                  <div className="text-xs text-gray-400">Reflections</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-dark-600">
            <button onClick={onClose} className="px-4 py-2 bg-dark-600 hover:bg-dark-500 text-gray-300 rounded-lg transition">
              Cancel
            </button>
            <button onClick={onClose} className="px-4 py-2 deepseek-gradient hover:from-deepseek-600 hover:to-deepseek-700 text-white rounded-lg transition">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
