# AISCR Global PMO - Scripts Documentation

## 📋 Available Scripts

### **1. Setup Script**
**File:** `scripts/setup.sh`  
**Purpose:** Initial project setup and dependency installation

**Usage:**
```bash
bash scripts/setup.sh
```

**What it does:**
- Checks Python installation
- Installs Python dependencies (`openpyxl`, `python-docx`)
- Generates Excel and Word files
- Makes scripts executable (Unix)

---

### **2. Start Server Script**
**File:** `scripts/start-server.sh`  
**Purpose:** Start local development server

**Usage:**
```bash
bash scripts/start-server.sh
```

**What it does:**
- Checks Python and dependencies
- Generates files if missing
- Starts HTTP server on port 8000
- Shows access URLs

**Access:** `http://localhost:8000`

---

### **3. Deploy Script (NAS)**
**File:** `scripts/deploy-nas.sh`  
**Purpose:** Deploy to Synology NAS production server

**Usage:**
```bash
bash scripts/deploy-nas.sh
```

**What it does:**
- Connects to NAS via SSH (192.168.1.3:2222)
- Creates deployment directory structure
- Builds project artifacts (Excel, Word, ZIP)
- Syncs files to NAS using rsync/scp
- Sets proper file permissions
- Deploys to `/volume1/web/pmo/`

**Requirements:**
- SSH access to NAS
- SSH key configured
- NAS path: `/volume1/web/pmo`

**Production URL:** `https://pmo.paxiit.com`

---

## 🔧 Quick Reference

### **Development Workflow:**
```bash
# 1. Setup (first time only)
bash scripts/setup.sh

# 2. Start local server
bash scripts/start-server.sh

# 3. Develop locally at http://localhost:8000

# 4. Deploy to production when ready
bash scripts/deploy-nas.sh
```

### **Build Artifacts:**
```bash
# Generate Excel and Word files
python create_pmo_system.py
python create_word_templates.py
python create_zip.py

# Or use npm script
npm run build
```

---

## 📝 Notes

- All scripts are bash scripts (`.sh` files)
- Use Git Bash on Windows (not PowerShell)
- Scripts automatically detect Python version
- Dependencies are installed automatically if missing
- Deployment requires SSH access to NAS

---

## 🚨 Important

- **Only one deployment tool:** `scripts/deploy-nas.sh`
- **Only one server tool:** `scripts/start-server.sh`
- **Only one setup tool:** `scripts/setup.sh`

**Do NOT create duplicate deployment scripts or tools.**

---

**Last Updated:** November 28, 2025
