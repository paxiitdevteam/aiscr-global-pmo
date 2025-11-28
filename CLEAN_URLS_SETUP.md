# 🔗 Clean URLs Setup Guide - PMO Application

## ✅ What Was Fixed

All file extensions and folder names have been removed from URLs:

### Before (❌ Bad):
- `pmo.paxiit.com/landing.html`
- `pmo.paxiit.com/frontend/index.html`
- `pmo.paxiit.com/download.html`

### After (✅ Good):
- `pmo.paxiit.com/` (Landing page)
- `pmo.paxiit.com/dashboard` (Dashboard)
- `pmo.paxiit.com/download` (Download page)
- `pmo.paxiit.com/templates` (Templates)

---

## 📝 Changes Made

### 1. Updated All HTML Links
- ✅ `landing.html` - All links now use clean URLs
- ✅ `frontend/index.html` - All links now use clean URLs
- ✅ `download.html` - All links now use clean URLs

### 2. Created URL Rewriting Rules
- ✅ `.htaccess` file (for Apache)
- ✅ `deployment/nginx/pmo-clean-urls.conf` (for Nginx)

### 3. Updated Deployment Script
- ✅ `.htaccess` is now included in deployment

---

## 🚀 Next Steps: Configure Web Server

### Option A: Apache (if using Apache backend)

The `.htaccess` file is already deployed and should work automatically if Apache is configured to allow `.htaccess` overrides.

**Verify:**
```bash
# SSH to NAS
ssh -p 2222 superpulpax@192.168.1.3

# Check if .htaccess exists
ls -la /volume1/web/pmo/.htaccess

# Check Apache config (if needed)
cat /etc/apache2/httpd.conf | grep AllowOverride
```

### Option B: Nginx (if using Nginx backend)

**For Synology Web Station:**

1. **Option 1: Use Web Station GUI**
   - Web Station → Virtual Host → Edit `pmo.paxiit.com`
   - Enable "URL Rewriting" or "Clean URLs"
   - Save and apply

2. **Option 2: Manual Nginx Config**
   - Copy `deployment/nginx/pmo-clean-urls.conf` to NAS
   - Include it in your Nginx configuration
   - Reload Nginx: `sudo nginx -s reload`

---

## ✅ Testing Clean URLs

After deployment, test these URLs:

1. **Landing Page:**
   - ✅ `http://pmo.paxiit.com/` (should work)
   - ✅ `http://pmo.paxiit.com/landing.html` (should redirect to `/`)

2. **Dashboard:**
   - ✅ `http://pmo.paxiit.com/dashboard` (should work)
   - ✅ `http://pmo.paxiit.com/frontend/index.html` (should redirect to `/dashboard`)

3. **Download:**
   - ✅ `http://pmo.paxiit.com/download` (should work)
   - ✅ `http://pmo.paxiit.com/download.html` (should redirect to `/download`)

4. **Templates:**
   - ✅ `http://pmo.paxiit.com/templates` (should work)

---

## 🔍 Troubleshooting

### Issue: URLs still show file extensions

**Solution:**
1. Clear browser cache (Ctrl + Shift + Delete)
2. Verify `.htaccess` is deployed: `ls -la /volume1/web/pmo/.htaccess`
3. Check Apache/Nginx error logs
4. Ensure URL rewriting is enabled in Web Station

### Issue: 404 errors on clean URLs

**Solution:**
1. Verify `.htaccess` syntax is correct
2. Check if `mod_rewrite` is enabled (Apache)
3. Verify Nginx rewrite rules are correct
4. Check file permissions

### Issue: Links still use old URLs

**Solution:**
1. Hard refresh browser (Ctrl + F5)
2. Verify deployment included updated HTML files
3. Check browser console for errors

---

## 📋 Summary

- ✅ All HTML links updated to clean URLs
- ✅ `.htaccess` file created and deployed
- ✅ Nginx configuration provided
- ✅ Deployment script updated

**Next:** Deploy the updated files and configure URL rewriting in Web Station.

---

**Last Updated:** November 28, 2025

