# AISCR Global PMO - Scripts

Cross-platform scripts for development and deployment.

## 📋 Available Scripts

### Setup Script
**Purpose:** Initial project setup and dependency installation

**Usage:**
```bash
# Unix/Linux/Mac
./scripts/setup.sh
# or
bash scripts/setup.sh

# Windows
scripts\setup.bat
```

**What it does:**
- Checks Python installation
- Installs Python dependencies
- Generates Excel and Word files
- Makes scripts executable (Unix)

---

### Start Server Script
**Purpose:** Start local development server

**Usage:**
```bash
# Unix/Linux/Mac
./scripts/start-server.sh
# or
bash scripts/start-server.sh

# Windows
scripts\start-server.bat
```

**What it does:**
- Checks Python and dependencies
- Generates files if missing
- Starts HTTP server on port 8000
- Shows access URLs

---

### Deploy Script
**Purpose:** Standard deployment to production

**Usage:**
```bash
# Unix/Linux/Mac
./scripts/deploy.sh [platform] [environment]

# Windows
scripts\deploy.bat [platform] [environment]
```

**Platforms:**
- `netlify` - Deploy to Netlify (default)
- `nas` - Deploy to Synology NAS
- `github-pages` - Deploy to GitHub Pages
- `manual` - Prepare files for manual upload

**Environments:**
- `production` - Production deployment (default)
- `staging` - Staging deployment

**Examples:**
```bash
# Deploy to Netlify (production)
./scripts/deploy.sh netlify production

# Deploy to NAS (staging)
./scripts/deploy.sh nas staging

# Deploy to NAS (production)
./scripts/deploy.sh nas production

# Prepare for manual deployment
./scripts/deploy.sh manual
```

---

### NAS Deployment Script
**Purpose:** Deploy directly to Synology NAS server

**Usage:**
```bash
# Unix/Linux/Mac
./scripts/deploy-nas.sh [staging|production]

# Windows (Git Bash)
bash scripts/deploy-nas.sh staging
```

**What it does:**
- Connects to NAS via SSH (192.168.1.3:2222)
- Creates deployment directory structure
- Builds project artifacts (Excel, Word, ZIP)
- Syncs files to NAS using rsync/scp
- Sets proper file permissions
- Supports staging and production environments

**Requirements:**
- SSH access to NAS
- SSH key configured (or password authentication)
- NAS path: `/volume1/web/labs.paxiit.com/aiscr-pmo`

**See:** `NAS_DEPLOYMENT.md` for detailed setup instructions

---

## 🔧 Making Scripts Executable (Unix/Linux/Mac)

```bash
chmod +x scripts/*.sh
```

---

## 📝 Notes

- All scripts are cross-platform compatible
- Windows uses `.bat` files
- Unix/Linux/Mac use `.sh` files
- Scripts automatically detect Python version
- Dependencies are installed automatically if missing

---

**Last Updated:** 2025

