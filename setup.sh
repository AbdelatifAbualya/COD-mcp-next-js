#!/bin/bash

# Enhanced COD Studio with MCP Integration - Setup Script
# This script sets up the complete development environment

set -e

echo "🚀 Enhanced COD Studio with MCP Integration Setup"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📄 Creating .env.local file..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local and add your FIREWORKS_API_KEY"
fi

# Create necessary directories
echo "📁 Creating project directories..."
mkdir -p components lib utils types

# Check if TypeScript is working
echo "🔍 Checking TypeScript configuration..."
npx tsc --noEmit --skipLibCheck

# Build the project
echo "🔨 Building the project..."
npm run build

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Edit .env.local and add your FIREWORKS_API_KEY"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation: README.md"
echo "🔧 Configuration: Check the settings in the app"
echo ""
echo "Happy coding with Enhanced COD Studio! 🚀"
