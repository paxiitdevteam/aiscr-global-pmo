# 🔍 Clarifying paxiit.com Structure

## 📊 Current Situation

### **What Exists on NAS:**

1. **PRODUCTION Website (Live):**
   - Location: `/volume1/web/paxiit.com/`
   - This is the LIVE/PRODUCTION website
   - Size: ~100MB
   - Contains: frontend, backend, node_modules, etc.

2. **DEV Folder (Symlink):**
   - Location: `/volume1/web/paxiit.com_dev` (symlink)
   - Points to: `/volume1/PAXIIT-BUSINESS/Web_Projects/paxiit.com_dev`
   - This is the DEVELOPMENT version
   - **Note:** This is on NAS, not on your desktop PC

3. **Backup Files (Scattered):**
   - 52 backup files in `/volume1/web/` root
   - Some in `#recycle` folder
   - **NOT organized** - scattered everywhere

---

## 🎯 The Confusion

**You said:** "dev folder is on desktop of the PC"

**Reality:** There's a symlink `paxiit.com_dev` on NAS that points to another location on NAS (`/volume1/PAXIIT-BUSINESS/Web_Projects/paxiit.com_dev`)

**So:**
- ✅ **PRODUCTION:** `/volume1/web/paxiit.com/` (on NAS - live website)
- ✅ **DEV:** `/volume1/PAXIIT-BUSINESS/Web_Projects/paxiit.com_dev` (on NAS - development)
- ❌ **Backups:** Scattered in `/volume1/web/` root (NOT organized)

---

## ✅ Solution: Organize Everything

### **Structure We Need:**

```
/volume1/web/
├── paxiit.com/              ← PRODUCTION (live website)
│   ├── backups/            ← All paxiit.com backups HERE
│   ├── frontend/
│   ├── backend/
│   └── ...
│
├── paxiit.com_dev → symlink ← DEV (points to /volume1/PAXIIT-BUSINESS/...)
│
└── _applications/           ← Organized apps (for PMO and others)
    └── pmo/
        └── backups/
```

---

## 🔧 What We'll Do

1. **Create backups folder** inside `paxiit.com/`
2. **Move all 52 backup files** from root to `paxiit.com/backups/`
3. **Keep production and dev separate**
4. **Organize everything properly**

---

## 📋 Summary

- **ONE paxiit.com folder:** `/volume1/web/paxiit.com/` (PRODUCTION)
- **ONE dev symlink:** Points to dev location on NAS
- **52 backup files:** Need to move to `paxiit.com/backups/`
- **No confusion:** Production on NAS, Dev on NAS (via symlink)

