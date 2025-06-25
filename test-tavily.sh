#!/bin/bash

echo "🌐 Testing Tavily MCP Integration"
echo "================================="
echo ""

echo "🔍 Testing real-time web search..."
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Search for the latest news about artificial intelligence in 2025. What are the most recent developments?"
      }
    ]
  }' &

echo ""
echo "✅ Tavily search request sent!"
echo "📊 Check the browser at http://localhost:3000 to see:"
echo "   - Real-time web search results"
echo "   - Current AI news and developments"
echo "   - Tool invocation display"
echo ""
echo "🎯 The AI will automatically use Tavily when you ask about:"
echo "   - Current events"
echo "   - Recent news"
echo "   - Real-time information"
echo "   - Fact checking"
echo ""
echo "🚀 Your MCP architecture makes adding new tools THIS easy!"
