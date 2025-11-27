# 🚀 Quick Reference - PMO Deployment

## 📍 Where is the PMO App?

**All PMO files are located at:**
```
/volume1/web/labs.paxiit.com/aiscr-pmo/
```

---

## 📂 Directory Structure

```
aiscr-pmo/
├── production/          ← LIVE/PRODUCTION (for virtual host)
│   ├── frontend/
│   ├── Templates/
│   ├── landing.html
│   └── download.html
│
└── staging/            ← TESTING/DEVELOPMENT
    ├── frontend/
    ├── Templates/
    ├── landing.html
    └── download.html
```

---

## ✅ What Was Done

1. ✅ **Created organized directory structure** on NAS
2. ✅ **Set proper permissions** (755 for directories)
3. ✅ **Organized production and staging** separately
4. ✅ **Ready for deployment**

---

## 🎯 Virtual Host Configuration

**When creating virtual host in Web Station:**

- **Document Root:** `/volume1/web/labs.paxiit.com/aiscr-pmo/production`
- **Host Name:** `aiscr-pmo.labs.paxiit.com` (or your domain)
- **Port:** `80` (HTTP) or `443` (HTTPS)

---

## 🔍 Quick Commands

### **Check PMO Directory:**
```bash
ssh -p 2222 superpulpax@192.168.1.3 "ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/"
```

### **Check Production:**
```bash
ssh -p 2222 superpulpax@192.168.1.3 "ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/production/"
```

### **Check Staging:**
```bash
ssh -p 2222 superpulpax@192.168.1.3 "ls -la /volume1/web/labs.paxiit.com/aiscr-pmo/staging/"
```

---

## 📋 Next Steps

1. ✅ **Directory structure created** - DONE!
2. ⬜ Configure GitHub environments
3. ⬜ Set up SSH key and GitHub secrets
4. ⬜ Create virtual host in Web Station
5. ⬜ Test first deployment

**See `SETUP_STEPS.md` for detailed instructions.**

---

**Everything is now organized in one clean location!** ✅

