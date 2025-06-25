# Enhanced CoD Studio - MCP Tools Integration Guide

## Overview

This Enhanced CoD Studio integrates Model Context Protocol (MCP) agentic tools with the Vercel AI SDK to provide advanced reasoning capabilities. The application combines the Chain of Draft (CoD) methodology with intelligent tool usage for complex problem-solving.

## Architecture

### Current Integration
- **Frontend**: Next.js 15 with React 18 and Tailwind CSS
- **Backend**: Vercel AI SDK with Fireworks AI (DeepSeek V3-0324)
- **Tools**: MCP-compatible tools using the `ai` package's tool system
- **Styling**: Custom CSS matching the original COD-studio-3 design

### Key Features
- ✅ Chain of Draft (CoD) methodology integration
- ✅ MCP agentic tools (cod_analysis, memory_store, verification_analysis, enhanced_research)
- ✅ Session management with sidebar
- ✅ Real-time streaming responses
- ✅ Tool invocation display
- ✅ Mobile-responsive design
- ✅ Enhanced markdown rendering with syntax highlighting

## Available MCP Tools

### 1. CoD Analysis Tool (`cod_analysis`)
**Purpose**: Performs systematic Chain of Draft analysis on complex problems

**Parameters**:
- `problem` (string): The problem or question to analyze
- `complexity_level` (enum): 'basic' | 'standard' | 'advanced' | 'research'
- `word_limit` (number): Word limit for each CoD step (50-300)

**Usage**: Automatically triggered for complex questions or manually invoked

### 2. Memory Store Tool (`memory_store`)
**Purpose**: Stores important information in categorized memory system

**Parameters**:
- `category` (enum): 'personal' | 'projects' | 'technical' | 'reflections'
- `content` (string): Content to store
- `context` (string): Context or tags for the memory

**Usage**: For storing insights, solutions, or important information for future reference

### 3. Verification Analysis Tool (`verification_analysis`)
**Purpose**: Performs deep verification of reasoning and solutions

**Parameters**:
- `solution` (string): The solution or reasoning to verify
- `verification_depth` (enum): 'basic' | 'standard' | 'deep' | 'research'

**Usage**: Final validation step in CoD methodology

### 4. Enhanced Research Tool (`enhanced_research`)
**Purpose**: Conducts comprehensive research analysis

**Parameters**:
- `topic` (string): Research topic or query
- `focus_areas` (array): Specific areas to focus on
- `depth` (enum): 'overview' | 'detailed' | 'comprehensive'

**Usage**: For in-depth topic exploration and research tasks

## Adding New MCP Tools

### Step 1: Define the Tool
Add your new tool in `/app/api/chat/route.ts`:

```typescript
const myNewTool = tool({
  description: 'Description of what your tool does',
  parameters: z.object({
    param1: z.string().describe('Description of parameter 1'),
    param2: z.number().describe('Description of parameter 2'),
    // Add more parameters as needed
  }),
  execute: async ({ param1, param2 }) => {
    // Implement your tool logic here
    const result = await performSomeOperation(param1, param2);
    
    return `Tool execution result: ${result}`;
  }
});
```

### Step 2: Register the Tool
Add your tool to the tools object in the `streamText` configuration:

```typescript
tools: {
  cod_analysis: codAnalysisTool,
  memory_store: memoryStoreTool,
  verification_analysis: verificationTool,
  enhanced_research: researchTool,
  my_new_tool: myNewTool, // Add your tool here
},
```

### Step 3: Update System Prompts
Add your tool to the system prompts so the AI knows about it:

```typescript
AVAILABLE MCP TOOLS:
- cod_analysis: For systematic Chain of Draft analysis
- memory_store: For storing important information
- verification_analysis: For deep verification of solutions
- enhanced_research: For comprehensive research analysis
- my_new_tool: Brief description of your new tool
```

### Step 4: Test the Tool
1. Restart your development server
2. Ask the AI to use your new tool
3. Check the tool invocation display in the chat

## Best Practices

### Tool Design
- Keep tools focused on a single responsibility
- Use clear, descriptive parameter names
- Provide detailed parameter descriptions
- Return formatted, readable results
- Handle errors gracefully

### Parameter Validation
- Use Zod schemas for robust parameter validation
- Provide min/max constraints where appropriate
- Use enums for limited choice parameters
- Add helpful descriptions for each parameter

### Error Handling
```typescript
execute: async ({ param1, param2 }) => {
  try {
    // Your tool logic
    return result;
  } catch (error) {
    return `Error in tool execution: ${error.message}`;
  }
}
```

### Tool Integration Examples

#### Database Query Tool
```typescript
const databaseQueryTool = tool({
  description: 'Execute database queries for data analysis',
  parameters: z.object({
    query: z.string().describe('SQL query to execute'),
    database: z.enum(['analytics', 'users', 'products']).describe('Target database'),
  }),
  execute: async ({ query, database }) => {
    // Implement database connection and query execution
    const results = await executeQuery(database, query);
    return `Query results: ${JSON.stringify(results, null, 2)}`;
  }
});
```

#### File Processing Tool
```typescript
const fileProcessorTool = tool({
  description: 'Process and analyze uploaded files',
  parameters: z.object({
    filePath: z.string().describe('Path to the file to process'),
    operation: z.enum(['analyze', 'summarize', 'extract']).describe('Operation to perform'),
  }),
  execute: async ({ filePath, operation }) => {
    // Implement file processing logic
    const result = await processFile(filePath, operation);
    return `File processing complete: ${result}`;
  }
});
```

## Environment Configuration

Make sure these environment variables are set in your `.env.local`:

```bash
# Fireworks API Configuration
FIREWORKS_API_KEY=your_api_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_NAME="Enhanced COD Studio with MCP"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

## Debugging Tools

### Enable Verbose Logging
The application includes verbose logging for tool execution. Check your console for detailed information about tool invocations.

### Tool Invocation Display
The chat interface shows:
- Tool names and parameters
- Execution status
- Results and errors
- Formatted output

## Deployment

The application is configured for Vercel deployment with:
- Optimized build settings
- Environment variable management
- Static asset optimization
- API route configuration

## Contributing

When adding new tools:
1. Follow the established patterns
2. Add comprehensive documentation
3. Include error handling
4. Test thoroughly
5. Update this guide

## Troubleshooting

### Common Issues
1. **Tool not executing**: Check parameter validation and tool registration
2. **API errors**: Verify environment variables and API keys
3. **Build failures**: Check TypeScript types and imports
4. **UI not updating**: Ensure proper tool result handling in React components

### Debug Steps
1. Check browser console for errors
2. Verify API route responses
3. Test tool execution independently
4. Check environment variable configuration

This Enhanced CoD Studio provides a robust foundation for advanced AI reasoning with extensible MCP tool integration. The system is designed to be easily extensible while maintaining the high-quality user experience of the original COD-studio-3.
