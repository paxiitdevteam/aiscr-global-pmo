# 🚀 AISCR Global PMO - Standard Deployment Guide

## ✅ Standardization Complete

All deployment tools have been consolidated to **ONE STANDARD SOLUTION**: **Netlify**

### What Was Fixed

1. ✅ **Removed Duplicate Tools**
   - ❌ Removed: `deploy-netlify.yml` (duplicate)
   - ❌ Removed: `deploy-vercel.yml` (duplicate)
   - ❌ Removed: `vercel.json` (duplicate config)
   - ✅ Kept: Single `ci-cd.yml` with Netlify deployment
   - ✅ Kept: Single `netlify.toml` configuration

2. ✅ **Bash Scripts Created**
   - `scripts/setup.sh` - Project setup
   - `scripts/start-server.sh` - Start dev server
   - `scripts/deploy.sh` - Standard deployment
   - `scripts/deploy-nas.sh` - NAS deployment

3. ✅ **Cross-Platform Support**
   - All scripts are bash (`.sh` files)
   - Use Git Bash on Windows
   - Unix/Linux/Mac: Native bash
   - No PowerShell, no .bat files

---

## 📋 Standard Deployment Process

### Development Workflow

1. **Setup (First Time)**
   ```bash
   # All platforms (use Git Bash on Windows)
   ./scripts/setup.sh
   # or
   bash scripts/setup.sh
   ```

2. **Start Development Server**
   ```bash
   # All platforms (use Git Bash on Windows)
   ./scripts/start-server.sh
   # or
   bash scripts/start-server.sh
   ```

3. **Deploy to Production**
   ```bash
   # Deploy to Netlify
   ./scripts/deploy.sh netlify production
   
   # Deploy to NAS
   ./scripts/deploy-nas.sh
   ```

---

## 🌐 Deployment Platform: Netlify

**Why Netlify?**
- ✅ Easiest to set up
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Continuous deployment from Git
- ✅ Branch previews
- ✅ Form handling (if needed)

**Standard Configuration:**
- Single `netlify.toml` file
- Automatic deployment on Git push
- CI/CD via GitHub Actions

---

## 🔄 CI/CD Pipeline

**Single Standard Pipeline:**
- **File:** `.github/workflows/ci-cd.yml`
- **Triggers:** Push to `main` or `develop` branches
- **Steps:**
  1. Validate code
  2. Build artifacts
  3. Deploy to Netlify
     - `main` branch → Production
     - `develop` branch → Staging

---

## 📝 Scripts Overview

### Setup Script
**Purpose:** Initial project setup
- Checks Python installation
- Installs dependencies
- Generates project files

### Start Server Script
**Purpose:** Local development
- Checks dependencies
- Generates files if missing
- Starts HTTP server on port 8000

### Deploy Script
**Purpose:** Production deployment
- Builds project
- Deploys to Netlify
- Supports staging/production environments

---

## 🎯 Quick Start Commands

```bash
# Setup (first time)
npm run setup
# or
./scripts/setup.sh
# or
bash scripts/setup.sh

# Start server
npm start
# or
./scripts/start-server.sh
# or
bash scripts/start-server.sh

# Deploy
npm run deploy
# or
./scripts/deploy.sh
# or
bash scripts/deploy.sh
```

---

## ✅ Standardization Checklist

- [x] Single deployment platform (Netlify)
- [x] Single CI/CD pipeline
- [x] Cross-platform scripts
- [x] No duplicate configs
- [x] Multi-platform support
- [x] No PowerShell dependency
- [x] Standardized workflow

---

**Last Updated:** 2025  
**Status:** ✅ Standardized and Ready

