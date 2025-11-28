# 🔒 Security & Deployment Guide - AISCR Global PMO

## 📋 Overview

This document outlines the security implementation and deployment workflow for the PMO application. It ensures that production remains secure while allowing full development capabilities locally.

---

## 🛡️ Security Implementation

### **1. Environment Detection**

The application automatically detects whether it's running in **production** or **local development**:

**Production Detection:**
- Hostname is NOT `localhost`
- Hostname is NOT `127.0.0.1`
- Hostname does NOT start with `192.168.` (local network)
- Hostname does NOT start with `10.` (local network)
- Hostname is NOT empty

**File:** `frontend/js/environment.js`

---

### **2. Blocked Pages in Production**

#### **Dashboard (`/dashboard`)**
- ✅ Direct URL access blocked
- ✅ All links from landing page blocked
- ✅ All feature cards blocked
- ✅ Navigation links blocked
- ✅ Shows "Access Restricted" page
- ✅ Auto-redirects to landing page (5 seconds)

#### **Download Page (`/download`)**
- ✅ Direct URL access blocked
- ✅ All links from landing page blocked
- ✅ Navigation links blocked
- ✅ Shows "Access Restricted" page
- ✅ Auto-redirects to landing page (5 seconds)

#### **Internal Documentation**
- ✅ All `.md` files blocked (403 Forbidden)
- ✅ `/documents/` folder blocked
- ✅ `/deployment/` folder blocked
- ✅ `/scripts/` folder blocked
- ✅ `.py` files blocked
- ✅ Config files blocked (`requirements.txt`, `package.json`, etc.)

---

### **3. Demo Mode Features**

When in production, the following restrictions apply:

**CRUD Operations:**
- ❌ Create operations disabled
- ❌ Edit operations disabled
- ❌ Delete operations disabled
- ❌ Save operations blocked

**Data Limitations:**
- Limited to 5 items per module (instead of all)
- Read-only mode (view only)
- Sample data only

**Reset Operations:**
- ❌ Reset All Data disabled
- ❌ Reset to Zero disabled
- ❌ Restore Defaults disabled

**Export Limitations:**
- Limited export functionality
- Security alerts on export attempts

---

## 🚀 Deployment Workflow

### **Local Development**

**Access:** `http://localhost:8000`

**Features:**
- ✅ Full CRUD operations
- ✅ Unlimited data display
- ✅ All reset functions
- ✅ Complete export functionality
- ✅ No restrictions

**Start Server:**
```bash
bash scripts/start-server.sh
```

Or manually:
```bash
cd "C:\Users\PC-PAXIIT\Desktop\PMO AUTOMATED EXCEL SYSTEM"
python -m http.server 8000
```

---

### **Production Deployment**

**Access:** `https://pmo.paxiit.com`

**Deployment Path:** `/volume1/web/pmo/` (Synology NAS)

**Deploy Command:**
```bash
bash scripts/deploy-nas.sh
```

**What Gets Deployed:**
- ✅ Frontend files (`frontend/`)
- ✅ Landing page (`index.html`)
- ✅ Download page (`download.html`)
- ✅ Templates page (`templates/index.html`)
- ✅ Security files (`.htaccess`, `robots.txt`)
- ✅ Excel and Word templates
- ✅ Clean URL configurations

**What Does NOT Get Deployed:**
- ❌ Internal documentation (`.md` files)
- ❌ Python scripts (`.py` files)
- ❌ Development scripts
- ❌ Git files (`.git/`)
- ❌ Config files (`requirements.txt`, `package.json`)

---

## 📁 File Structure

### **Production Structure**
```
/volume1/web/pmo/
├── index.html (Landing Page)
├── download.html
├── .htaccess (Security + Clean URLs)
├── robots.txt (SEO Protection)
├── frontend/
│   ├── index.html (Dashboard - Blocked in Production)
│   ├── css/
│   ├── js/
│   │   └── environment.js (Environment Detection)
│   └── assets/
├── dashboard/
│   └── index.html (Blocked in Production)
├── download/
│   └── index.html (Blocked in Production)
├── templates/
│   └── index.html (Coming Soon)
└── Templates/
    └── *.docx (Word Templates)
```

---

## 🔧 Key Files

### **1. Environment Detection**
**File:** `frontend/js/environment.js`

**Purpose:** Detects production vs local and blocks restricted pages

**Key Functions:**
- Environment detection
- Dashboard blocking
- Download page blocking
- Demo banner display

---

### **2. Security Configuration**
**File:** `.htaccess`

**Purpose:** Server-level security rules

**Blocks:**
- All `.md` files
- `/documents/` folder
- `/deployment/` folder
- `/scripts/` folder
- `.py` files
- Config files

---

### **3. SEO Protection**
**File:** `robots.txt`

**Purpose:** Prevents search engine indexing of internal docs

**Blocks:**
- Documentation files
- Internal folders
- Scripts and configs

---

## ⚠️ Important Notes

### **1. Never Deploy Without Testing**

**Before deploying to production:**
1. ✅ Test all features locally
2. ✅ Verify environment detection works
3. ✅ Check that blocking works correctly
4. ✅ Test all links and navigation
5. ✅ Verify security files are included

---

### **2. Environment Detection**

**The application automatically detects the environment:**
- **Local:** `localhost`, `127.0.0.1`, `192.168.x.x`, `10.x.x.x`
- **Production:** Any other hostname (e.g., `pmo.paxiit.com`)

**Do NOT manually change environment detection logic without understanding the implications.**

---

### **3. Blocked Pages**

**These pages are ALWAYS blocked in production:**
- `/dashboard` - Dashboard access
- `/download` - Download page
- `/frontend/index.html` - Direct dashboard access

**These pages are ALWAYS accessible:**
- `/` - Landing page
- `/templates` - Templates page (Coming Soon)

---

### **4. Deployment Script**

**File:** `scripts/deploy-nas.sh`

**What it does:**
1. Tests NAS connection
2. Creates deployment directory
3. Builds Excel and Word files
4. Copies frontend files
5. Copies security files
6. Sets file permissions
7. Deploys to NAS

**Do NOT modify the deployment script without understanding:**
- What files are deployed
- What files are excluded
- Security implications

---

## 🔄 Development Workflow

### **Step 1: Local Development**
```bash
# Start local server
bash scripts/start-server.sh

# Access at http://localhost:8000
# Full functionality available
```

### **Step 2: Testing**
- Test all new features locally
- Verify environment detection
- Check security blocking
- Test all links and navigation

### **Step 3: Git Commit**
```bash
git add -A
git commit -m "Description of changes"
git push origin main
```

### **Step 4: Production Deployment**
```bash
# Deploy to production
bash scripts/deploy-nas.sh
```

**OR** (if CI/CD is configured):
- Push to `main` branch
- CI/CD will deploy automatically (with manual approval)

---

## 🚨 Troubleshooting

### **Issue: Dashboard/Download Still Accessible in Production**

**Solution:**
1. Check `frontend/js/environment.js` is loaded
2. Verify environment detection logic
3. Check browser console for errors
4. Clear browser cache
5. Verify `.htaccess` is deployed

---

### **Issue: Links Not Blocked**

**Solution:**
1. Check `blockDashboardAccess()` and `blockDownloadAccess()` functions exist
2. Verify `onclick` handlers are on links
3. Check `DOMContentLoaded` event listener
4. Verify `window.ENV.demoMode` is set correctly

---

### **Issue: Internal Docs Accessible**

**Solution:**
1. Verify `.htaccess` is deployed
2. Check Apache mod_rewrite is enabled
3. Verify file permissions
4. Check server logs for errors

---

### **Issue: Deployment Fails**

**Solution:**
1. Check NAS connection: `ssh -p 2222 superpulpax@192.168.1.3`
2. Verify SSH key is configured
3. Check deployment path: `/volume1/web/pmo/`
4. Verify file permissions
5. Check deployment script logs

---

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All features tested locally
- [ ] Environment detection verified
- [ ] Security blocking tested
- [ ] All links checked
- [ ] Security files included (`.htaccess`, `robots.txt`)
- [ ] Git changes committed
- [ ] Deployment script tested
- [ ] NAS connection verified
- [ ] File permissions correct
- [ ] Production site tested after deployment

---

## 🔐 Security Best Practices

1. **Never commit sensitive data** to public repositories
2. **Always test locally** before deploying
3. **Keep security files updated** (`.htaccess`, `robots.txt`)
4. **Monitor production site** after deployment
5. **Review access logs** regularly
6. **Keep environment detection** logic intact
7. **Don't bypass security** for "quick fixes"

---

## 📞 Quick Reference

### **Local Development**
```bash
# Start server
bash scripts/start-server.sh

# Access
http://localhost:8000
```

### **Production Deployment**
```bash
# Deploy
bash scripts/deploy-nas.sh

# Access
https://pmo.paxiit.com
```

### **Git Workflow**
```bash
# Commit changes
git add -A
git commit -m "Description"
git push origin main
```

### **NAS Connection**
```bash
# Test connection
ssh -p 2222 superpulpax@192.168.1.3

# Deployment path
/volume1/web/pmo/
```

---

## 🎯 Summary

**Local Development:**
- Full functionality
- No restrictions
- Safe for development

**Production:**
- Landing page only (public)
- Dashboard blocked
- Download page blocked
- Internal docs secured
- Demo mode active

**Deployment:**
- Use `bash scripts/deploy-nas.sh`
- Test locally first
- Verify security after deployment

---

**Last Updated:** November 28, 2025  
**Status:** ✅ Security Implementation Complete  
**Production Status:** 🔒 Protected

