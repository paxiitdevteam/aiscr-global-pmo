# 🔒 HTTPS Security Fix Guide - PMO Application

## Issue: "Not Secure" Warning Despite Valid Certificate

The certificate is valid, but the site shows "Not secure" because:
1. Virtual host may not be configured for HTTPS
2. HTTP is not redirecting to HTTPS
3. Browser cache may be showing old state

---

## ✅ Solution Steps

### Step 1: Configure Virtual Host for HTTPS

**In Synology Web Station:**

1. Open **Web Station** → **Virtual Host**
2. Find **pmo.paxiit.com** virtual host
3. Click **Edit**
4. Check these settings:
   - **Port:** Should be **443** (HTTPS) or both **80 and 443**
   - **SSL Certificate:** Select your renewed certificate
   - **Force HTTPS Redirect:** Enable this option (if available)

### Step 2: Enable HTTP to HTTPS Redirect

**Option A: Via Web Station GUI**
- In virtual host settings, enable "Redirect HTTP to HTTPS"
- Or enable "Force HTTPS"

**Option B: Via Reverse Proxy (if using)**
- Control Panel → Application Portal → Reverse Proxy
- Edit the rule for `pmo.paxiit.com`
- Ensure HTTPS is enabled
- Add redirect rule: HTTP (80) → HTTPS (443)

### Step 3: Clear Browser Cache

1. **Chrome/Edge:**
   - Press `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Time range: "All time"
   - Click "Clear data"

2. **Or Hard Refresh:**
   - Press `Ctrl + F5` or `Ctrl + Shift + R`
   - This forces a fresh load

### Step 4: Verify HTTPS Configuration

**Check if HTTPS is working:**
```bash
# SSH to NAS
ssh -p 2222 superpulpax@192.168.1.3

# Check if port 443 is listening
netstat -tuln | grep 443

# Check nginx configuration (if using)
cat /etc/nginx/nginx.conf | grep -A 10 "pmo.paxiit.com"
```

---

## 🔍 Quick Checks

### Check 1: Access via HTTPS
- Try: `https://pmo.paxiit.com/` (with `https://`)
- If it works, the issue is HTTP redirect

### Check 2: Certificate Status
- Click the padlock icon in browser
- Check certificate details
- Verify it's the renewed certificate

### Check 3: Mixed Content
- Open browser Developer Tools (F12)
- Go to Console tab
- Look for "Mixed Content" warnings
- All resources should load over HTTPS

---

## 🚨 Common Issues & Fixes

### Issue 1: Virtual Host Still on HTTP Only
**Fix:** Change port from 80 to 443 in Web Station

### Issue 2: No HTTPS Redirect
**Fix:** Enable "Force HTTPS" or "Redirect HTTP to HTTPS" in Web Station

### Issue 3: Certificate Not Applied
**Fix:** 
1. Go to Control Panel → Security → Certificate
2. Select your certificate
3. Click "Configure" → Assign to `pmo.paxiit.com`

### Issue 4: Reverse Proxy Not Updated
**Fix:**
1. Control Panel → Application Portal → Reverse Proxy
2. Edit rule for `pmo.paxiit.com`
3. Ensure HTTPS backend is configured
4. Add HTTP → HTTPS redirect rule

---

## ✅ Verification

After making changes:

1. **Clear browser cache** (Ctrl + Shift + Delete)
2. **Access:** `https://pmo.paxiit.com/`
3. **Check:** Padlock should show "Secure" (green)
4. **Test:** HTTP should auto-redirect to HTTPS

---

## 📝 Notes

- **No server restart needed** - Synology Web Station applies changes automatically
- **Certificate renewal** - If you just renewed, wait 1-2 minutes for propagation
- **Browser cache** - Always clear cache after certificate changes
- **Mixed content** - All external resources (CDN) are already HTTPS, so this shouldn't be an issue

---

## 🎯 Expected Result

After fixing:
- ✅ Padlock shows "Secure" (green)
- ✅ No "Not secure" warning
- ✅ HTTP automatically redirects to HTTPS
- ✅ Certificate shows as valid

---

**Last Updated:** November 28, 2025

