'use client';

import { ReactNode } from 'react';

interface MessageProps {
  role: 'user' | 'assistant' | 'tool' | 'system' | 'data' | 'function';
  content: string;
  timestamp?: number;
  toolInvocations?: any[];
  children?: ReactNode;
}

interface StageIndicatorProps {
  stage: string;
  isActive?: boolean;
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
}

interface EnhancedCoDRendererProps {
  content: string;
}

// Enhanced CoD Renderer Component
const EnhancedCoDRenderer = ({ content }: EnhancedCoDRendererProps) => {
  // Check if content contains CoD structure (comprehensive detection)
  const hasStage1 = content.includes('STAGE 1') || content.includes('#### PROBLEM ANALYSIS');
  const hasStage2 = content.includes('STAGE 2') || content.includes('#### STAGE 2 VERIFICATION');
  const hasProblemAnalysis = content.includes('#### PROBLEM ANALYSIS');
  const hasCoDSteps = content.includes('CoD Step') || content.includes('#### CHAIN OF DRAFT STEPS');
  const hasVerification = content.includes('#### STAGE 2 VERIFICATION');
  const hasErrorDetection = content.includes('#### ERROR DETECTION');
  const hasAlternativeAnalysis = content.includes('#### ALTERNATIVE APPROACH');
  const hasConfidenceAssessment = content.includes('#### CONFIDENCE ASSESSMENT');
  const hasFinalAnswer = content.includes('#### FINAL COMPREHENSIVE ANSWER');
  const hasReflectionSummary = content.includes('#### REFLECTION SUMMARY');
  
  // If it's a CoD response, use the enhanced renderer
  if (hasStage1 || hasStage2 || hasProblemAnalysis || hasCoDSteps || hasVerification || 
      hasErrorDetection || hasAlternativeAnalysis || hasConfidenceAssessment || 
      hasFinalAnswer || hasReflectionSummary) {
    return <CoDStructuredRenderer content={content} />;
  }

  // Regular content, render normally
  return <div dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />;
};

// New structured CoD renderer that handles the actual format
const CoDStructuredRenderer = ({ content }: { content: string }) => {
  // Split content by main sections using #### headers
  const sections = content.split(/#### /).filter(section => section.trim().length > 0);
  
  return (
    <div className="cod-analysis-container space-y-6">
      {/* Enhanced CoD Header */}
      <div className="cod-header bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🧠</span>
          </div>
          <h2 className="text-xl font-bold text-white">Enhanced Chain of Draft Analysis - DeepSeek V3-0324</h2>
        </div>
        <div className="text-sm text-gray-300">
          Advanced two-stage reasoning with systematic verification and reflection
        </div>
      </div>

      {/* Process each section */}
      {sections.map((section, index) => {
        const sectionTitle = section.split('\n')[0].trim();
        const sectionContent = section.substring(section.indexOf('\n') + 1).trim();
        
        return <CoDSectionRenderer key={index} title={sectionTitle} content={sectionContent} />;
      })}
    </div>
  );
};

// Individual section renderer for CoD components
const CoDSectionRenderer = ({ title, content }: { title: string; content: string }) => {
  const normalizedTitle = title.toLowerCase();
  
  if (normalizedTitle.includes('problem analysis')) {
    return (
      <div className="problem-analysis bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 animate-fadeIn">
        <div className="stage-header flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">📊</div>
          <h3 className="text-lg font-semibold text-blue-300">Problem Analysis</h3>
          <div className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">Initial Reflection</div>
        </div>
        <div className="text-blue-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
      </div>
    );
  }
  
  if (normalizedTitle.includes('chain of draft steps')) {
    return <CoDStepsRenderer content={content} />;
  }
  
  if (normalizedTitle.includes('initial reflection')) {
    return (
      <div className="initial-reflection bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 animate-fadeIn">
        <div className="stage-header flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">🤔</div>
          <h3 className="text-lg font-semibold text-purple-300">Initial Reflection</h3>
          <div className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full">Stage 1</div>
        </div>
        <div className="text-purple-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
      </div>
    );
  }
  
  if (normalizedTitle.includes('draft solution')) {
    return (
      <div className="draft-solution bg-green-900/20 border border-green-500/30 rounded-xl p-6 animate-fadeIn">
        <div className="stage-header flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">📝</div>
          <h3 className="text-lg font-semibold text-green-300">Draft Solution</h3>
          <div className="bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded-full">Stage 1</div>
        </div>
        <div className="text-green-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
      </div>
    );
  }
  
  if (normalizedTitle.includes('stage 2 verification')) {
    return (
      <div className="stage2-verification bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 animate-fadeIn">
        <div className="stage-header flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">2</div>
          <h3 className="text-lg font-semibold text-purple-300">Stage 2 Verification</h3>
          <div className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full">VERIFIED</div>
        </div>
        <div className="text-purple-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
      </div>
    );
  }
  
  if (normalizedTitle.includes('error detection')) {
    return (
      <div className="error-detection bg-red-900/20 border border-red-500/30 rounded-xl p-6 animate-fadeIn">
        <div className="stage-header flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">🚨</div>
          <h3 className="text-lg font-semibold text-red-300">Error Detection & Correction</h3>
          <div className="bg-red-600/20 text-red-300 text-xs px-2 py-1 rounded-full">Stage 2</div>
        </div>
        <div className="text-red-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
      </div>
    );
  }
  
  if (normalizedTitle.includes('alternative approach')) {
    return (
      <div className="alternative-analysis bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6 animate-fadeIn">
        <div className="stage-header flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold">🔄</div>
          <h3 className="text-lg font-semibold text-yellow-300">Alternative Approach Analysis</h3>
          <div className="bg-yellow-600/20 text-yellow-300 text-xs px-2 py-1 rounded-full">Stage 2</div>
        </div>
        <div className="text-yellow-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
      </div>
    );
  }
  
  if (normalizedTitle.includes('confidence assessment')) {
    return (
      <div className="confidence-assessment bg-teal-900/20 border border-teal-500/30 rounded-xl p-6 animate-fadeIn">
        <div className="stage-header flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">📊</div>
          <h3 className="text-lg font-semibold text-teal-300">Confidence Assessment</h3>
          <div className="bg-teal-600/20 text-teal-300 text-xs px-2 py-1 rounded-full">Stage 2</div>
        </div>
        <div className="text-teal-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
      </div>
    );
  }
  
  if (normalizedTitle.includes('final comprehensive answer')) {
    return (
      <div className="final-answer bg-green-900/20 border-2 border-green-500/50 rounded-xl p-6 animate-fadeIn">
        <div className="stage-header flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">✅</div>
          <h3 className="text-lg font-semibold text-green-300">Final Comprehensive Answer</h3>
          <div className="bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded-full">FINAL</div>
        </div>
        <div className="text-green-100 text-base font-medium" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
      </div>
    );
  }
  
  if (normalizedTitle.includes('reflection summary')) {
    return (
      <div className="reflection-summary bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6 animate-fadeIn">
        <div className="stage-header flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">💭</div>
          <h3 className="text-lg font-semibold text-indigo-300">Reflection Summary</h3>
          <div className="bg-indigo-600/20 text-indigo-300 text-xs px-2 py-1 rounded-full">Summary</div>
        </div>
        <div className="text-indigo-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
      </div>
    );
  }
  
  // Default fallback for unrecognized sections
  return (
    <div className="general-section bg-gray-900/20 border border-gray-500/30 rounded-xl p-6 animate-fadeIn">
      <h4 className="text-gray-300 font-semibold mb-3 capitalize">{title}</h4>
      <div className="text-gray-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
    </div>
  );
};

// CoD Steps Renderer - Updated to handle the actual format
const CoDStepsRenderer = ({ content }: { content: string }) => {
  // Split by CoD Step patterns and clean up
  const stepPattern = /CoD Step \d+:.*?(?=CoD Step \d+:|$)/g;
  const stepMatches = content.match(stepPattern) || [];
  
  // If no specific steps found, try to parse line by line
  if (stepMatches.length === 0) {
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const steps = lines.filter(line => line.includes('CoD Step') || /^\d+\./.test(line.trim()));
    
    if (steps.length === 0) {
      // Fallback: treat each paragraph as a step
      const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
      return (
        <div className="cod-steps bg-slate-900/20 border border-slate-500/30 rounded-xl p-6 animate-fadeIn">
          <div className="stage-header flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold">🧠</div>
            <h3 className="text-lg font-semibold text-slate-300">Chain of Draft Steps</h3>
            <div className="bg-slate-600/20 text-slate-300 text-xs px-2 py-1 rounded-full">Stage 1</div>
          </div>
          <div className="space-y-3">
            {paragraphs.map((step, index) => (
              <div key={index} className="cod-step bg-slate-800/50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-slate-300 text-sm font-medium">Step {index + 1}</span>
                </div>
                <div className="text-slate-100 text-sm pl-8" dangerouslySetInnerHTML={{ __html: formatMarkdown(step.trim()) }} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  
  return (
    <div className="cod-steps bg-slate-900/20 border border-slate-500/30 rounded-xl p-6 animate-fadeIn">
      <div className="stage-header flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold">🧠</div>
        <h3 className="text-lg font-semibold text-slate-300">Chain of Draft Steps</h3>
        <div className="bg-slate-600/20 text-slate-300 text-xs px-2 py-1 rounded-full">Stage 1</div>
      </div>
      <div className="space-y-3">
        {stepMatches.map((step, index) => {
          const stepContent = step.replace(/CoD Step \d+:\s*/, '').trim();
          return (
            <div key={index} className="cod-step bg-slate-800/50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                <span className="text-slate-300 text-sm font-medium">CoD Step {index + 1}</span>
                <div className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                  {stepContent.split(' ').length} words
                </div>
              </div>
              <div className="text-slate-100 text-sm pl-8" dangerouslySetInnerHTML={{ __html: formatMarkdown(stepContent) }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced markdown formatter with better support for CoD content
const formatMarkdown = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^###\s+(.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^##\s+(.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
    .replace(/^#\s+(.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    .replace(/^\-\s+(.*$)/gim, '<div class="flex items-start gap-2 ml-4 mb-1"><span class="text-blue-400">•</span><span>$1</span></div>')
    .replace(/^\d+\.\s+(.*$)/gim, '<div class="flex items-start gap-2 ml-4 mb-1"><span class="text-blue-400 font-semibold">$1</span></div>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
};

export function Message({ role, content, timestamp, toolInvocations, children }: MessageProps) {
  const getMessageTypeClass = (role: string) => {
    switch (role) {
      case 'user':
        return 'message user bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4 ml-8 shadow-lg backdrop-blur-sm';
      case 'assistant':
        return 'message assistant bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-4 mr-8 shadow-lg backdrop-blur-sm animate-fadeIn';
      case 'tool':
        return 'message tool bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4 font-mono text-sm shadow-lg backdrop-blur-sm';
      default:
        return 'message bg-gray-900/20 border border-gray-500/30 rounded-lg p-4 mb-4 shadow-lg backdrop-blur-sm';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'user':
        return '👤';
      case 'assistant':
        return '🤖';
      case 'tool':
        return '🔧';
      default:
        return '💬';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'user':
        return 'You';
      case 'assistant':
        return 'DeepSeek V3-0324';
      case 'tool':
        return 'Tool';
      default:
        return 'System';
    }
  };

  return (
    <div className={getMessageTypeClass(role)}>
      <div className="flex items-start gap-3 mb-2">
        <span className="text-lg">{getRoleIcon(role)}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{getRoleName(role)}</span>
            {role === 'assistant' && (
              <StageIndicator stage="Enhanced CoD" isActive={true} />
            )}
            {timestamp && (
              <span className="text-xs text-gray-500">
                {new Date(timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="pl-8">
        {children || (
          <div className="prose prose-invert max-w-none">
            <EnhancedCoDRenderer content={content} />
          </div>
        )}

        {/* Tool Invocations */}
        {toolInvocations && toolInvocations.length > 0 && (
          <div className="mt-4 space-y-3">
            {toolInvocations.map((tool, index) => (
              <div key={index} className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 animate-slideInUp">
                <div className="text-sm font-semibold text-green-300 mb-2 flex items-center gap-2">
                  🔧 Tool: {tool.toolName}
                  <div className="bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded-full">
                    MCP
                  </div>
                </div>
                <div className="bg-green-900/30 rounded p-3 mb-3">
                  <div className="text-xs text-green-400 mb-1">Parameters:</div>
                  <pre className="text-xs text-green-200 whitespace-pre-wrap overflow-x-auto">
                    {JSON.stringify(tool.args, null, 2)}
                  </pre>
                </div>
                {tool.result && (
                  <div className="bg-green-800/20 rounded p-3 border-t border-green-500/20">
                    <div className="text-xs text-green-300 mb-2 flex items-center gap-2">
                      <span>Result:</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-sm text-green-100 whitespace-pre-wrap max-h-96 overflow-y-auto">
                      {typeof tool.result === 'string' ? tool.result : JSON.stringify(tool.result, null, 2)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const StageIndicator = ({ stage, isActive }: StageIndicatorProps) => (
  <div className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-purple-500/30 text-purple-300' : 'bg-dark-600 text-gray-400'}`}>
    {stage}
  </div>
);

export const LoadingDots = ({ size = 'md' }: LoadingDotsProps) => {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className={`${sizeClasses[size]} bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]`}></div>
      <div className={`${sizeClasses[size]} bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]`}></div>
      <div className={`${sizeClasses[size]} bg-gray-400 rounded-full animate-pulse`}></div>
    </div>
  );
};

export default Message;
