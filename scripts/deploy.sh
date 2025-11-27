#!/bin/bash
# AISCR Global PMO - Standard Deployment Script
# Cross-platform deployment automation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 AISCR Global PMO - Deployment Script${NC}"
echo ""

# Configuration
DEPLOY_PLATFORM="${1:-netlify}"  # Default to Netlify
ENVIRONMENT="${2:-production}"    # Default to production

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check prerequisites
print_info "Checking prerequisites..."

# Check Git
if ! command -v git &> /dev/null; then
    print_error "Git is not installed"
    exit 1
fi
print_success "Git found"

# Check Python
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    print_error "Python is not installed"
    exit 1
fi
PYTHON_CMD=$(command -v python3 || command -v python)
print_success "Python found"

# Build step
print_info "Building project..."
$PYTHON_CMD create_pmo_system.py
$PYTHON_CMD create_word_templates.py
$PYTHON_CMD create_zip.py
print_success "Build complete"

# Deployment based on platform
case $DEPLOY_PLATFORM in
    netlify)
        print_info "Deploying to Netlify..."
        
        # Check if Netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            print_info "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        # Deploy
        if [ "$ENVIRONMENT" = "production" ]; then
            netlify deploy --prod --dir=.
        else
            netlify deploy --dir=.
        fi
        print_success "Deployed to Netlify"
        ;;
    
    github-pages)
        print_info "Deploying to GitHub Pages..."
        
        # Check if gh-pages branch exists
        if git show-ref --verify --quiet refs/heads/gh-pages; then
            git checkout gh-pages
            git pull origin gh-pages
        else
            git checkout --orphan gh-pages
            git rm -rf .
        fi
        
        # Copy files
        git checkout main -- frontend/ landing.html download.html
        
        # Commit and push
        git add .
        git commit -m "Deploy: Update GitHub Pages" || true
        git push origin gh-pages
        
        git checkout main
        print_success "Deployed to GitHub Pages"
        ;;
    
    manual)
        print_info "Preparing files for manual deployment..."
        echo "Files ready in current directory"
        echo "Upload the following to your web server:"
        echo "  - frontend/"
        echo "  - landing.html"
        echo "  - download.html"
        echo "  - Templates/"
        print_success "Files ready for manual deployment"
        ;;
    
    *)
        print_error "Unknown deployment platform: $DEPLOY_PLATFORM"
        echo "Supported platforms: netlify, github-pages, manual"
        exit 1
        ;;
esac

print_success "Deployment complete!"

