#!/bin/bash

# Test the Enhanced CoD Studio functionality
echo "🧪 Testing Enhanced CoD Studio..."

# Test 1: Check if the application starts properly
echo "1. Testing application startup..."
curl -s http://localhost:3000 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Application is running on localhost:3000"
else
    echo "❌ Application is not running"
    exit 1
fi

# Test 2: Test the CoD API with a sample problem
echo "2. Testing Chain of Draft API with a sample problem..."

# Sample request that should trigger CoD methodology
SAMPLE_REQUEST='{
  "messages": [
    {
      "role": "user",
      "content": "Implement a Trie class with three methods: init(): Initializes the trie object. insert(word: str): Inserts a word into the trie. search(word: str) -> bool: Returns True if the word is in the trie (i.e., was inserted). startsWith(prefix: str) -> bool: Returns True if there is any word in the trie that starts with the given prefix"
    }
  ]
}'

# Make the API request
RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$SAMPLE_REQUEST" \
  http://localhost:3000/api/chat)

# Check if the response contains CoD structure indicators
if echo "$RESPONSE" | grep -q "PROBLEM ANALYSIS\|CoD Step\|STAGE 2 VERIFICATION\|ERROR DETECTION"; then
    echo "✅ CoD structure detected in API response"
    echo "📊 Response contains proper Chain of Draft formatting"
else
    echo "❌ CoD structure not found in API response"
    echo "🔍 Response preview:"
    echo "$RESPONSE" | head -20
fi

echo "🎯 Test complete!"
