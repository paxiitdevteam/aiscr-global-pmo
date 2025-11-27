# 🚀 NAS Deployment Guide - AISCR Global PMO

This guide explains how to deploy the AISCR Global PMO application to your Synology NAS server with automated CI/CD.

---

## 📋 Overview

**NAS Configuration:**
- **Host:** 192.168.1.3
- **SSH Port:** 2222
- **User:** superpulpax
- **Base Path:** `/volume1/web/labs.paxiit.com/aiscr-pmo`
- **Environments:**
  - **Staging:** `/volume1/web/labs.paxiit.com/aiscr-pmo/staging`
  - **Production:** `/volume1/web/labs.paxiit.com/aiscr-pmo/production`

---

## 🎯 Deployment Strategy

### **Recommendation: Deploy Now to Staging**

**Why deploy now (even at 41% completion)?**

✅ **Benefits:**
- Test deployment process early
- Get real-world feedback on existing features
- Identify infrastructure issues before full completion
- Build confidence in CI/CD pipeline
- Allow stakeholders to see progress

✅ **Safe Approach:**
- Deploy to **staging** first (develop branch)
- Keep production for stable releases (main branch)
- Easy rollback if needed
- No risk to production data

**When to deploy to production:**
- When core features are stable (60-70% complete)
- After thorough testing in staging
- When ready for real users

---

## 🛠️ Manual Deployment (Local)

### **Option 1: Using Deployment Scripts**

#### **Linux/Mac/Git Bash:**
```bash
# Deploy to staging
./scripts/deploy-nas.sh staging

# Deploy to production
./scripts/deploy-nas.sh production
```

#### **Windows (Git Bash):**
```bash
# Deploy to staging
bash scripts/deploy-nas.sh staging

# Deploy to production
bash scripts/deploy-nas.sh production
```

### **Option 2: Manual SSH Deployment**

```bash
# 1. Connect to NAS
ssh -p 2222 superpulpax@192.168.1.3

# 2. Create directories
mkdir -p /volume1/web/labs.paxiit.com/aiscr-pmo/staging
mkdir -p /volume1/web/labs.paxiit.com/aiscr-pmo/staging/frontend/{css,js,assets}
mkdir -p /volume1/web/labs.paxiit.com/aiscr-pmo/staging/Templates

# 3. Exit NAS and deploy files (from local machine)
rsync -avz --delete -e "ssh -p 2222" \
  frontend/ \
  superpulpax@192.168.1.3:/volume1/web/labs.paxiit.com/aiscr-pmo/staging/frontend/

rsync -avz -e "ssh -p 2222" \
  landing.html download.html \
  superpulpax@192.168.1.3:/volume1/web/labs.paxiit.com/aiscr-pmo/staging/

rsync -avz -e "ssh -p 2222" \
  Templates/ \
  superpulpax@192.168.1.3:/volume1/web/labs.paxiit.com/aiscr-pmo/staging/Templates/
```

---

## 🔄 Automated CI/CD Deployment

### **Setup GitHub Secrets**

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:

1. **`NAS_HOST`**
   - Value: `192.168.1.3`

2. **`NAS_USER`**
   - Value: `superpulpax`

3. **`NAS_PATH`**
   - Value: `/volume1/web/labs.paxiit.com/aiscr-pmo`

4. **`NAS_SSH_PRIVATE_KEY`**
   - Value: Your SSH private key content (see SSH Key Setup below)

### **SSH Key Setup**

#### **Generate SSH Key (if you don't have one):**
```bash
ssh-keygen -t ed25519 -C "github-actions-nas-deploy" -f ~/.ssh/nas_deploy_key
```

#### **Copy Public Key to NAS:**
```bash
ssh-copy-id -p 2222 -i ~/.ssh/nas_deploy_key.pub superpulpax@192.168.1.3
```

#### **Add Private Key to GitHub Secrets:**
```bash
# Display private key (copy the entire output)
cat ~/.ssh/nas_deploy_key
```

Paste the entire output (including `-----BEGIN` and `-----END` lines) into GitHub secret `NAS_SSH_PRIVATE_KEY`.

### **How CI/CD Works**

**Automatic Deployment:**
- **Push to `develop` branch** → Deploys to **staging** on NAS
- **Push to `main` branch** → Deploys to **production** on NAS

**Manual Deployment:**
- Go to **Actions** tab → **Deploy to NAS** → **Run workflow**

---

## 🌐 Web Server Configuration

### **Option 1: Using Synology Web Station**

1. **Enable Web Station** in Package Center
2. **Create Virtual Host:**
   - Domain: `aiscr-pmo.labs.paxiit.com` (or your preferred domain)
   - Document Root: `/volume1/web/labs.paxiit.com/aiscr-pmo/staging`
   - Port: 80/443

3. **Access URLs:**
   - Staging: `http://aiscr-pmo.labs.paxiit.com/staging/`
   - Production: `http://aiscr-pmo.labs.paxiit.com/production/`

### **Option 2: Using Nginx (if installed)**

Create `/etc/nginx/conf.d/aiscr-pmo.conf`:

```nginx
server {
    listen 80;
    server_name aiscr-pmo.labs.paxiit.com;
    
    # Staging
    location /staging {
        alias /volume1/web/labs.paxiit.com/aiscr-pmo/staging;
        index index.html;
        try_files $uri $uri/ /staging/frontend/index.html;
    }
    
    # Production
    location /production {
        alias /volume1/web/labs.paxiit.com/aiscr-pmo/production;
        index index.html;
        try_files $uri $uri/ /production/frontend/index.html;
    }
    
    # Default to staging
    location / {
        return 301 /staging/;
    }
}
```

---

## 📊 Deployment Status

### **Current Status:**
- ✅ Deployment scripts created
- ✅ CI/CD workflow configured
- ⬜ GitHub secrets need to be added
- ⬜ SSH key needs to be set up
- ⬜ Web server needs to be configured

### **Next Steps:**
1. Set up SSH key and add to GitHub secrets
2. Configure web server on NAS
3. Test manual deployment first
4. Push to `develop` branch to trigger staging deployment
5. Verify staging deployment works
6. Continue development with automatic deployments

---

## 🔍 Troubleshooting

### **SSH Connection Issues:**
```bash
# Test connection
ssh -p 2222 -v superpulpax@192.168.1.3

# Check SSH key
ssh -p 2222 -i ~/.ssh/nas_deploy_key superpulpax@192.168.1.3
```

### **Permission Issues:**
```bash
# Fix permissions on NAS
ssh -p 2222 superpulpax@192.168.1.3
chmod -R 755 /volume1/web/labs.paxiit.com/aiscr-pmo
chown -R superpulpax:users /volume1/web/labs.paxiit.com/aiscr-pmo
```

### **File Not Found:**
- Verify deployment path exists
- Check file permissions
- Ensure web server is configured correctly

---

## 📝 Deployment Checklist

- [ ] SSH key generated and added to NAS
- [ ] GitHub secrets configured
- [ ] Web server configured on NAS
- [ ] Test manual deployment
- [ ] Verify staging deployment works
- [ ] Test CI/CD automatic deployment
- [ ] Document access URLs
- [ ] Set up monitoring (optional)

---

**Last Updated:** 2025  
**Status:** Ready for Deployment

