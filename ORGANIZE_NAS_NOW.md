# 🚀 Organize NAS Now - Step by Step

## ✅ What I Created

1. **Organization Script:** `scripts/organize-nas.sh`
2. **Organization Plan:** `NAS_ORGANIZATION_PLAN.md`
3. **Updated Deployment Scripts:** Now use new organized path

---

## 🎯 What Will Happen

The script will organize your NAS like this:

```
/volume1/web/
├── _applications/          ← All apps organized here
│   ├── pmo/              ← PMO app
│   │   ├── backups/     ← PMO backups only
│   │   ├── production/  ← Production files
│   │   └── staging/     ← Staging files
│   ├── paxiit-com/      ← Main website
│   │   └── backups/    ← All paxiit.com_backup_*.tar.gz
│   └── ... (other apps)
│
├── _backups/             ← General backups
├── _logs/                ← All .log files
└── _temp/                ← Temporary files
```

**Each application gets:**
- ✅ Its own folder
- ✅ Its own backup folder
- ✅ Clean organization

---

## 📋 Steps to Organize

### **Step 1: Review the Script**

```bash
# Check what the script will do
cat scripts/organize-nas.sh
```

### **Step 2: Run the Organization**

```bash
# Run the organization script
bash scripts/organize-nas.sh
```

**What it does:**
1. Creates organized folder structure
2. Moves all backup files to app-specific backup folders
3. Moves log files to `_logs/` folder
4. Organizes PMO application
5. Creates symlinks for reverse proxy compatibility
6. Sets proper permissions

### **Step 3: Verify Organization**

```bash
# Check the new structure
ssh -p 2222 superpulpax@192.168.1.3 "ls -la /volume1/web/_applications/"
ssh -p 2222 superpulpax@192.168.1.3 "ls -la /volume1/web/_applications/pmo/"
```

---

## ⚠️ Important Updates After Organization

### **1. Update GitHub Secret**

After organizing, update the GitHub secret:

1. Go to: https://github.com/paxiitdevteam/aiscr-global-pmo/settings/secrets/actions
2. Find `NAS_PATH` secret
3. **Update value to:** `/volume1/web/_applications/pmo`
4. Save

### **2. Update Virtual Host (When Creating)**

When you create the virtual host in Web Station:

- **Document Root:** `/volume1/web/_applications/pmo/production`
- **NOT:** `/volume1/web/labs.paxiit.com/aiscr-pmo/production`

### **3. Reverse Proxy Compatibility**

The script creates a symlink:
- `labs.paxiit.com/aiscr-pmo` → `_applications/pmo/production`

**Your reverse proxy will continue to work** because of this symlink.

---

## 📊 Before vs After

### **Before (Messy):**
```
/volume1/web/
├── paxiit.com_backup_20251114_110143.tar.gz
├── paxiit.com_backup_20251114_121214.tar.gz
├── paxiit.com_backup_20251115_003303.tar.gz
├── ... (50+ backup files)
├── server.log
├── api_gateway.log
├── labs.paxiit.com/
│   └── aiscr-pmo/
└── ... (scattered files)
```

### **After (Organized):**
```
/volume1/web/
├── _applications/
│   ├── pmo/
│   │   ├── backups/          ← PMO backups
│   │   ├── production/       ← Production files
│   │   └── staging/          ← Staging files
│   ├── paxiit-com/
│   │   └── backups/          ← All paxiit.com backups
│   └── ...
├── _logs/                     ← All .log files
└── labs.paxiit.com/
    └── aiscr-pmo → symlink    ← Reverse proxy compatibility
```

---

## ✅ Benefits

1. **Clean:** No scattered files
2. **Organized:** Each app in its own folder
3. **Backups:** Each app has its own backup folder
4. **Compatible:** Reverse proxy still works (symlink)
5. **Maintainable:** Easy to find files
6. **Scalable:** Easy to add new apps

---

## 🚀 Ready to Organize?

**Run this command:**

```bash
bash scripts/organize-nas.sh
```

**Then update:**
1. GitHub secret `NAS_PATH` → `/volume1/web/_applications/pmo`
2. Virtual host document root → `/volume1/web/_applications/pmo/production`

---

**Everything will be organized and ready!** ✅

