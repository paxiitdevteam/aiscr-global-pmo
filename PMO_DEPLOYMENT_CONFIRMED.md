# ✅ PMO Deployment Location - CONFIRMED

## 🎯 Deployment Location

**Production Deployment Path:** `/volume1/web/pmo/`

This is the **correct and confirmed** location for PMO app deployment.

---

## 📂 Deployment Structure

```
/volume1/web/pmo/
├── production/              # Production environment (LIVE)
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
│
├── staging/                # Staging environment (TESTING)
│   ├── frontend/
│   ├── Templates/
│   ├── landing.html
│   └── download.html
│
└── backups/               # PMO-specific backups
```

---

## 🔄 Relationship with Labs Sandbox

**Development/Sandbox:**
- Location: `/volume1/web/labs.paxiit.com/aiscr-pmo_sandbox/`
- Purpose: Development, testing, sandbox work
- Structure: `frontend-sandbox/`, `backend-sandbox/`, `backups/`, `docs/`

**Production Deployment:**
- Location: `/volume1/web/_applications/pmo/`
- Purpose: Live production and staging deployments
- Structure: `production/`, `staging/`, `backups/`

**These are separate:**
- ✅ Sandbox = Development work
- ✅ `_applications/pmo/` = Production deployment

---

## ✅ Deployment Configuration

### **Deployment Scripts:**
- ✅ `scripts/deploy-nas.sh` → Uses `/volume1/web/_applications/pmo`
- ✅ `scripts/deploy-nas.bat` → Uses `/volume1/web/_applications/pmo`
- ✅ CI/CD workflow → Uses `${{ secrets.NAS_PATH }}` (should be `/volume1/web/_applications/pmo`)

### **GitHub Secret Required:**
- **Secret Name:** `NAS_PATH`
- **Value:** `/volume1/web/pmo`
- **Location:** GitHub → Settings → Secrets → Actions

---

## 🌐 Virtual Host Configuration

When creating virtual host in Web Station:

- **Document Root:** `/volume1/web/pmo/production`
- **Host Name:** `aiscr-pmo.labs.paxiit.com` (or your domain)
- **Port:** `80` (HTTP) or `443` (HTTPS)

---

## 📋 Next Steps

1. ✅ **Deployment location confirmed:** `/volume1/web/_applications/pmo/`
2. ⬜ Run organization script to create structure
3. ⬜ Update GitHub secret `NAS_PATH`
4. ⬜ Create virtual host in Web Station
5. ⬜ Test first deployment

---

## ✅ Status

**Deployment Location:** ✅ CONFIRMED  
**Path:** `/volume1/web/pmo/`  
**All scripts configured:** ✅ YES  
**Ready for deployment:** ✅ YES

---

**Last Updated:** November 27, 2025  
**Status:** ✅ CONFIRMED AND READY

