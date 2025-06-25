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

export function Message({ role, content, timestamp, toolInvocations, children }: MessageProps) {
  const getMessageTypeClass = (role: string) => {
    switch (role) {
      case 'user':
        return 'message user bg-blue-900/20 border border-blue-500/30 ml-8';
      case 'assistant':
        return 'message assistant bg-purple-900/20 border border-purple-500/30 mr-8';
      case 'tool':
        return 'message tool bg-green-900/20 border border-green-500/30 font-mono text-sm';
      default:
        return 'message bg-gray-900/20 border border-gray-500/30';
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
            {content}
          </div>
        )}

        {/* Tool Invocations */}
        {toolInvocations && toolInvocations.length > 0 && (
          <div className="mt-3 space-y-2">
            {toolInvocations.map((tool, index) => (
              <div key={index} className="bg-green-900/20 border border-green-500/30 rounded p-3">
                <div className="text-sm font-semibold text-green-300 mb-2">
                  🔧 Tool: {tool.toolName}
                </div>
                <pre className="text-xs text-green-200 whitespace-pre-wrap">
                  {JSON.stringify(tool.args, null, 2)}
                </pre>
                {tool.result && (
                  <div className="mt-2 pt-2 border-t border-green-500/20">
                    <div className="text-xs text-green-300">Result:</div>
                    <pre className="text-xs text-green-200 whitespace-pre-wrap">
                      {JSON.stringify(tool.result, null, 2)}
                    </pre>
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
