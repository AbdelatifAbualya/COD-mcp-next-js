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
  // Check if content contains CoD structure
  const hasStage1 = content.includes('STAGE 1: ANALYSIS & DRAFT');
  const hasStage2 = content.includes('STAGE 2: VERIFICATION & FINAL ANSWER');
  const hasProblemAnalysis = content.includes('#### PROBLEM ANALYSIS');
  const hasCoDSteps = content.includes('CoD Step');
  
  if (!hasStage1 && !hasStage2 && !hasProblemAnalysis && !hasCoDSteps) {
    // Regular content, render normally
    return <div dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />;
  }

  // Parse CoD structured content
  const sections = content.split('---');
  
  return (
    <div className="cod-analysis-container space-y-6">
      {sections.map((section, index) => {
        if (section.includes('STAGE 1: ANALYSIS & DRAFT')) {
          return <Stage1Renderer key={index} content={section} />;
        } else if (section.includes('STAGE 2: VERIFICATION & FINAL ANSWER')) {
          return <Stage2Renderer key={index} content={section} />;
        } else if (section.includes('Enhanced Chain of Draft Analysis')) {
          return <CoDHeaderRenderer key={index} content={section} />;
        } else {
          return <div key={index} dangerouslySetInnerHTML={{ __html: formatMarkdown(section) }} />;
        }
      })}
    </div>
  );
};

// Stage 1 Renderer
const Stage1Renderer = ({ content }: { content: string }) => {
  const parts = content.split('####');
  
  return (
    <div className="stage-1-container bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 animate-fadeIn">
      <div className="stage-header flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">1</div>
        <h3 className="text-lg font-semibold text-blue-300">STAGE 1: ANALYSIS & DRAFT</h3>
        <div className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">Problem Analysis</div>
      </div>
      
      {parts.map((part, index) => {
        if (part.includes('PROBLEM ANALYSIS')) {
          return (
            <div key={index} className="problem-analysis bg-blue-800/30 rounded-lg p-4 mb-4">
              <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                <span>📊</span> Problem Analysis
              </h4>
              <div className="text-blue-100 text-sm" dangerouslySetInnerHTML={{ __html: formatMarkdown(part.replace('PROBLEM ANALYSIS', '')) }} />
            </div>
          );
        } else if (part.includes('CHAIN OF DRAFT STEPS')) {
          return <CoDStepsRenderer key={index} content={part} />;
        } else if (part.includes('INITIAL REFLECTION')) {
          return (
            <div key={index} className="initial-reflection bg-purple-800/30 rounded-lg p-4 mb-4">
              <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                <span>🤔</span> Initial Reflection
              </h4>
              <div className="text-purple-100 text-sm" dangerouslySetInnerHTML={{ __html: formatMarkdown(part.replace('INITIAL REFLECTION', '')) }} />
            </div>
          );
        } else if (part.includes('DRAFT SOLUTION')) {
          return (
            <div key={index} className="draft-solution bg-green-800/30 rounded-lg p-4">
              <h4 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
                <span>📝</span> Draft Solution
              </h4>
              <div className="text-green-100 text-sm" dangerouslySetInnerHTML={{ __html: formatMarkdown(part.replace('DRAFT SOLUTION', '')) }} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

// Stage 2 Renderer
const Stage2Renderer = ({ content }: { content: string }) => {
  const parts = content.split('####');
  
  return (
    <div className="stage-2-container bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 animate-fadeIn">
      <div className="stage-header flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">2</div>
        <h3 className="text-lg font-semibold text-purple-300">STAGE 2: VERIFICATION & FINAL ANSWER</h3>
        <div className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full">Deep Verification</div>
      </div>
      
      {parts.map((part, index) => {
        if (part.includes('STAGE 2 VERIFICATION')) {
          return (
            <div key={index} className="verification bg-purple-800/30 rounded-lg p-4 mb-4">
              <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                <span>🔍</span> Stage 2 Verification
              </h4>
              <div className="text-purple-100 text-sm" dangerouslySetInnerHTML={{ __html: formatMarkdown(part.replace('STAGE 2 VERIFICATION', '')) }} />
            </div>
          );
        } else if (part.includes('ERROR DETECTION & CORRECTION')) {
          return (
            <div key={index} className="error-detection bg-red-800/30 rounded-lg p-4 mb-4">
              <h4 className="text-red-300 font-semibold mb-2 flex items-center gap-2">
                <span>🚨</span> Error Detection & Correction
              </h4>
              <div className="text-red-100 text-sm" dangerouslySetInnerHTML={{ __html: formatMarkdown(part.replace('ERROR DETECTION & CORRECTION', '')) }} />
            </div>
          );
        } else if (part.includes('ALTERNATIVE APPROACH ANALYSIS')) {
          return (
            <div key={index} className="alternative-analysis bg-yellow-800/30 rounded-lg p-4 mb-4">
              <h4 className="text-yellow-300 font-semibold mb-2 flex items-center gap-2">
                <span>🔄</span> Alternative Approach Analysis
              </h4>
              <div className="text-yellow-100 text-sm" dangerouslySetInnerHTML={{ __html: formatMarkdown(part.replace('ALTERNATIVE APPROACH ANALYSIS', '')) }} />
            </div>
          );
        } else if (part.includes('CONFIDENCE ASSESSMENT')) {
          return (
            <div key={index} className="confidence-assessment bg-teal-800/30 rounded-lg p-4 mb-4">
              <h4 className="text-teal-300 font-semibold mb-2 flex items-center gap-2">
                <span>📊</span> Confidence Assessment
              </h4>
              <div className="text-teal-100 text-sm" dangerouslySetInnerHTML={{ __html: formatMarkdown(part.replace('CONFIDENCE ASSESSMENT', '')) }} />
            </div>
          );
        } else if (part.includes('FINAL COMPREHENSIVE ANSWER')) {
          return (
            <div key={index} className="final-answer bg-green-800/30 rounded-lg p-4 mb-4 border-2 border-green-500/50">
              <h4 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
                <span>✅</span> Final Comprehensive Answer
              </h4>
              <div className="text-green-100" dangerouslySetInnerHTML={{ __html: formatMarkdown(part.replace('FINAL COMPREHENSIVE ANSWER', '')) }} />
            </div>
          );
        } else if (part.includes('REFLECTION SUMMARY')) {
          return (
            <div key={index} className="reflection-summary bg-indigo-800/30 rounded-lg p-4">
              <h4 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2">
                <span>💭</span> Reflection Summary
              </h4>
              <div className="text-indigo-100 text-sm" dangerouslySetInnerHTML={{ __html: formatMarkdown(part.replace('REFLECTION SUMMARY', '')) }} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

// CoD Steps Renderer
const CoDStepsRenderer = ({ content }: { content: string }) => {
  const steps = content.split(/CoD Step \d+:/);
  
  return (
    <div className="cod-steps bg-slate-800/30 rounded-lg p-4 mb-4">
      <h4 className="text-slate-300 font-semibold mb-3 flex items-center gap-2">
        <span>🧠</span> Chain of Draft Steps
      </h4>
      <div className="space-y-3">
        {steps.slice(1).map((step, index) => (
          <div key={index} className="cod-step bg-slate-700/50 rounded-lg p-3 border-l-4 border-blue-500">
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
};

// CoD Header Renderer
const CoDHeaderRenderer = ({ content }: { content: string }) => {
  return (
    <div className="cod-header bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">🧠</span>
        </div>
        <h2 className="text-xl font-bold text-white">Enhanced Chain of Draft Analysis</h2>
      </div>
      <div className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
    </div>
  );
};

// Simple markdown formatter
const formatMarkdown = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
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
