# 📁 NAS Directory Structure - AISCR Global PMO

## 🎯 Organized Structure

Your PMO application is now organized in a clean, structured way on the NAS.

---

## 📂 Main Directory Location

**Base Path:** `/volume1/web/labs.paxiit.com/aiscr-pmo/`

This is where ALL PMO files are stored in an organized structure.

---

## 📁 Directory Structure

```
/volume1/web/labs.paxiit.com/aiscr-pmo/
│
├── production/                    # 🟢 PRODUCTION (Live Site)
│   ├── frontend/
│   │   ├── index.html            # Main dashboard
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── charts.js
│   │   │   ├── modals.js
│   │   │   └── ...
│   │   └── assets/
│   │       └── (images, icons, etc.)
│   ├── Templates/
│   │   ├── 01_Charter_Template.docx
│   │   ├── 02_Scope_Template.docx
│   │   └── ... (all 22 templates)
│   ├── landing.html              # Landing page
│   ├── download.html             # Download page
│   ├── AISCR_PMO_Full_Automated_System.xlsx
│   └── AISCR_PMO_Complete_System.zip
│
└── staging/                       # 🟡 STAGING (Testing)
    ├── frontend/
    │   ├── index.html
    │   ├── css/
    │   ├── js/
    │   └── assets/
    ├── Templates/
    ├── landing.html
    └── download.html
```

---

## 🌐 Access URLs

After virtual host configuration:

- **Production:** `http://aiscr-pmo.labs.paxiit.com/`
- **Staging:** `http://aiscr-pmo.labs.paxiit.com/staging/`
- **Landing Page:** `http://aiscr-pmo.labs.paxiit.com/landing.html`
- **Download Page:** `http://aiscr-pmo.labs.paxiit.com/download.html`

---

## 🔍 How to Check Your PMO Directory

### **SSH to NAS:**
```bash
ssh -p 2222 superpulpax@192.168.1.3
```

### **Navigate to PMO Directory:**
```bash
cd /volume1/web/labs.paxiit.com/aiscr-pmo/
ls -la
```

### **Check Production Files:**
```bash
ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/production/
ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/production/frontend/
```

### **Check Staging Files:**
```bash
ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/staging/
ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/staging/frontend/
```

---

## 📋 Directory Purpose

### **`production/`**
- **Purpose:** Live, production version of the app
- **When Updated:** Only after manual approval in GitHub Actions
- **Access:** Public/authorized users
- **Document Root:** Use this for virtual host

### **`staging/`**
- **Purpose:** Testing and development version
- **When Updated:** Automatically on push to `develop` branch
- **Access:** Internal team/testing
- **Use:** Test new features before production

---

## 🛠️ Virtual Host Configuration

When creating the virtual host in Web Station:

**Document Root:** `/volume1/web/labs.paxiit.com/aiscr-pmo/production`

This points to the production folder, which contains:
- `frontend/` - All web application files
- `Templates/` - Word document templates
- `landing.html` - Landing page
- `download.html` - Download page

---

## ✅ Verification Commands

### **Check if directory exists:**
```bash
ssh -p 2222 superpulpax@192.168.1.3 "test -d /volume1/web/labs.paxiit.com/aiscr-pmo && echo '✅ PMO directory exists' || echo '❌ Directory not found'"
```

### **Check directory structure:**
```bash
ssh -p 2222 superpulpax@192.168.1.3 "find /volume1/web/labs.paxiit.com/aiscr-pmo -type d | sort"
```

### **Check file permissions:**
```bash
ssh -p 2222 superpulpax@192.168.1.3 "ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/"
```

### **Fix permissions (if needed):**
```bash
ssh -p 2222 superpulpax@192.168.1.3 "chmod -R 755 /volume1/web/labs.paxiit.com/aiscr-pmo && chown -R superpulpax:users /volume1/web/labs.paxiit.com/aiscr-pmo"
```

---

## 📝 Important Notes

1. **All PMO files are in ONE location:** `/volume1/web/labs.paxiit.com/aiscr-pmo/`
2. **Two environments:** `production/` and `staging/`
3. **Clean structure:** Everything organized in subdirectories
4. **No scattered files:** All PMO-related files are in this directory
5. **Easy to find:** Single, organized location

---

## 🔄 Deployment Updates This Structure

When you deploy:

1. **Staging deployment** → Updates `/volume1/web/labs.paxiit.com/aiscr-pmo/staging/`
2. **Production deployment** → Updates `/volume1/web/labs.paxiit.com/aiscr-pmo/production/`

All files are automatically organized in the correct subdirectories.

---

## 🎯 Summary

- **Location:** `/volume1/web/labs.paxiit.com/aiscr-pmo/`
- **Production:** `/volume1/web/labs.paxiit.com/aiscr-pmo/production/`
- **Staging:** `/volume1/web/labs.paxiit.com/aiscr-pmo/staging/`
- **Virtual Host Root:** `/volume1/web/labs.paxiit.com/aiscr-pmo/production`

**Everything is now organized in one clean location!** ✅

