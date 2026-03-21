#!/bin/bash

# Script to help with Render deployment
# Save as: deploy.sh

echo "🚀 MERN Task App - Render Deployment Helper"
echo "============================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if code is already pushed to GitHub
echo "📦 Checking Git status..."
if [ -z "$(git remote get-url origin)" ]; then
    echo "❌ No GitHub remote found."
    echo "Steps:"
    echo "1. Create a repository on GitHub"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/mern-task.git"
    echo "3. Run: git push -u origin main"
    exit 1
fi

echo "✅ GitHub remote found: $(git remote get-url origin)"
echo ""

# Show deployment checklist
echo "📋 Pre-Deployment Checklist:"
echo "✓ Code is on GitHub"
echo "✓ MONGODB_URI is set in backend/.env"
echo "✓ OPENROUTER_API_KEY is set in backend/.env"
echo "✓ Render.com account created"
echo ""

echo "🔗 Next steps:"
echo "1. Go to https://render.com/dashboard"
echo "2. Create new Web Service for backend"
echo "3. Create new Static Site for frontend"
echo "4. Set environment variables"
echo ""

echo "📚 Full guide: See RENDER_DEPLOYMENT.md"
