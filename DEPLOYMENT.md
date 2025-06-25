# Enhanced COD Studio with MCP - Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Vercel account (free tier available)
- Fireworks AI API key
- Git repository (GitHub, GitLab, or Bitbucket)

### Step 1: Environment Setup

1. **Get Fireworks API Key**
   - Visit [Fireworks AI](https://fireworks.ai)
   - Sign up and get your API key
   - Keep it secure for deployment

2. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd enhanced-cod-studio-mcp
   ```

### Step 2: Vercel Deployment

#### Option A: Deploy with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add FIREWORKS_API_KEY
```

#### Option B: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables:
   - `FIREWORKS_API_KEY`: Your Fireworks API key

### Step 3: Environment Variables

Add these environment variables in Vercel dashboard:

**Required:**
- `FIREWORKS_API_KEY`: Your Fireworks API key

**Optional:**
- `NEXT_PUBLIC_APP_NAME`: "Enhanced COD Studio with MCP"
- `NEXT_PUBLIC_APP_VERSION`: "1.0.0"
- `MCP_VERBOSE_LOGS`: "true"
- `MCP_MAX_DURATION`: "60"

### Step 4: Domain Configuration

1. **Custom Domain (Optional)**
   - In Vercel dashboard, go to your project
   - Click "Domains" tab
   - Add your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Automatically provided by Vercel
   - No additional configuration needed

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  enhanced-cod-studio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - FIREWORKS_API_KEY=${FIREWORKS_API_KEY}
      - NODE_ENV=production
    restart: unless-stopped
```

### Deploy with Docker
```bash
# Build image
docker build -t enhanced-cod-studio-mcp .

# Run container
docker run -d \
  --name enhanced-cod-studio \
  -p 3000:3000 \
  -e FIREWORKS_API_KEY=your_api_key \
  enhanced-cod-studio-mcp
```

## ☁️ Cloud Platform Deployment

### AWS (Amazon Web Services)

#### AWS App Runner
1. Create App Runner service
2. Connect to your repository
3. Configure build settings:
   ```yaml
   # apprunner.yaml
   version: 1.0
   runtime: nodejs18
   build:
     commands:
       build:
         - npm ci
         - npm run build
     env:
       - name: NODE_ENV
         value: production
   run:
     runtime-version: 18
     command: npm start
     network:
       port: 3000
       env: PORT
   ```

#### AWS Amplify
1. Connect repository to Amplify
2. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### Google Cloud Platform

#### Cloud Run
```bash
# Build and deploy
gcloud run deploy enhanced-cod-studio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars FIREWORKS_API_KEY=your_api_key
```

### Microsoft Azure

#### Azure Static Web Apps
1. Create Static Web App resource
2. Connect to repository
3. Configure build:
   ```yaml
   # .github/workflows/azure-static-web-apps.yml
   - name: Build And Deploy
     uses: Azure/static-web-apps-deploy@v1
     with:
       app_location: "/"
       api_location: ""
       output_location: ".next"
   ```

## 🔧 Configuration

### Performance Optimization

1. **Edge Runtime (Vercel)**
   ```typescript
   // app/api/chat/route.ts
   export const runtime = 'edge';
   ```

2. **Caching Headers**
   ```typescript
   // next.config.ts
   async headers() {
     return [
       {
         source: '/api/:path*',
         headers: [
           { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }
         ]
       }
     ];
   }
   ```

### Security Configuration

1. **Content Security Policy**
   ```typescript
   // next.config.ts
   async headers() {
     return [
       {
         source: '/(.*)',
         headers: [
           {
             key: 'Content-Security-Policy',
             value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'"
           }
         ]
       }
     ];
   }
   ```

2. **Environment Variables Security**
   - Never commit API keys to repository
   - Use environment variables for all secrets
   - Rotate API keys regularly

## 📊 Monitoring & Analytics

### Vercel Analytics
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Monitoring
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- DataDog for performance monitoring

## 🧪 Testing Deployment

### Health Check Endpoint
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'
  });
}
```

### Load Testing
```bash
# Using artillery
npm install -g artillery

# Create load test config
cat > load-test.yml << EOF
config:
  target: 'https://your-domain.vercel.app'
  phases:
    - duration: 60
      arrivalRate: 5
scenarios:
  - name: "Chat API test"
    requests:
      - post:
          url: "/api/chat"
          json:
            messages: [{"role": "user", "content": "Hello"}]
EOF

# Run test
artillery run load-test.yml
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📋 Deployment Checklist

- [ ] API keys configured in environment variables
- [ ] Build completes successfully
- [ ] All tests pass
- [ ] Security headers configured
- [ ] Domain and SSL certificate set up
- [ ] Monitoring and analytics enabled
- [ ] Error tracking configured
- [ ] Load testing completed
- [ ] Backup and recovery plan in place

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **API Key Issues**
   - Ensure FIREWORKS_API_KEY is set correctly
   - Verify API key has necessary permissions
   - Check for trailing spaces or special characters

3. **Runtime Errors**
   - Review server logs
   - Check environment variables
   - Verify MCP integration configuration

4. **Performance Issues**
   - Enable Edge Runtime where possible
   - Implement proper caching strategies
   - Monitor API response times

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Fireworks AI API Documentation](https://fireworks.ai/docs)

---

🎉 **Congratulations!** Your Enhanced COD Studio with MCP is now deployed and ready for advanced AI reasoning!
