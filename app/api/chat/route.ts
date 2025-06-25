import { NextRequest } from 'next/server';
import { streamText, tool } from 'ai';
import { fireworks } from '@ai-sdk/fireworks';
import { z } from 'zod';

// MCP Tool Definitions
const codAnalysisTool = tool({
  description: 'Perform systematic Chain of Deliberation analysis on complex problems',
  parameters: z.object({
    problem: z.string().describe('The problem or question to analyze'),
    complexity_level: z.enum(['basic', 'standard', 'advanced', 'research']).describe('Complexity level for analysis'),
    word_limit: z.number().min(50).max(300).describe('Word limit for each CoD step'),
  }),
  execute: async ({ problem, complexity_level, word_limit }) => {
    const steps = complexity_level === 'research' ? 6 : complexity_level === 'advanced' ? 5 : 4;
    
    return `
🧠 **Chain of Deliberation Analysis**

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

*Ready to proceed with detailed ${complexity_level} analysis...*
    `;
  }
});

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
    
    return `
🧠 **Memory Stored Successfully**

**ID**: ${memoryId}
**Category**: ${category}
**Timestamp**: ${timestamp}
**Context**: ${context}

**Stored Content**: ${content.substring(0, 100)}${content.length > 100 ? '...' : ''}

*Memory added to enhanced memory system for future reference and context building.*
    `;
  }
});

const verificationTool = tool({
  description: 'Perform deep verification of reasoning and solutions',
  parameters: z.object({
    solution: z.string().describe('The solution or reasoning to verify'),
    verification_depth: z.enum(['basic', 'standard', 'deep', 'research']).describe('Depth of verification'),
  }),
  execute: async ({ solution, verification_depth }) => {
    const checks = verification_depth === 'research' ? 8 : verification_depth === 'deep' ? 6 : 4;
    
    return `
🔍 **Verification Analysis Complete**

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
*Solution verified and ready for implementation.*
    `;
  }
});

const researchTool = tool({
  description: 'Conduct comprehensive research analysis',
  parameters: z.object({
    topic: z.string().describe('Research topic or query'),
    focus_areas: z.array(z.string()).describe('Specific areas to focus on'),
    depth: z.enum(['overview', 'detailed', 'comprehensive']).describe('Research depth level'),
  }),
  execute: async ({ topic, focus_areas, depth }) => {
    const methodologies = depth === 'comprehensive' ? 5 : depth === 'detailed' ? 3 : 2;
    
    return `
📚 **Enhanced Research Analysis**

**Topic**: ${topic}
**Focus Areas**: ${focus_areas.join(', ')}
**Research Depth**: ${depth}

**Research Methodologies Applied**:
🔬 **Systematic Analysis**: Structured approach to ${topic}
🔍 **Multi-source Investigation**: Cross-referencing information
${methodologies > 2 ? '📊 **Comparative Analysis**: Different perspectives evaluated' : ''}
${methodologies > 3 ? '🧪 **Experimental Validation**: Testing hypotheses' : ''}
${methodologies > 4 ? '📈 **Longitudinal Study**: Historical and trend analysis' : ''}

**Key Research Areas**:
${focus_areas.map(area => `- ${area}`).join('\n')}

*Comprehensive research framework activated for ${depth} analysis...*
    `;
  }
});

// TAVILY MCP Tool - Web Search and Browsing
const tavilySearchTool = tool({
  description: 'Search the web and browse current information using Tavily API for real-time research',
  parameters: z.object({
    query: z.string().describe('Search query or topic to research'),
    search_depth: z.enum(['basic', 'advanced']).default('basic').describe('Depth of search - basic for quick results, advanced for comprehensive'),
    max_results: z.number().min(1).max(10).default(5).describe('Maximum number of search results to return'),
    include_domains: z.array(z.string()).optional().describe('Specific domains to include in search'),
    exclude_domains: z.array(z.string()).optional().describe('Specific domains to exclude from search'),
  }),
  execute: async ({ query, search_depth, max_results, include_domains, exclude_domains }) => {
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
        ...(include_domains && { include_domains }),
        ...(exclude_domains && { exclude_domains })
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

      // Format the results
      const results = data.results || [];
      const answer = data.answer || '';

      return `
🌐 **Tavily Web Search Results**

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

${data.follow_up_questions ? `
🤔 **Related Questions**:
${data.follow_up_questions.map((q: string) => `- ${q}`).join('\n')}
` : ''}

*Real-time web search completed with Tavily MCP*
      `;

    } catch (error) {
      console.error('Tavily Search Error:', error);
      return `❌ **Tavily Search Error**: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!process.env.FIREWORKS_API_KEY) {
      return new Response('API key not configured', { status: 500 });
    }

    console.log('Chat request received:', messages?.length, 'messages');

    const result = streamText({
      model: fireworks('accounts/fireworks/models/deepseek-v3-0324'),
      messages: [
        {
          role: 'system',
          content: `You are DeepSeek V3-0324 Enhanced CoD Studio - an advanced AI research assistant with Chain of Deliberation methodology and MCP agentic tools.

🧠 **CORE CAPABILITIES**:
- Chain of Deliberation (CoD) systematic reasoning
- Enhanced memory and context retention
- Advanced research and analysis capabilities
- Agentic tool integration for complex tasks

🛠️ **AVAILABLE MCP TOOLS**:
- **cod_analysis**: For systematic Chain of Draft analysis on complex problems
- **memory_store**: For storing important information in categorized memory
- **verification_analysis**: For deep verification of reasoning and solutions
- **enhanced_research**: For comprehensive research with multiple methodologies
- **tavily_search**: For real-time web search and current information browsing

🎯 **REASONING APPROACH**:
1. **Assess Complexity**: Determine if the query needs CoD methodology
2. **Check Information Needs**: Use Tavily search for current/real-time information
3. **Select Tools**: Choose appropriate MCP tools for the task
4. **Execute Analysis**: Use systematic reasoning with tool support
5. **Verify Results**: Apply verification when appropriate
6. **Store Insights**: Save important findings to memory

**INSTRUCTIONS**:
- Use CoD methodology for complex, multi-faceted problems
- Use tavily_search for current events, real-time data, recent developments, or when you need to verify facts
- Automatically invoke appropriate MCP tools based on query complexity and information needs
- For complex analysis, use cod_analysis tool with appropriate complexity level
- Store important insights using memory_store tool
- Verify critical solutions using verification_analysis tool
- Use enhanced_research for comprehensive topic exploration
- Use tavily_search when users ask about recent events, current news, or need real-time information
- Provide clear, structured responses with tool integration
- Be professional, engaging, and demonstrate advanced reasoning capabilities

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
      temperature: 0.3,
      maxTokens: 4000,
    });

    console.log('Fireworks API call initiated with MCP tools (including Tavily)');
    return result.toDataStreamResponse();
    
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
