# 📁 NAS Organization Plan - Complete Structure

## 🎯 Goal

Organize `/volume1/web/` directory with:
- Each application in its own folder
- Each application has its own backup folder
- All backups organized by application
- Log files in dedicated folder
- Maintain reverse proxy compatibility

---

## 📂 New Organized Structure

```
/volume1/web/
│
├── _applications/              # All applications organized here
│   ├── pmo/                   # PMO Application
│   │   ├── backups/          # PMO-specific backups
│   │   ├── production/       # Production files
│   │   │   ├── frontend/
│   │   │   ├── Templates/
│   │   │   ├── landing.html
│   │   │   └── download.html
│   │   └── staging/         # Staging files
│   │       ├── frontend/
│   │       └── Templates/
│   │
│   ├── labs-paxiit/          # Labs application
│   │   └── backups/
│   │
│   ├── paxiit-com/           # Main website
│   │   └── backups/         # All paxiit.com_backup_*.tar.gz files
│   │
│   ├── admin-paxiit/         # Admin panel
│   │   └── backups/         # admin_backup_* files
│   │
│   ├── digipaxi/            # Digipaxi app
│   │   └── backups/
│   │
│   ├── corporate-website/   # Corporate site
│   │   └── backups/
│   │
│   ├── paxi-studio/         # Paxi Studio
│   │   └── backups/
│   │
│   ├── monitoring/           # Monitoring tools
│   │   └── backups/
│   │
│   ├── api/                 # API services
│   │   └── backups/
│   │
│   ├── portfolio/           # Portfolio site
│   │   └── backups/
│   │
│   ├── replypro/            # ReplyPro
│   │   └── backups/
│   │
│   └── other/               # Other applications
│       └── backups/
│
├── _backups/                # General/unsorted backups
├── _logs/                   # All .log files
├── _temp/                   # Temporary files
│
└── [existing app folders]    # Keep existing for reverse proxy
    ├── labs.paxiit.com/
    │   └── aiscr-pmo → symlink to _applications/pmo/production
    ├── paxiit.com/
    ├── admin.paxiit.com/
    └── ... (other existing folders)
```

---

## 🔄 Reverse Proxy Compatibility

**Important:** We maintain compatibility with existing reverse proxy setup:

1. **Keep existing folders** (labs.paxiit.com, paxiit.com, etc.)
2. **Create symlinks** from old locations to new organized locations
3. **Reverse proxy continues to work** without changes
4. **Virtual hosts** can be updated later to point to new locations

**Example:**
- Old: `/volume1/web/labs.paxiit.com/aiscr-pmo/`
- New: `/volume1/web/_applications/pmo/production/`
- Symlink: `labs.paxiit.com/aiscr-pmo` → `_applications/pmo/production`

---

## 📋 What Gets Moved

### **Backup Files:**
- `paxiit.com_backup_*.tar.gz` → `_applications/paxiit-com/backups/`
- `admin_backup_*` → `_applications/admin-paxiit/backups/`
- `backups/` folder contents → `_backups/`

### **Log Files:**
- `*.log` → `_logs/`

### **PMO Application:**
- `labs.paxiit.com/aiscr-pmo/` → `_applications/pmo/production/`
- Create symlink for reverse proxy compatibility

---

## ✅ Benefits

1. **Organized:** Each app has its own folder
2. **Backups:** Each app has its own backup folder
3. **Clean:** No scattered files
4. **Compatible:** Reverse proxy still works
5. **Maintainable:** Easy to find and manage files
6. **Scalable:** Easy to add new applications

---

## 🚀 Running the Organization Script

```bash
# Review the script first
cat scripts/organize-nas.sh

# Run the organization
bash scripts/organize-nas.sh
```

**The script will:**
1. Create organized folder structure
2. Move backup files to appropriate app folders
3. Move log files to _logs folder
4. Organize PMO application
5. Create symlinks for reverse proxy compatibility
6. Set proper permissions

---

## ⚠️ After Organization

### **Update Virtual Host (if needed):**

If you create a new virtual host for PMO, use:
- **Document Root:** `/volume1/web/_applications/pmo/production`

### **Update Deployment Scripts:**

The deployment scripts will automatically use the new path:
- Production: `_applications/pmo/production`
- Staging: `_applications/pmo/staging`
- Backups: `_applications/pmo/backups`

---

## 📊 Current vs New

| Current | New |
|---------|-----|
| Files scattered everywhere | Organized in _applications/ |
| Backups in root | Each app has backups/ folder |
| Logs in root | All logs in _logs/ |
| PMO in labs.paxiit.com/ | PMO in _applications/pmo/ |
| Hard to find files | Easy to find files |

---

**Ready to organize? Run: `bash scripts/organize-nas.sh`**

