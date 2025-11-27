# Git Repository Setup Guide

## 🚀 Quick Setup

### Step 1: Initial Commit (Already Done)
The repository has been initialized. Now you need to:

### Step 2: Add All Files
```bash
git add .
```

### Step 3: Create Initial Commit
```bash
git commit -m "Initial commit: AISCR Global PMO System

- Complete PMO web application with dashboard
- Excel and Word template generators
- Risk Heat Map visualization
- Full CRUD operations for all modules
- Export functionality (PDF, Word, Excel)
- Multi-currency support
- Notification system
- CI/CD pipeline configuration"
```

### Step 4: Create GitHub Repository

1. **Go to GitHub**
   - Visit https://github.com
   - Sign in or create account

2. **Create New Repository**
   - Click "New repository"
   - Name: `aiscr-global-pmo` (or your preferred name)
   - Description: "AISCR Global PMO - Automated Excel System & Web Application"
   - Choose: **Private** (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

### Step 5: Connect Local Repository to GitHub

```bash
# Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/YOUR-USERNAME/aiscr-global-pmo.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR-USERNAME/aiscr-global-pmo.git

# Verify remote
git remote -v
```

### Step 6: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

### Step 7: Set Up CI/CD Secrets (For Deployment)

#### For Netlify:
1. Go to Netlify Dashboard
2. Create a new site
3. Go to Site settings > Build & deploy > Environment variables
4. Copy your site ID and auth token
5. Go to GitHub repository > Settings > Secrets > Actions
6. Add secrets:
   - `NETLIFY_AUTH_TOKEN` - Your Netlify auth token
   - `NETLIFY_SITE_ID` - Your Netlify site ID

#### For Other Platforms:
Follow similar process for Vercel, AWS, Azure, etc.

---

## 📋 Branch Strategy

### Main Branches
- **main** - Production-ready code
- **develop** - Development branch

### Feature Branches
- `feature/risk-heat-map`
- `feature/gantt-chart`
- `feature/change-requests`
- etc.

### Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add: Feature description"

# Push feature branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# After PR is merged, delete feature branch
```

---

## 🔄 Daily Workflow

### Starting Work
```bash
# Pull latest changes
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/new-feature
```

### During Development
```bash
# Stage changes
git add .

# Commit with clear message
git commit -m "Add: Feature description"

# Push to remote
git push origin feature/new-feature
```

### Completing Feature
```bash
# Ensure all changes are committed
git status

# Push final changes
git push origin feature/new-feature

# Create Pull Request on GitHub
# After merge, clean up
git checkout main
git pull origin main
git branch -d feature/new-feature
```

---

## 🛠️ Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- <file>

# View branches
git branch -a

# Switch branches
git checkout branch-name

# Merge branch
git merge branch-name
```

---

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

**Format:**
```
Type: Brief description

Detailed explanation (if needed)
```

**Types:**
- `Add:` - New feature
- `Fix:` - Bug fix
- `Update:` - Update existing feature
- `Refactor:` - Code refactoring
- `Docs:` - Documentation changes
- `Style:` - Formatting, styling
- `Test:` - Adding tests

**Examples:**
```
Add: Risk Heat Map visualization
Fix: Budget calculation error in variance
Update: Dashboard KPIs to use dynamic data
Refactor: Modal management system
Docs: Update deployment guide
```

---

## 🔐 Security Notes

- **Never commit:**
  - API keys
  - Passwords
  - Secret tokens
  - Personal information
  - Environment files with secrets

- **Use .gitignore** for sensitive files
- **Use GitHub Secrets** for CI/CD tokens

---

## ✅ Next Steps After Git Setup

1. ✅ Repository initialized
2. ✅ Initial commit created
3. ⬜ Connect to GitHub
4. ⬜ Push to remote
5. ⬜ Set up CI/CD secrets
6. ⬜ Configure deployment
7. ⬜ Set up branch protection (optional)

---

**Need Help?** Check GitHub documentation or contact the development team.

