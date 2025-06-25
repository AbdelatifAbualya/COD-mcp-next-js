// Types for the Enhanced COD Studio application

export interface Settings {
  reasoningEnhancement: 'standard' | 'adaptive' | 'research';
  verificationDepth: 'basic' | 'standard' | 'deep' | 'research';
  wordLimit: number;
  temperature: number;
  maxTokens: number;
  topP: number;
  mcpTools?: {
    codAnalysis: boolean;
    tavilySearch: boolean;
    enhancedResearch: boolean;
    memoryStore: boolean;
    verificationAnalysis: boolean;
  };
}

export interface Thread {
  id: string;
  title: string;
  timestamp: number;
  messageCount: number;
  lastActivity: number;
}

export interface MemoryItem {
  id: string;
  category: 'personal' | 'projects' | 'technical' | 'reflections';
  content: string;
  context: string;
  timestamp: number;
  priority: 'low' | 'medium' | 'high';
  metadata: Record<string, any>;
}

export interface ComplexityAnalysis {
  level: 'basic' | 'standard' | 'advanced' | 'research';
  score: number;
  indicators: string[];
  recommendedWordLimit: number;
  recommendedVerification: 'basic' | 'standard' | 'deep' | 'research';
  reasoning: string;
}

export interface CodStep {
  stepNumber: number;
  content: string;
  wordCount: number;
  timestamp: number;
}

export interface CodAnalysis {
  problemAnalysis: string;
  codSteps: CodStep[];
  initialReflection: string;
  draftSolution: string;
  stage: 1 | 2;
  complexity: ComplexityAnalysis;
}

export interface VerificationResult {
  stageVerification: string;
  errorDetection: string;
  alternativeAnalysis: string;
  confidenceAssessment: string;
  finalAnswer: string;
  reflectionSummary: string;
  confidence: number;
}

export interface ToolInvocation {
  toolName: string;
  args: Record<string, any>;
  result?: any;
  timestamp: number;
  duration?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'tool' | 'system' | 'data' | 'function';
  content: string;
  timestamp: number;
  threadId?: string;
  toolInvocations?: ToolInvocation[];
  codAnalysis?: CodAnalysis;
  verificationResult?: VerificationResult;
  metadata?: Record<string, any>;
}

export interface McpTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
  enabled: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StreamingResponse {
  type: 'text' | 'tool_call' | 'tool_result' | 'error';
  content: string;
  toolInvocation?: ToolInvocation;
}

// Enums for better type safety
export enum ReasoningMode {
  STANDARD = 'standard',
  ADAPTIVE = 'adaptive',
  RESEARCH = 'research'
}

export enum VerificationDepth {
  BASIC = 'basic',
  STANDARD = 'standard', 
  DEEP = 'deep',
  RESEARCH = 'research'
}

export enum MemoryCategory {
  PERSONAL = 'personal',
  PROJECTS = 'projects',
  TECHNICAL = 'technical',
  REFLECTIONS = 'reflections'
}

export enum ComplexityLevel {
  BASIC = 'basic',
  STANDARD = 'standard',
  ADVANCED = 'advanced',
  RESEARCH = 'research'
}
