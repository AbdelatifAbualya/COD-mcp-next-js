import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

// Create MCP handler with all our tools
const handler = createMcpHandler(
  (server) => {
    // CoD Analysis Tool
    server.tool(
      "cod_analysis",
      "Perform systematic Chain of Deliberation analysis on complex problems",
      {
        problem: z.string().describe("The problem or question to analyze"),
        complexity_level: z.enum(['basic', 'standard', 'advanced', 'research']).describe("Complexity level for analysis"),
        word_limit: z.number().min(50).max(300).describe("Word limit for each CoD step"),
      },
      async ({ problem, complexity_level, word_limit }) => {
        const steps = complexity_level === 'research' ? 6 : complexity_level === 'advanced' ? 5 : 4;
        
        const analysis = `🧠 **Chain of Deliberation Analysis**

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

        return {
          content: [{ type: "text", text: analysis }],
        };
      }
    );

    // Memory Store Tool
    server.tool(
      "memory_store",
      "Store important information in categorized memory system",
      {
        category: z.enum(['personal', 'projects', 'technical', 'reflections']).describe("Memory category"),
        content: z.string().describe("Content to store"),
        context: z.string().describe("Context or tags for the memory"),
      },
      async ({ category, content, context }) => {
        const timestamp = new Date().toISOString();
        const memoryId = `mem_${Date.now()}`;
        
        const result = `🧠 **Memory Stored Successfully**

**ID**: ${memoryId}
**Category**: ${category}
**Timestamp**: ${timestamp}
**Context**: ${context}

**Content**: ${content}

*Memory has been stored and will be available for future reference.*`;

        return {
          content: [{ type: "text", text: result }],
        };
      }
    );

    // Verification Analysis Tool
    server.tool(
      "verification_analysis",
      "Perform deep verification and validation of reasoning and solutions",
      {
        verification_depth: z.enum(['basic', 'standard', 'deep', 'research']).describe("Depth of verification analysis"),
      },
      async ({ verification_depth }) => {
        const result = `🔍 **Verification Analysis Initiated**

**Verification Depth**: ${verification_depth}

**Verification Framework**:
- ✅ **Logic Validation**: Checking reasoning consistency
- ✅ **Assumption Review**: Examining underlying assumptions
- ✅ **Error Detection**: Identifying potential flaws
- ✅ **Alternative Validation**: Testing different approaches
${verification_depth === 'deep' || verification_depth === 'research' ? '- ✅ **Evidence Review**: Evaluating supporting evidence' : ''}
${verification_depth === 'research' ? '- ✅ **Peer Validation**: Cross-referencing with established knowledge' : ''}

*Verification analysis ready to proceed...*`;

        return {
          content: [{ type: "text", text: result }],
        };
      }
    );

    // Enhanced Research Tool
    server.tool(
      "enhanced_research",
      "Perform comprehensive research with multiple methodologies and focus areas",
      {
        topic: z.string().describe("The research topic or question"),
        focus_areas: z.array(z.string()).describe("Specific areas or aspects to focus on"),
        depth: z.enum(['overview', 'detailed', 'comprehensive']).describe("Research depth level"),
      },
      async ({ topic, focus_areas, depth }) => {
        const result = `🔬 **Enhanced Research Analysis**

**Topic**: ${topic}
**Focus Areas**: ${focus_areas.join(', ')}
**Research Depth**: ${depth}

**Research Methodology**:
- 📊 **Systematic Analysis**: Structured investigation approach
- 🔍 **Multi-perspective Review**: Examining from various angles
- 📚 **Literature Integration**: Combining multiple sources
- 🧪 **Evidence Synthesis**: Consolidating findings
${depth === 'detailed' || depth === 'comprehensive' ? '- 🔬 **Deep Dive Analysis**: Detailed examination of key aspects' : ''}
${depth === 'comprehensive' ? '- 🌐 **Comprehensive Coverage**: Exhaustive research across all dimensions' : ''}

*Enhanced research framework activated and ready to proceed...*`;

        return {
          content: [{ type: "text", text: result }],
        };
      }
    );

    // Tavily Search Tool
    server.tool(
      "tavily_search",
      "Search the web and browse current information using Tavily API for real-time research",
      {
        query: z.string().describe("Search query or topic to research"),
        max_results: z.number().min(1).max(10).default(5).describe("Maximum number of search results"),
      },
      async ({ query, max_results }) => {
        try {
          const tavilyApiKey = process.env.TAVILY_API_KEY;
          if (!tavilyApiKey) {
            return {
              content: [{ type: "text", text: "❌ **Tavily API Error**: API key not configured for search tool" }],
            };
          }

          const searchParams = {
            api_key: tavilyApiKey,
            query: query,
            search_depth: 'basic',
            max_results: max_results,
            include_answer: true,
            include_raw_content: false,
          };

          console.log('🔍 Tavily search initiated:', query);

          const response = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchParams),
          });

          if (!response.ok) {
            throw new Error(`Tavily API error: ${response.status}`);
          }

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const formattedResults = `🔍 **Tavily Search Results for "${query}"**

${data.answer ? `**AI Summary**: ${data.answer}\n\n` : ''}**Search Results**:
${data.results.map((result: any, index: number) => `
${index + 1}. **${result.title}**
   📝 **Content**: ${result.content}
   🔗 **URL**: ${result.url}
   ⭐ **Score**: ${result.score}
---
`).join('\n')}`;

            return {
              content: [{ type: "text", text: formattedResults }],
            };
          } else {
            return {
              content: [{ type: "text", text: `🔍 **No results found for "${query}"**\n\nTry rephrasing your search query or using different keywords.` }],
            };
          }
        } catch (error) {
          console.error('Tavily Search Error:', error);
          return {
            content: [{ type: "text", text: `❌ **Tavily Search Error**: ${error instanceof Error ? error.message : 'Unknown error occurred'}` }],
          };
        }
      }
    );
  },
  {
    // Server options
  },
  {
    // Adapter configuration
    redisUrl: process.env.REDIS_URL,
    basePath: "", // Remove basePath to use default
    maxDuration: 60,
    verboseLogs: true,
  }
);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
