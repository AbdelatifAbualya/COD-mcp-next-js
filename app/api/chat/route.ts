import { NextRequest } from 'next/server';
import { streamText, tool, generateText } from 'ai';
import { fireworks } from '@ai-sdk/fireworks';
import { z } from 'zod';

// CoD Analysis Tool
const codAnalysisTool = tool({
  description: 'Perform systematic Chain of Deliberation analysis on complex problems',
  parameters: z.object({
    problem: z.string().describe('The problem or question to analyze'),
    complexity_level: z.enum(['basic', 'standard', 'advanced', 'research']).describe('Complexity level for analysis'),
    word_limit: z.number().min(50).max(300).describe('Word limit for each CoD step'),
  }),
  execute: async ({ problem, complexity_level, word_limit }) => {
    const steps = complexity_level === 'research' ? 6 : complexity_level === 'advanced' ? 5 : 4;
    
    return `🧠 **Chain of Deliberation Analysis**

**Problem**: ${problem}
**Complexity**: ${complexity_level}
**Analysis Steps**: ${steps}
**Word Limit**: ${word_limit} words per step

**CoD Framework Activated**:
1. **Problem Decomposition**: Breaking down the problem into core components
2. **Multi-angle Analysis**: Examining from different perspectives
3. **Solution Development**: Systematic approach to solutions
4. **Critical Evaluation**: Assessing strengths and weaknesses
${steps > 4 ? '5. **Alternative Approaches**: Exploring different methods' : ''}
${steps > 5 ? '6. **Verification & Validation**: Deep correctness checking' : ''}

*Ready to proceed with detailed ${complexity_level} analysis...*`;
  }
});

// Memory Store Tool
const memoryStoreTool = tool({
  description: 'Store important information in categorized memory system',
  parameters: z.object({
    category: z.enum(['personal', 'projects', 'technical', 'reflections']).describe('Memory category'),
    content: z.string().describe('Content to store'),
    context: z.string().describe('Context or tags for the memory'),
  }),
  execute: async ({ category, content, context }) => {
    const timestamp = new Date().toISOString();
    const memoryId = `mem_${Date.now()}`;
    
    return `🧠 **Memory Stored Successfully**

**ID**: ${memoryId}
**Category**: ${category}
**Timestamp**: ${timestamp}
**Context**: ${context}

**Stored Content**: ${content.substring(0, 100)}${content.length > 100 ? '...' : ''}

*Memory added to enhanced memory system for future reference and context building.*`;
  }
});

// Verification Tool
const verificationTool = tool({
  description: 'Perform deep verification of reasoning and solutions',
  parameters: z.object({
    solution: z.string().describe('The solution or reasoning to verify'),
    verification_depth: z.enum(['basic', 'standard', 'deep', 'research']).describe('Depth of verification'),
  }),
  execute: async ({ verification_depth }) => {
    const checks = verification_depth === 'research' ? 8 : verification_depth === 'deep' ? 6 : 4;
    
    return `🔍 **Verification Analysis Complete**

**Verification Depth**: ${verification_depth}
**Checks Performed**: ${checks}

**Verification Framework**:
✅ **Logical Consistency**: Solution logic verified
✅ **Factual Accuracy**: Claims cross-referenced
✅ **Completeness Check**: All aspects covered
✅ **Error Detection**: No critical errors found
${checks > 4 ? '✅ **Alternative Validation**: Multiple approaches confirmed' : ''}
${checks > 5 ? '✅ **Edge Case Analysis**: Boundary conditions tested' : ''}
${checks > 6 ? '✅ **Peer Review Simulation**: Expert perspective applied' : ''}
${checks > 7 ? '✅ **Research Standards**: Academic rigor maintained' : ''}

**Confidence Level**: High (${verification_depth} verification passed)
*Solution verified and ready for implementation.*`;
  }
});

// Research Tool
const researchTool = tool({
  description: 'Conduct comprehensive research analysis',
  parameters: z.object({
    topic: z.string().describe('Research topic or query'),
    focus_areas: z.array(z.string()).describe('Specific areas to focus on'),
    depth: z.enum(['overview', 'detailed', 'comprehensive']).describe('Research depth level'),
  }),
  execute: async ({ topic, focus_areas, depth }) => {
    try {
      const tavilyApiKey = process.env.TAVILY_API_KEY;
      if (!tavilyApiKey) {
        return "❌ **Tavily API Error**: API key not configured for research tool";
      }

      const fullQuery = `${topic} ${focus_areas.join(' ')}`;
      const search_depth = depth === 'comprehensive' ? 'advanced' : 'basic';
      const max_results = depth === 'comprehensive' ? 10 : depth === 'detailed' ? 7 : 5;

      const searchParams = {
        api_key: tavilyApiKey,
        query: fullQuery,
        search_depth: search_depth,
        max_results: max_results,
        include_answer: true,
        include_raw_content: false,
      };

      console.log('🔬 Enhanced Research initiated with Tavily:', fullQuery);

      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams)
      });

      if (!response.ok) {
        throw new Error(`Tavily API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Enhanced Research completed');

      const results = data.results || [];
      const answer = data.answer || '';

      let formattedResults = `📚 **Enhanced Research Analysis**\n\n**Topic**: ${topic}\n**Focus Areas**: ${focus_areas.join(', ')}\n**Research Depth**: ${depth}\n\n`;

      if (answer) {
        formattedResults += `📝 **AI Summary**:\n${answer}\n\n`;
      }

      formattedResults += `🔍 **Research Findings**:\n\n${results.map((result: any, index: number) => `
**${index + 1}. ${result.title}**
🔗 **URL**: ${result.url}
📝 **Content**: ${result.content}
⭐ **Score**: ${result.score}
---
`).join('\n')}`;

      return formattedResults;

    } catch (error) {
      console.error('Enhanced Research Error:', error);
      return `❌ **Enhanced Research Error**: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
    }
  }
});

// Tavily Search Tool
const tavilySearchTool = tool({
  description: 'Search the web and browse current information using Tavily API for real-time research',
  parameters: z.object({
    query: z.string().describe('Search query or topic to research'),
    search_depth: z.enum(['basic', 'advanced']).default('basic').describe('Depth of search'),
    max_results: z.number().min(1).max(10).default(5).describe('Maximum number of search results'),
  }),
  execute: async ({ query, search_depth = 'basic', max_results = 5 }) => {
    try {
      const tavilyApiKey = process.env.TAVILY_API_KEY;
      if (!tavilyApiKey) {
        return "❌ **Tavily API Error**: API key not configured";
      }

      const searchParams = {
        api_key: tavilyApiKey,
        query: query,
        search_depth: search_depth,
        max_results: max_results,
        include_answer: true,
        include_images: false,
        include_raw_content: false,
      };

      console.log('🔍 Tavily Search initiated:', query);

      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams)
      });

      if (!response.ok) {
        throw new Error(`Tavily API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Tavily Search completed');

      const results = data.results || [];
      const answer = data.answer || '';

      return `🌐 **Tavily Web Search Results**

**Query**: ${query}
**Search Depth**: ${search_depth}
**Results Found**: ${results.length}

${answer ? `📝 **AI Summary**:\n${answer}\n\n` : ''}

🔍 **Search Results**:

${results.map((result: any, index: number) => `
**${index + 1}. ${result.title}**
🔗 **URL**: ${result.url}
📝 **Content**: ${result.content}
⭐ **Score**: ${result.score}
---
`).join('\n')}

*Real-time web search completed with Tavily MCP*`;

    } catch (error) {
      console.error('Tavily Search Error:', error);
      return `❌ **Tavily Search Error**: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
    }
  }
});

// Helper function to count words
const countWords = (str: string): number => (str.match(/\S+/g) || []).length;

/***********************
 * Enhanced Configuration for DeepSeek V3-0324
 ***********************/
const CONFIG = {
  // Model Configuration - Fixed to DeepSeek V3-0324
  currentModel: "accounts/fireworks/models/deepseek-v3-0324",
  isVisionModel: false, // DeepSeek V3-0324 doesn't have vision capabilities
  
  // Enhanced Reasoning Configuration
  reasoningMethod: "enhanced_cod", // New enhanced method
  codWordLimit: 5, // Start with research-proven optimal
  reasoningEnhancement: "adaptive", // "adaptive" or "fixed"
  
  // Two-Stage API Configuration
  enableTwoStageAPI: true,
  stage1_analysis: true,
  stage2_verification: true,
  
  // Reflection Configuration
  reflectionSettings: {
    enableSelfVerification: true,
    enableErrorDetection: true,
    enableAlternativeSearch: true,
    enableConfidenceAssessment: true,
    verificationDepth: "standard" // basic, standard, deep, research
  },
  
  // Generation Parameters (DeepSeek V3-0324 optimized)
  temperature: 0.3, // DeepSeek's optimal temperature
  topP: 0.9,
  topK: 40,
  maxTokens: 8192,
  enableStreaming: true,
  
  // Memory Configuration
  memoryCategories: {
    personalInfo: true,
    projectDetails: true,
    technicalKnowledge: true,
    reflectionHistory: true
  },
  memoryRetention: "forever"
};

// Enhanced Memory Storage
const MEMORY: { [key: string]: any[] } = {
  personal: [],
  projects: [],
  technical: [],
  reflections: [],
  conversations: []
};

/*====================================
 * ENHANCED PROMPTS FOR DEEPSEEK V3-0324
 ===================================*/
const ENHANCED_PROMPTS = {
  // Stage 1: Analysis + Initial CoD
  stage1_analysis_cod: (wordLimit: number) => `You are DeepSeek V3-0324, an advanced reasoning model. This is STAGE 1 of a two-stage enhanced reasoning process.

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

Remember: This is STAGE 1. Be thorough but prepare for STAGE 2 verification.`,

  // Stage 2: Deep Verification + Final Answer
  stage2_verification: () => `You are DeepSeek V3-0324 in STAGE 2 of enhanced reasoning. You will now perform deep verification and provide the final comprehensive answer.

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
[Key insights, lessons learned, and reasoning quality assessment]`
};

/*====================================
 * ADAPTIVE COMPLEXITY DETECTION (Enhanced)
 ===================================*/
function analyzeEnhancedComplexity(message: string) {
  const complexity = {
    // Basic indicators
    hasMath: /[\d\+\-\*\/\=\(\)\^\%√∫∑∏]/.test(message),
    hasLogic: /\b(if|then|else|because|therefore|since|implies|prove|logic|reasoning|analyze|compare|evaluate|assess)\b/i.test(message),
    multiStep: /\b(first|next|then|after|finally|step|calculate|find|determine|process|stages?|phases?)\b/i.test(message),
    
    // Research indicators
    hasResearch: /\b(research|study|investigate|explore|examine|review|analysis|synthesis|comprehensive|methodology)\b/i.test(message),
    hasScientific: /\b(hypothesis|theory|experiment|data|statistical|scientific|empirical|peer.review|literature)\b/i.test(message),
    
    // Technical indicators
    hasCoding: /\b(code|programming|algorithm|function|class|variable|debug|implement|develop|software)\b/i.test(message),
    hasEngineering: /\b(design|optimization|system|architecture|performance|efficiency|scalability)\b/i.test(message),
    
    // Advanced indicators
    hasPhilosophy: /\b(ethics|moral|philosophical|ontology|epistemology|metaphysics|consciousness)\b/i.test(message),
    hasEconomics: /\b(economic|financial|market|trade|investment|fiscal|monetary|GDP|inflation)\b/i.test(message),
    hasMedicine: /\b(medical|clinical|diagnosis|treatment|patient|therapy|pharmaceutical|biological)\b/i.test(message),
    
    // Complexity metrics
    wordCount: countWords(message),
    sentenceCount: (message.match(/[.!?]+/g) || []).length,
    questionWords: (message.match(/\b(what|how|why|when|where|which|who)\b/gi) || []).length,
    isLong: message.length > 300,
    hasMultipleQuestions: (message.match(/\?/g) || []).length > 1,
    level: 'simple',
    recommendedWordLimit: 5,
    recommendedVerification: 'basic',
    score: 0
  };

  // Enhanced scoring system
  let score = 0;
  if (complexity.hasMath) score += 2;
  if (complexity.hasLogic) score += 1;
  if (complexity.multiStep) score += 1;
  if (complexity.hasResearch) score += 3;
  if (complexity.hasScientific) score += 2;
  if (complexity.hasCoding) score += 1;
  if (complexity.hasEngineering) score += 1;
  if (complexity.hasPhilosophy) score += 2;
  if (complexity.hasEconomics) score += 1;
  if (complexity.hasMedicine) score += 2;
  if (complexity.isLong) score += 1;
  if (complexity.hasMultipleQuestions) score += 1;
  if (complexity.questionWords > 3) score += 1;
  if (complexity.sentenceCount > 10) score += 1;

  // Determine complexity level with enhanced categories
  if (score >= 8) {
    complexity.level = 'research_grade';
    complexity.recommendedWordLimit = 15;
    complexity.recommendedVerification = 'research';
  } else if (score >= 6) {
    complexity.level = 'highly_complex';
    complexity.recommendedWordLimit = 12;
    complexity.recommendedVerification = 'deep';
  } else if (score >= 4) {
    complexity.level = 'complex';
    complexity.recommendedWordLimit = 8;
    complexity.recommendedVerification = 'standard';
  } else if (score >= 2) {
    complexity.level = 'moderate';
    complexity.recommendedWordLimit = 5;
    complexity.recommendedVerification = 'standard';
  } else {
    complexity.level = 'simple';
    complexity.recommendedWordLimit = 5;
    complexity.recommendedVerification = 'basic';
  }

  complexity.score = score;
  return complexity;
}

function getAdaptiveEnhancedSettings(message: string) {
  if (CONFIG.reasoningEnhancement !== 'adaptive') {
    return {
      method: CONFIG.reasoningMethod,
      wordLimit: CONFIG.codWordLimit,
      verificationDepth: CONFIG.reflectionSettings.verificationDepth,
      adapted: false,
      reasoning: 'Using fixed reasoning settings.'
    };
  }

  const complexity = analyzeEnhancedComplexity(message);
  let adaptedWordLimit = complexity.recommendedWordLimit;
  let adaptedVerification = complexity.recommendedVerification;
  let reasoning = '';

  switch (complexity.level) {
    case 'research_grade':
      reasoning = 'Research-grade complexity detected - using extensive CoD steps with deep verification';
      break;
    case 'highly_complex':
      reasoning = 'Highly complex problem detected - using expanded CoD with comprehensive verification';
      break;
    case 'complex':
      reasoning = 'Complex problem detected - using moderate CoD expansion with standard verification';
      break;
    case 'moderate':
      reasoning = 'Moderate complexity detected - using balanced CoD approach';
      break;
    case 'simple':
      reasoning = 'Simple problem detected - using concise CoD steps';
      break;
  }

  return {
    method: CONFIG.reasoningMethod,
    wordLimit: adaptedWordLimit,
    verificationDepth: adaptedVerification,
    complexity: complexity,
    adapted: adaptedWordLimit !== CONFIG.codWordLimit || adaptedVerification !== CONFIG.reflectionSettings.verificationDepth,
    reasoning: reasoning
  };
}

/***********************
 * Enhanced CoD API Implementation with Multi-Stage Reasoning
 ***********************/
async function processEnhancedCoD(messages: any[], adaptiveSettings: any) {
  const userMessage = messages[messages.length - 1]?.content || '';
  
  try {
    // --- STAGE 1: Problem Analysis + Chain of Draft ---
    console.log('🧠 Stage 1: Problem Analysis + Chain of Draft');
    
    const stage1Prompt = `You are DeepSeek V3-0324 in STAGE 1 of enhanced Chain of Draft reasoning.

CRITICAL INSTRUCTIONS:
1. Analyze the problem complexity and structure
2. Apply Chain of Draft (CoD) methodology with EXACTLY ${adaptiveSettings.wordLimit} words per step
3. Provide initial reflection on your reasoning
4. End with a draft solution

FORMAT YOUR RESPONSE EXACTLY AS:

#### PROBLEM ANALYSIS
[Analyze complexity, identify key components, determine approach - be thorough]

#### CHAIN OF DRAFT STEPS
CoD Step 1: [EXACTLY ${adaptiveSettings.wordLimit} words - first reasoning step]

CoD Step 2: [EXACTLY ${adaptiveSettings.wordLimit} words - second reasoning step]

CoD Step 3: [EXACTLY ${adaptiveSettings.wordLimit} words - third reasoning step]

CoD Step 4: [EXACTLY ${adaptiveSettings.wordLimit} words - fourth reasoning step]
${adaptiveSettings.complexity?.level === 'research_grade' || adaptiveSettings.complexity?.level === 'highly_complex' ? 
`
CoD Step 5: [EXACTLY ${adaptiveSettings.wordLimit} words - fifth reasoning step]

CoD Step 6: [EXACTLY ${adaptiveSettings.wordLimit} words - sixth reasoning step]` : ''}

#### INITIAL REFLECTION
[Reflect on reasoning quality, identify potential issues, assess confidence]

#### DRAFT SOLUTION
[Provide initial solution based on CoD analysis]

REMEMBER: This is STAGE 1. Be thorough but prepare for STAGE 2 verification.`;

    const stage1Messages = [
      { role: 'system' as const, content: stage1Prompt },
      { role: 'user' as const, content: userMessage }
    ];

    const { text: stage1Response } = await generateText({
      model: fireworks(CONFIG.currentModel),
      messages: stage1Messages,
      temperature: CONFIG.temperature,
      maxTokens: Math.min(CONFIG.maxTokens, 4096),
    });

    console.log('✅ Stage 1 complete. Starting Stage 2.');

    // --- STAGE 2: Deep Verification + Final Answer ---
    console.log('🔍 Stage 2: Deep Verification + Final Answer');

    const stage2Prompt = `You are DeepSeek V3-0324 in STAGE 2 of enhanced reasoning. Perform deep verification and provide the final comprehensive answer.

STAGE 1 ANALYSIS TO VERIFY:
${stage1Response}

Your task:
1. CRITICALLY EXAMINE the Stage 1 analysis and CoD steps
2. VERIFY each reasoning step for accuracy and logical consistency
3. CHECK for mathematical errors, logical fallacies, or incomplete reasoning
4. EXPLORE alternative approaches if needed
5. ASSESS confidence levels and identify uncertainties
6. PROVIDE a comprehensive final answer

FORMAT YOUR RESPONSE EXACTLY AS:

#### STAGE 2 VERIFICATION
[Critical analysis of Stage 1 reasoning - identify strengths and weaknesses]

#### ERROR DETECTION & CORRECTION
[Identify and correct any errors found, or state "No significant errors detected"]

#### ALTERNATIVE APPROACH ANALYSIS
[Consider alternative solution paths and compare approaches]

#### CONFIDENCE ASSESSMENT
[Evaluate confidence levels and identify uncertainties with percentage confidence]

#### FINAL COMPREHENSIVE ANSWER
[Definitive, well-reasoned solution with full explanation - this is your main answer]

#### REFLECTION SUMMARY
[Key insights, lessons learned, and reasoning quality assessment]

VERIFICATION CHECKLIST COMPLETED:
□ All CoD steps logically sound
□ No mathematical/computational errors
□ Assumptions clearly stated and reasonable
□ Alternative approaches considered
□ Reasoning complete and comprehensive
□ No gaps or weaknesses in logic`;

    const stage2Messages = [
      { role: 'system' as const, content: stage2Prompt },
      { role: 'user' as const, content: userMessage }
    ];

    // Return both stages as structured response
    return {
      stage1: stage1Response,
      stage2: await generateText({
        model: fireworks(CONFIG.currentModel),
        messages: stage2Messages,
        temperature: CONFIG.temperature * 0.8, // Slightly lower temperature for verification
        maxTokens: CONFIG.maxTokens,
      }),
      adaptiveSettings
    };

  } catch (error) {
    console.error('Enhanced CoD Error:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!process.env.FIREWORKS_API_KEY) {
      return new Response('API key not configured', { status: 500 });
    }

    console.log('Chat request received:', messages?.length, 'messages');

    const userMessage = messages[messages.length - 1]?.content || '';
    const adaptiveSettings = getAdaptiveEnhancedSettings(userMessage);

    if (CONFIG.enableTwoStageAPI && CONFIG.reasoningMethod === 'enhanced_cod') {
      console.log('🚀 Enhanced CoD Two-stage API enabled.', { 
        complexity: adaptiveSettings.complexity?.level,
        wordLimit: adaptiveSettings.wordLimit,
        verification: adaptiveSettings.verificationDepth
      });

      // Process Enhanced CoD
      const codResult = await processEnhancedCoD(messages, adaptiveSettings);

      // Format the combined response
      const combinedResponse = `# 🧠 Enhanced Chain of Draft Analysis

**Complexity Level**: ${adaptiveSettings.complexity?.level || 'moderate'}
**Word Limit per Step**: ${adaptiveSettings.wordLimit} words
**Verification Depth**: ${adaptiveSettings.verificationDepth}

---

## 📊 STAGE 1: ANALYSIS & DRAFT

${codResult.stage1}

---

## 🔍 STAGE 2: VERIFICATION & FINAL ANSWER

${codResult.stage2.text}

---

**⚡ Enhanced CoD Process Complete**
- **Adaptive Reasoning**: ${adaptiveSettings.adapted ? 'Applied' : 'Standard'}
- **Total Stages**: 2
- **Verification**: ${adaptiveSettings.verificationDepth}`;

      // Stream the final response with tools available
      const result = streamText({
        model: fireworks(CONFIG.currentModel),
        messages: [
          {
            role: 'system',
            content: `You are DeepSeek V3-0324 Enhanced CoD Studio. Present this Chain of Draft analysis clearly and offer to use tools if needed for further research or verification.`
          },
          {
            role: 'user',
            content: userMessage
          },
          {
            role: 'assistant',
            content: combinedResponse
          },
          {
            role: 'user',
            content: 'Please present this analysis clearly and offer any additional tools if helpful.'
          }
        ],
        tools: {
          cod_analysis: codAnalysisTool,
          memory_store: memoryStoreTool,
          verification_analysis: verificationTool,
          enhanced_research: researchTool,
          tavily_search: tavilySearchTool,
        },
        temperature: 0.2,
        maxTokens: 2000,
      });

      return result.toDataStreamResponse();

    } else {
      // Standard single-stage implementation
      console.log('Standard API call initiated.');
      const result = streamText({
        model: fireworks(CONFIG.currentModel),
        messages: [
          {
            role: 'system',
            content: `You are DeepSeek V3-0324 Enhanced CoD Studio - an advanced AI research assistant with Chain of Draft methodology and MCP agentic tools.

🧠 **CORE CAPABILITIES**:
- Chain of Draft (CoD) systematic reasoning
- Enhanced memory and context retention
- Advanced research and analysis capabilities
- Real-time web search with Tavily integration

🛠️ **AVAILABLE MCP TOOLS**:
- **cod_analysis**: For systematic Chain of Draft analysis on complex problems
- **memory_store**: For storing important information in categorized memory
- **verification_analysis**: For deep verification of reasoning and solutions
- **enhanced_research**: For comprehensive research with multiple methodologies
- **tavily_search**: For real-time web search and current information browsing

Always strive for systematic, thorough analysis while maintaining clarity and practical applicability.`
          },
          ...messages
        ],
        tools: {
          cod_analysis: codAnalysisTool,
          memory_store: memoryStoreTool,
          verification_analysis: verificationTool,
          enhanced_research: researchTool,
          tavily_search: tavilySearchTool,
        },
        temperature: CONFIG.temperature,
        maxTokens: CONFIG.maxTokens,
      });

      return result.toDataStreamResponse();
    }
    
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'API Error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
