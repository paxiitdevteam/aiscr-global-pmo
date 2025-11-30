# 🧪 Test Analytics Module Locally

## ✅ Quick Test Steps

### **Step 1: Start Local Server**

```bash
# From project root directory
bash scripts/start-server.sh
```

Or manually:
```bash
python3 -m http.server 8000
```

### **Step 2: Open Test Page**

Open in browser:
```
http://localhost:8000/analytics-admin-dashboard.html
```

### **Step 3: Test All Features**

1. **Click "Test Page View"** - Should see success message
2. **Click "Test Event"** - Should see event tracked
3. **Click "Test Button Click"** - Should see button click tracked
4. **Click "Test High Interest Click"** - Should track as high interest
5. **Click "Test Blocked Access"** - Should track blocked access (HIGH INTEREST!)
6. **Scroll the test area** - Should track scroll depth
7. **Wait 30 seconds** - Should track time on page milestone

### **Step 4: View Analytics Data**

1. **In Test Page:**
   - Click "Refresh Summary" to see current data
   - Check console output (bottom of page)
   - Click "Export Data" to download JSON

2. **Open Admin Dashboard:**
   ```
   http://localhost:8000/analytics-admin-dashboard.html
   ```
   - See real-time analytics
   - View all events
   - Filter by type (High Interest, Engagement, etc.)

### **Step 5: Test on Real Pages**

1. **Landing Page:**
   ```
   http://localhost:8000/
   ```
   - Click buttons (should track)
   - Scroll page (should track depth)
   - Check browser console (F12) for tracking logs

2. **Dashboard (if accessible):**
   ```
   http://localhost:8000/frontend/index.html
   ```
   - Navigate between pages
   - Click buttons
   - Check console for tracking

---

## 🔍 What to Check

### **Browser Console (F12)**

Look for these logs:
- ✅ `Analytics initialized`
- ✅ `📊 Page View:` - When page loads
- ✅ `📊 Event:` - When events fire
- ✅ `Google Analytics 4 initialized` - If GA4 is configured

### **Test Page Console Output**

- Should show all test results
- Should show analytics summary
- Should show event tracking

### **Admin Dashboard**

- Should show page views count
- Should show events count
- Should show high interest events
- Should list all events

---

## 🐛 Troubleshooting

### **Analytics Not Working?**

1. **Check if script is loaded:**
   - Open DevTools (F12)
   - Go to Network tab
   - Refresh page
   - Look for `analytics.js` - should be loaded

2. **Check console for errors:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for red error messages

3. **Check if functions exist:**
   - In console, type: `typeof trackEvent`
   - Should return: `"function"`
   - If returns `"undefined"`, script not loaded

4. **Check file paths:**
   - Make sure `frontend/js/analytics.js` exists
   - Make sure it's included in HTML files

---

## ✅ Success Indicators

### **Everything Working If:**
- ✅ Test page shows "Analytics module loaded successfully!"
- ✅ All test buttons show success messages
- ✅ Console shows `📊` tracking logs
- ✅ Admin dashboard shows data
- ✅ Export data works

### **Google Analytics (Optional):**
- ✅ Console shows "Google Analytics 4 initialized"
- ✅ Network tab shows requests to `google-analytics.com`
- ✅ Can see data in Google Analytics dashboard (after 24-48 hours)

---

## 📊 Expected Results

### **After Testing:**
- Page Views: At least 1 (test page load)
- Total Events: At least 5-10 (from test buttons)
- High Interest Events: At least 2 (high interest click + blocked access)
- Engagement Events: At least 1 (scroll depth or time on page)

---

## 🚀 Next Steps

Once local testing is successful:

1. ✅ Deploy to live website
2. ✅ Set up Google Analytics (optional)
3. ✅ Monitor real visitor data
4. ✅ Check analytics weekly

---

**Status:** Ready for Testing  
**Time Required:** 10-15 minutes  
**Difficulty:** Easy

