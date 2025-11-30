# 📊 Analytics Quick Start - Track Visitor Interest

## ✅ What's Already Set Up

✅ **Analytics tracking script** (`frontend/js/analytics.js`) is created  
✅ **Tracking added** to `landing.html`, `frontend/index.html`, and `download.html`  
✅ **Blocked access tracking** - When visitors try to access restricted pages, it's tracked as HIGH INTEREST!

---

## 🚀 Next Steps (5 Minutes)

### **Step 1: Get Google Analytics ID (Optional but Recommended)**

1. Go to: https://analytics.google.com/
2. Sign in with Google account
3. Create account → Create property → Get Measurement ID (format: `G-XXXXXXXXXX`)

### **Step 2: Add Your Measurement ID**

1. Open: `frontend/js/analytics.js`
2. Find line 8:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your GA4 ID
   ```
3. Replace with your ID:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-ABC123XYZ'; // Your actual ID
   ```

### **Step 3: Deploy**

1. Commit and push changes
2. Deploy to your live website
3. Done! Analytics will start tracking immediately

---

## 📈 What Gets Tracked Automatically

### **High Interest Indicators:**
- 🔥 **Blocked Access Attempts** - When visitors try to access `/dashboard` or `/download` (shows HIGH interest!)
- 🔥 **Button Clicks** - "Launch Web Application", "Download Excel System", etc.
- 🔥 **Long Engagement** - Time on page > 2 minutes, scroll depth > 75%
- 🔥 **Multiple Visits** - Visitors coming back

### **All Events Tracked:**
- Page views
- Button clicks
- Scroll depth (25%, 50%, 75%, 90%)
- Time on page (30s, 1min, 2min, 5min milestones)
- Exit intent
- Section views
- Blocked access attempts

---

## 📊 View Your Analytics

### **Option 1: Google Analytics (If you set it up)**
1. Go to: https://analytics.google.com/
2. Select your property
3. View **Realtime** report to see visitors now
4. View **Events** report to see all interactions

### **Option 2: Browser Console (Works without Google Analytics)**
1. Open your website
2. Press F12 (DevTools)
3. Go to Console tab
4. Look for `📊` emoji logs showing all tracking
5. Type `getAnalyticsSummary()` to see session data
6. Type `exportAnalyticsData()` to download JSON file

---

## 🎯 Key Metrics to Watch

### **Interest Level:**
- **Blocked Access Attempts** = Visitors trying to access restricted pages (HIGHEST interest!)
- **High Interest Clicks** = Clicks on "Launch App", "Download" buttons
- **Engagement Time** = Average time on page
- **Return Visits** = Visitors coming back

---

## 📝 Full Documentation

See `documents/development/ANALYTICS_SETUP_GUIDE.md` for complete setup guide.

---

**Status:** ✅ Ready to Use  
**Time to Setup:** 5 minutes  
**Cost:** Free (Google Analytics is free)

