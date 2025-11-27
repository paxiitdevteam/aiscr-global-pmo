# 🚀 Setup Steps - AISCR Global PMO Deployment

Follow these steps in order to complete the deployment setup.

---

## ✅ Step 1: Configure GitHub Environments (5 minutes)

### **1.1 Go to GitHub Repository Settings**

1. Open: https://github.com/paxiitdevteam/aiscr-global-pmo/settings/environments

### **1.2 Create "staging" Environment**

1. Click **"New environment"**
2. Name: `staging`
3. Click **"Configure environment"**
4. **Leave all protection rules OFF** (auto-deploy)
5. Click **"Save protection rules"**

### **1.3 Create "production" Environment**

1. Click **"New environment"**
2. Name: `production`
3. Click **"Configure environment"**
4. **Enable protection rules:**
   - ✅ **Required reviewers:** Click "Add" → Add yourself (or team members)
   - ✅ **Wait timer:** Set to `0` minutes (or your preference)
5. Click **"Save protection rules"**

**✅ Step 1 Complete!**

---

## ✅ Step 2: Set Up SSH Key & GitHub Secrets (15 minutes)

### **2.1 Generate SSH Key (if you don't have one)**

Open Git Bash or Terminal and run:

```bash
# Generate SSH key for NAS deployment
ssh-keygen -t ed25519 -C "github-actions-nas-deploy" -f ~/.ssh/nas_deploy_key

# Press Enter when asked for passphrase (or set one if preferred)
```

### **2.2 Copy Public Key to NAS**

```bash
# Copy public key to NAS
ssh-copy-id -p 2222 -i ~/.ssh/nas_deploy_key.pub superpulpax@192.168.1.3

# Enter your NAS password when prompted
```

### **2.3 Test SSH Connection**

```bash
# Test connection (should work without password now)
ssh -p 2222 -i ~/.ssh/nas_deploy_key superpulpax@192.168.1.3 "echo 'Connection successful'"
```

### **2.4 Add GitHub Secrets**

1. Go to: https://github.com/paxiitdevteam/aiscr-global-pmo/settings/secrets/actions

2. Click **"New repository secret"** for each:

   **Secret 1: `NAS_HOST`**
   - Name: `NAS_HOST`
   - Value: `192.168.1.3`
   - Click **"Add secret"**

   **Secret 2: `NAS_USER`**
   - Name: `NAS_USER`
   - Value: `superpulpax`
   - Click **"Add secret"**

   **Secret 3: `NAS_PATH`**
   - Name: `NAS_PATH`
   - Value: `/volume1/web/labs.paxiit.com/aiscr-pmo`
   - Click **"Add secret"**

   **Secret 4: `NAS_SSH_PRIVATE_KEY`**
   - Name: `NAS_SSH_PRIVATE_KEY`
   - Value: (Copy entire private key - see below)
   - Click **"Add secret"**

   **To get private key:**
   ```bash
   # Display private key (copy everything including BEGIN and END lines)
   cat ~/.ssh/nas_deploy_key
   ```
   Copy the entire output (from `-----BEGIN` to `-----END`) and paste into GitHub secret.

**✅ Step 2 Complete!**

---

## ✅ Step 3: Configure Virtual Host on NAS (10 minutes)

### **3.1 Open Synology Web Station**

1. **DSM** → **Package Center** → Install **"Web Station"** (if not installed)
2. Open **Web Station**

### **3.2 Create Virtual Host**

1. In Web Station, click **"Virtual Host"** → **"Create"**
2. Fill in the form:

   **Basic Settings:**
   - **Host Name:** `aiscr-pmo.labs.paxiit.com` (or your preferred domain)
   - **Port:** `80` (HTTP) or `443` (HTTPS if you have SSL)
   - **Document Root:** `/volume1/web/labs.paxiit.com/aiscr-pmo/production`
   - **HTTP Backend:** `Nginx` (recommended) or `Apache`
   - **PHP Version:** `Not required` (or leave default - app is static HTML/JS)

3. Click **"Create"**

### **3.3 Configure Reverse Proxy (if needed)**

If your reverse proxy is already configured, skip this step.

1. **DSM** → **Control Panel** → **Application Portal** → **Reverse Proxy**
2. Click **"Create"**
3. Fill in:
   - **Description:** `AISCR PMO`
   - **Source:**
     - **Protocol:** `HTTP` (or HTTPS)
     - **Hostname:** `aiscr-pmo.labs.paxiit.com` (or your domain)
     - **Port:** `80` (or `443` for HTTPS)
   - **Destination:**
     - **Protocol:** `HTTP`
     - **Hostname:** `localhost`
     - **Port:** `80` (or your virtual host port)
4. Click **"Save"**

**✅ Step 3 Complete!**

---

## ✅ Step 4: Test First Deployment (10 minutes)

### **4.1 Create Develop Branch**

```bash
# In your project directory
git checkout -b develop
git push -u origin develop
```

This will automatically trigger staging deployment!

### **4.2 Check Deployment Status**

1. Go to: https://github.com/paxiitdevteam/aiscr-global-pmo/actions
2. You should see **"Deploy to NAS (Staging)"** running
3. Wait for it to complete (should take 2-3 minutes)

### **4.3 Verify Staging Deployment**

1. Visit: `http://aiscr-pmo.labs.paxiit.com/staging/` (or your domain)
2. Or: `http://192.168.1.3/aiscr-pmo/staging/` (if using IP)
3. Test the application:
   - Check dashboard loads
   - Test navigation
   - Verify all features work

### **4.4 Test Production Deployment (with approval)**

```bash
# Merge develop to main
git checkout main
git merge develop
git push origin main
```

1. Go to: https://github.com/paxiitdevteam/aiscr-global-pmo/actions
2. You'll see **"Deploy to NAS (Production)"** waiting for approval
3. Click on the workflow run
4. Click **"Review deployments"** button
5. Click **"Approve and deploy"** for production
6. Wait for deployment to complete

### **4.5 Verify Production**

1. Visit: `http://aiscr-pmo.labs.paxiit.com/` (or your domain)
2. Verify everything works

**✅ Step 4 Complete!**

---

## 🎉 Setup Complete!

Your deployment is now configured:

- ✅ **Staging:** Auto-deploys on push to `develop`
- ✅ **Production:** Requires manual approval on push to `main`
- ✅ **Virtual Host:** Configured on NAS
- ✅ **Reverse Proxy:** Ready to route traffic

---

## 📋 Quick Reference

### **Deploy to Staging:**
```bash
git checkout develop
# ... make changes ...
git push origin develop
# → Auto-deploys to staging
```

### **Deploy to Production:**
```bash
# 1. Test in staging first
# 2. Merge to main
git checkout main
git merge develop
git push origin main
# 3. Approve in GitHub Actions
# → Deploys to production
```

### **Manual Deployment (if needed):**
```bash
# Deploy to staging
./scripts/deploy-nas.sh staging

# Deploy to production
./scripts/deploy-nas.sh production
```

---

## 🔍 Troubleshooting

### **SSH Connection Fails:**
- Verify NAS is accessible: `ping 192.168.1.3`
- Check SSH is enabled on NAS
- Verify username is correct

### **Virtual Host Not Working:**
- Check Web Station is running
- Verify document root path exists
- Check file permissions: `chmod -R 755 /volume1/web/labs.paxiit.com/aiscr-pmo`

### **404 Errors:**
- Verify reverse proxy is configured correctly
- Check virtual host document root path
- Ensure files are deployed to correct location

### **GitHub Actions Fails:**
- Check all secrets are added correctly
- Verify SSH key is correct
- Check workflow logs for specific errors

---

**Need Help?** Check `deployment/README.md` for detailed troubleshooting.

