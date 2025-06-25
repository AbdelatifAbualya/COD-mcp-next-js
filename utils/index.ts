// Utility functions for Enhanced COD Studio

import { ComplexityAnalysis, Settings, ComplexityLevel, VerificationDepth } from '../types';

/**
 * Analyze message complexity and determine optimal processing approach
 */
export function analyzeMessageComplexity(message: string): ComplexityAnalysis {
  const complexityIndicators = {
    mathematical: ['equation', 'formula', 'calculate', 'solve', 'proof', 'theorem', 'derivative', 'integral'],
    scientific: ['hypothesis', 'experiment', 'research', 'study', 'analysis', 'method', 'data', 'results'],
    logical: ['if', 'then', 'because', 'therefore', 'logic', 'reason', 'argument', 'premise', 'conclusion'],
    technical: ['code', 'algorithm', 'system', 'architecture', 'design', 'implementation', 'framework'],
    research: ['investigate', 'explore', 'examine', 'comprehensive', 'detailed', 'thorough', 'in-depth'],
    philosophical: ['ethics', 'moral', 'philosophy', 'meaning', 'purpose', 'existence', 'consciousness'],
    economic: ['market', 'economy', 'financial', 'cost', 'benefit', 'trade', 'investment', 'profit'],
    multistep: ['step by step', 'first', 'second', 'then', 'next', 'finally', 'process', 'procedure']
  };

  const lowerMessage = message.toLowerCase();
  let score = 0;
  const foundIndicators: string[] = [];

  // Check for complexity indicators
  Object.entries(complexityIndicators).forEach(([category, indicators]) => {
    const matches = indicators.filter(indicator => lowerMessage.includes(indicator));
    if (matches.length > 0) {
      score += matches.length;
      foundIndicators.push(...matches.map(match => `${category}: ${match}`));
    }
  });

  // Additional scoring factors
  const wordCount = message.split(' ').length;
  const sentenceCount = message.split(/[.!?]+/).length;
  const questionCount = (message.match(/\?/g) || []).length;
  
  if (wordCount > 200) score += 2;
  if (wordCount > 500) score += 3;
  if (sentenceCount > 10) score += 2;
  if (questionCount > 2) score += 1;

  // Determine complexity level
  let level: ComplexityLevel;
  let recommendedWordLimit: number;
  let recommendedVerification: VerificationDepth;
  let reasoning: string;

  if (score >= 15) {
    level = ComplexityLevel.RESEARCH;
    recommendedWordLimit = 200;
    recommendedVerification = VerificationDepth.RESEARCH;
    reasoning = 'High complexity with multiple indicators requiring research-grade analysis';
  } else if (score >= 10) {
    level = ComplexityLevel.ADVANCED;
    recommendedWordLimit = 150;
    recommendedVerification = VerificationDepth.DEEP;
    reasoning = 'Advanced complexity requiring deep analysis and verification';
  } else if (score >= 5) {
    level = ComplexityLevel.STANDARD;
    recommendedWordLimit = 100;
    recommendedVerification = VerificationDepth.STANDARD;
    reasoning = 'Standard complexity suitable for systematic CoD analysis';
  } else {
    level = ComplexityLevel.BASIC;
    recommendedWordLimit = 75;
    recommendedVerification = VerificationDepth.BASIC;
    reasoning = 'Basic complexity suitable for straightforward analysis';
  }

  return {
    level,
    score,
    indicators: foundIndicators,
    recommendedWordLimit,
    recommendedVerification,
    reasoning
  };
}

/**
 * Get adaptive settings based on message complexity
 */
export function getAdaptiveSettings(message: string, currentSettings: Settings): Settings {
  if (currentSettings.reasoningEnhancement !== 'adaptive') {
    return currentSettings;
  }

  const complexity = analyzeMessageComplexity(message);
  
  return {
    ...currentSettings,
    wordLimit: complexity.recommendedWordLimit,
    verificationDepth: complexity.recommendedVerification,
    temperature: complexity.level === ComplexityLevel.RESEARCH ? 0.2 : 
                 complexity.level === ComplexityLevel.ADVANCED ? 0.25 : 0.3,
    maxTokens: complexity.level === ComplexityLevel.RESEARCH ? 12000 :
               complexity.level === ComplexityLevel.ADVANCED ? 10000 : 8000
  };
}

/**
 * Format time ago string
 */
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate environment configuration
 */
export function validateEnvironment(): { isValid: boolean; missingVars: string[] } {
  const requiredVars = ['FIREWORKS_API_KEY'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  return {
    isValid: missingVars.length === 0,
    missingVars
  };
}

/**
 * Format CoD prompt for API
 */
export function formatCodPrompt(
  wordLimit: number,
  stage: 1 | 2 = 1,
  verificationDepth: VerificationDepth = VerificationDepth.STANDARD
): string {
  if (stage === 1) {
    return `You are DeepSeek V3-0324 in STAGE 1 of enhanced reasoning. Apply Chain of Draft (CoD) methodology with EXACTLY ${wordLimit} words per step.

CRITICAL INSTRUCTIONS:
1. First, analyze the problem complexity and structure
2. Then apply Chain of Draft (CoD) methodology with EXACTLY ${wordLimit} words per step
3. Provide initial reflection on your reasoning
4. End with a draft solution

FORMAT:
#### PROBLEM ANALYSIS
[Analyze complexity, identify key components, determine approach]

#### CHAIN OF DRAFT STEPS
CoD Step 1: [${wordLimit} words maximum]
CoD Step 2: [${wordLimit} words maximum]
CoD Step 3: [${wordLimit} words maximum]
[Continue as needed...]

#### INITIAL REFLECTION
[Reflect on reasoning quality, identify potential issues, assess confidence]

#### DRAFT SOLUTION
[Provide initial solution based on CoD analysis]

Remember: This is STAGE 1. Be thorough but prepare for STAGE 2 verification.`;
  } else {
    return `You are DeepSeek V3-0324 in STAGE 2 of enhanced reasoning. Perform ${verificationDepth} verification and provide the final comprehensive answer.

Your task:
1. CRITICALLY EXAMINE the Stage 1 analysis and CoD steps
2. VERIFY each reasoning step for accuracy and logical consistency
3. CHECK for mathematical errors, logical fallacies, or incomplete reasoning
4. EXPLORE alternative approaches if needed
5. ASSESS confidence levels and identify uncertainties
6. PROVIDE a comprehensive final answer

VERIFICATION CHECKLIST:
□ Are all CoD steps logically sound?
□ Are there any mathematical or computational errors?
□ Are assumptions clearly stated and reasonable?
□ Have alternative approaches been considered?
□ Is the reasoning complete and comprehensive?
□ Are there any gaps or weaknesses in the logic?

FORMAT:
#### STAGE 2 VERIFICATION
[Critical analysis of Stage 1 reasoning]

#### ERROR DETECTION & CORRECTION
[Identify and correct any errors found]

#### ALTERNATIVE APPROACH ANALYSIS
[Consider alternative solution paths]

#### CONFIDENCE ASSESSMENT
[Evaluate confidence levels and identify uncertainties]

#### FINAL COMPREHENSIVE ANSWER
[Definitive, well-reasoned solution with full explanation]

#### REFLECTION SUMMARY
[Key insights, lessons learned, and reasoning quality assessment]`;
  }
}

/**
 * Parse markdown content safely
 */
export function parseMarkdown(content: string): string {
  // This is a simplified markdown parser
  // In production, you'd use a proper library like marked
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

/**
 * Sanitize HTML content
 */
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production use a proper library
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/g, '');
}

/**
 * Export thread data as JSON
 */
export function exportThreadData(messages: any[], threadInfo: any): string {
  const exportData = {
    thread: threadInfo,
    messages: messages,
    exportedAt: new Date().toISOString(),
    version: '1.0.0'
  };
  
  return JSON.stringify(exportData, null, 2);
}

/**
 * Calculate confidence score based on various factors
 */
export function calculateConfidenceScore(
  complexity: ComplexityAnalysis,
  verificationDepth: VerificationDepth,
  wordCount: number,
  targetWordLimit: number
): number {
  let confidence = 0.5; // Base confidence

  // Complexity factor
  const complexityBonus = {
    [ComplexityLevel.BASIC]: 0.1,
    [ComplexityLevel.STANDARD]: 0.15,
    [ComplexityLevel.ADVANCED]: 0.2,
    [ComplexityLevel.RESEARCH]: 0.25
  };
  confidence += complexityBonus[complexity.level];

  // Verification depth factor
  const verificationBonus = {
    [VerificationDepth.BASIC]: 0.1,
    [VerificationDepth.STANDARD]: 0.15,
    [VerificationDepth.DEEP]: 0.2,
    [VerificationDepth.RESEARCH]: 0.25
  };
  confidence += verificationBonus[verificationDepth];

  // Word count adherence factor
  const wordRatio = Math.min(wordCount / targetWordLimit, 1);
  confidence += wordRatio * 0.1;

  return Math.min(confidence, 1.0);
}
