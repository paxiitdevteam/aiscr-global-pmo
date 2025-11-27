# 🚀 NAS Deployment Configuration Guide

This directory contains configuration files for deploying the AISCR Global PMO application to your Synology NAS with reverse proxy and virtual host setup.

---

## 📋 Overview

**Deployment Method:** Reverse Proxy (Nginx) + Virtual Host  
**NAS Path:** `/volume1/web/labs.paxiit.com/aiscr-pmo`  
**Environments:**
- **Production:** `/volume1/web/labs.paxiit.com/aiscr-pmo/production`
- **Staging:** `/volume1/web/labs.paxiit.com/aiscr-pmo/staging`

---

## 🎯 Deployment Strategy

### **CI/CD Workflow:**

1. **Staging (Auto-Deploy):**
   - Push to `develop` branch → **Automatically deploys** to staging
   - No approval required
   - For testing and development

2. **Production (Manual Approval):**
   - Push to `main` branch → **Requires manual approval** before deployment
   - Must validate functionality first
   - Only deploy after testing in staging

---

## 🔧 Setup Instructions

### **Step 1: Configure GitHub Environments**

Go to: **Repository Settings** → **Environments**

#### **Create "staging" Environment:**
- No protection rules (auto-deploy)

#### **Create "production" Environment:**
- ✅ **Required reviewers:** Add yourself/team
- ✅ **Wait timer:** 0 minutes (or set delay if needed)
- This ensures production deployments require approval

### **Step 2: Choose Deployment Method**

#### **Option A: Synology Web Station (Easier)**

1. **Enable Web Station:**
   - Package Center → Install "Web Station"

2. **Create Virtual Host:**
   - Web Station → Virtual Host → Create
   - **Host Name:** `aiscr-pmo.labs.paxiit.com`
   - **Port:** 80 (or 443 for HTTPS)
   - **Document Root:** `/volume1/web/labs.paxiit.com/aiscr-pmo/production`
   - **HTTP Backend:** Nginx (recommended)

3. **Configure Reverse Proxy (if needed):**
   - Control Panel → Application Portal → Reverse Proxy
   - Create reverse proxy rule pointing to your virtual host

#### **Option B: Manual Nginx Configuration (Advanced)**

1. **SSH to NAS:**
   ```bash
   ssh -p 2222 superpulpax@192.168.1.3
   ```

2. **Copy Nginx Config:**
   ```bash
   # Copy the config file
   sudo cp /path/to/deployment/nginx/aiscr-pmo.conf /etc/nginx/conf.d/aiscr-pmo.conf
   
   # Or if using sites-available:
   sudo cp /path/to/deployment/nginx/aiscr-pmo.conf /etc/nginx/sites-available/aiscr-pmo.conf
   sudo ln -s /etc/nginx/sites-available/aiscr-pmo.conf /etc/nginx/sites-enabled/
   ```

3. **Test Configuration:**
   ```bash
   sudo nginx -t
   ```

4. **Reload Nginx:**
   ```bash
   sudo systemctl reload nginx
   # Or on Synology:
   sudo /usr/syno/bin/synoservicecfg --restart nginx
   ```

---

## 📁 Directory Structure

After deployment, your NAS will have:

```
/volume1/web/labs.paxiit.com/aiscr-pmo/
├── production/              # Production environment (live)
│   ├── frontend/
│   │   ├── index.html
│   │   ├── css/
│   │   ├── js/
│   │   └── assets/
│   ├── Templates/
│   ├── landing.html
│   ├── download.html
│   ├── AISCR_PMO_Full_Automated_System.xlsx
│   └── AISCR_PMO_Complete_System.zip
└── staging/                 # Staging environment (testing)
    ├── frontend/
    ├── Templates/
    ├── landing.html
    └── download.html
```

---

## 🌐 Access URLs

After configuration:

- **Production:** `http://aiscr-pmo.labs.paxiit.com/` or `http://pmo.labs.paxiit.com/`
- **Staging:** `http://aiscr-pmo.labs.paxiit.com/staging/`
- **Landing Page:** `http://aiscr-pmo.labs.paxiit.com/landing.html`
- **Download Page:** `http://aiscr-pmo.labs.paxiit.com/download.html`

---

## 🔄 Deployment Workflow

### **Development → Staging (Automatic):**

```bash
# 1. Make changes locally
git checkout develop
# ... make changes ...
git add .
git commit -m "Feature: Add new functionality"
git push origin develop

# 2. CI/CD automatically:
#    - Validates code
#    - Builds artifacts
#    - Deploys to staging (no approval needed)
```

### **Staging → Production (Manual Approval):**

```bash
# 1. Test in staging first
#    Visit: http://aiscr-pmo.labs.paxiit.com/staging/

# 2. If validated, merge to main
git checkout main
git merge develop
git push origin main

# 3. CI/CD will:
#    - Build artifacts
#    - Wait for manual approval (GitHub notification)
#    - After approval → Deploys to production
```

### **Manual Approval Process:**

1. Push to `main` branch triggers workflow
2. Go to **GitHub Actions** tab
3. Click on the running workflow
4. Click **"Review deployments"** button
5. Click **"Approve and deploy"** for production
6. Deployment proceeds automatically

---

## 🔍 Verification

### **Check Deployment Status:**

```bash
# SSH to NAS
ssh -p 2222 superpulpax@192.168.1.3

# Check if files exist
ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/production/
ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/staging/

# Check permissions
ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/production/frontend/
```

### **Test Access:**

```bash
# Test production
curl -I http://aiscr-pmo.labs.paxiit.com/

# Test staging
curl -I http://aiscr-pmo.labs.paxiit.com/staging/
```

---

## 🛠️ Troubleshooting

### **Files Not Accessible:**

1. **Check Permissions:**
   ```bash
   ssh -p 2222 superpulpax@192.168.1.3
   chmod -R 755 /volume1/web/labs.paxiit.com/aiscr-pmo
   chown -R superpulpax:users /volume1/web/labs.paxiit.com/aiscr-pmo
   ```

2. **Check Nginx/Web Station:**
   - Verify virtual host is active
   - Check nginx error logs: `/var/log/nginx/aiscr-pmo-error.log`
   - Restart web server if needed

### **404 Errors:**

- Verify document root path is correct
- Check `try_files` directive in nginx config
- Ensure `index.html` exists in deployment directory

### **Reverse Proxy Issues:**

- Verify reverse proxy rule points to correct port
- Check if Web Station is running
- Verify DNS resolution for domain name

---

## 📝 Configuration Files

- **`nginx/aiscr-pmo.conf`** - Nginx reverse proxy configuration
- **`synology-webstation/aiscr-pmo-vhost.conf`** - Web Station reference
- **`.github/workflows/ci-cd.yml`** - CI/CD pipeline (updated for manual approval)

---

## ✅ Checklist

- [ ] GitHub environments configured (staging + production with approval)
- [ ] Web Station enabled on NAS
- [ ] Virtual host created (or nginx config installed)
- [ ] Reverse proxy configured (if needed)
- [ ] Test staging deployment
- [ ] Test production deployment with approval
- [ ] Verify access URLs work
- [ ] Document access URLs for team

---

**Last Updated:** 2025  
**Status:** Ready for Configuration

