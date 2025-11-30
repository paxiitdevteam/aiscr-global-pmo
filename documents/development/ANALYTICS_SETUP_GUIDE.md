# 📊 Analytics Setup Guide - Visitor Tracking

**Purpose:** Track visitor interest in the PMO application to measure engagement and interest levels.

---

## 🎯 What Gets Tracked

### **Automatic Tracking:**
- ✅ **Page Views** - Every page visit
- ✅ **Button Clicks** - All button interactions (especially "Launch App", "Download", etc.)
- ✅ **Scroll Depth** - How far visitors scroll (25%, 50%, 75%, 90%)
- ✅ **Time on Page** - How long visitors stay (30s, 1min, 2min, 5min milestones)
- ✅ **Exit Intent** - When visitors try to leave
- ✅ **Section Views** - Which parts of landing page they view
- ✅ **Blocked Access Attempts** - When visitors try to access restricted pages (shows HIGH interest!)

### **Key Interest Indicators:**
- 🔥 **High Interest Events:**
  - "Launch Web Application" button click
  - "Download Excel System" button click
  - Blocked access attempts (trying to access dashboard/download)
  - Long time on page (>2 minutes)
  - Deep scrolling (>75%)

---

## 🚀 Quick Setup (2 Options)

### **Option 1: Google Analytics 4 (Recommended - Free)**

#### **Step 1: Create Google Analytics Account**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" → "Create Account"
4. Fill in account details:
   - Account name: "AISCR Global PMO"
   - Country: Your country
   - Time zone: Your time zone
5. Click "Next"

#### **Step 2: Create Property**
1. Property name: "AISCR PMO Website"
2. Reporting time zone: Your time zone
3. Currency: Your currency
4. Click "Next"

#### **Step 3: Get Measurement ID**
1. Select "Web" as platform
2. Enter website URL: Your live website URL
3. Stream name: "AISCR PMO Website"
4. Click "Create stream"
5. **Copy the Measurement ID** (format: `G-XXXXXXXXXX`)

#### **Step 4: Add Measurement ID to Code**
1. Open `frontend/js/analytics.js`
2. Find this line:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your GA4 ID
   ```
3. Replace `'G-XXXXXXXXXX'` with your actual Measurement ID:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-ABC123XYZ'; // Your actual ID
   ```
4. Save the file

#### **Step 5: Deploy**
1. Commit and push changes
2. Deploy to your live website
3. Wait 24-48 hours for data to appear in Google Analytics

#### **Step 6: View Analytics**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. View reports:
   - **Realtime** - See visitors right now
   - **Events** - See button clicks, interactions
   - **Pages** - See which pages are visited
   - **Engagement** - See time on page, scroll depth

---

### **Option 2: Custom Tracking Only (No Google Analytics)**

If you don't want to use Google Analytics, the custom tracking still works!

1. **Leave GA4_MEASUREMENT_ID as is** (it will just log to console)
2. **View tracking data in browser console:**
   - Open browser DevTools (F12)
   - Check Console tab
   - Look for `📊` emoji logs

3. **Export tracking data:**
   - In browser console, type: `exportAnalyticsData()`
   - This downloads a JSON file with all tracking data

---

## 📈 What to Look For (Interest Indicators)

### **High Interest Signals:**
1. **Blocked Access Attempts** 🔥
   - Visitor tries to access `/dashboard` or `/download`
   - Shows they're interested enough to try accessing restricted features
   - Tracked as: `blocked_access` event

2. **Button Clicks on Key Actions** 🔥
   - "Launch Web Application" button
   - "Download Excel System" button
   - "View Features" button
   - Tracked as: `high_interest_click` event

3. **Long Engagement** 🔥
   - Time on page > 2 minutes
   - Scroll depth > 75%
   - Multiple page views
   - Tracked as: `time_on_page` and `scroll_depth` events

4. **Multiple Visits** 🔥
   - Same visitor returns multiple times
   - Shows sustained interest
   - Tracked in Google Analytics as "Returning Users"

---

## 📊 Viewing Your Analytics

### **Google Analytics Dashboard:**

1. **Realtime Report:**
   - See visitors right now
   - See which pages they're viewing
   - See events as they happen

2. **Events Report:**
   - Go to: Reports → Engagement → Events
   - See all tracked events:
     - `button_click` - All button clicks
     - `high_interest_click` - Key action buttons
     - `blocked_access` - Access attempts (HIGH INTEREST!)
     - `scroll_depth` - How far they scroll
     - `time_on_page` - How long they stay

3. **Pages Report:**
   - Go to: Reports → Engagement → Pages and screens
   - See which pages get most visits
   - See average time on each page

4. **Custom Reports:**
   - Create custom reports for:
     - Interest level (high/low)
     - Engagement score
     - Conversion funnel

### **Custom Tracking (Console):**

1. **View current session data:**
   ```javascript
   getAnalyticsSummary()
   ```

2. **Export all data:**
   ```javascript
   exportAnalyticsData()
   ```

---

## 🔍 Key Metrics to Monitor

### **Interest Level Metrics:**
- **Blocked Access Attempts** - Number of times visitors try to access restricted pages
- **High Interest Clicks** - Clicks on "Launch App", "Download", etc.
- **Engagement Time** - Average time on page
- **Scroll Depth** - How far visitors scroll
- **Return Visits** - Visitors coming back

### **Engagement Metrics:**
- **Page Views** - Total page visits
- **Events** - Total interactions
- **Bounce Rate** - Visitors leaving immediately
- **Session Duration** - How long visitors stay

---

## 🎯 Setting Up Alerts (Optional)

### **Google Analytics Alerts:**

1. Go to Admin → Custom Definitions → Custom Events
2. Create alert for:
   - **High Interest Event** - Alert when `blocked_access` or `high_interest_click` happens
   - **High Engagement** - Alert when time on page > 5 minutes
   - **Multiple Visits** - Alert when same visitor returns

---

## 🔒 Privacy & Compliance

### **What We Track:**
- ✅ Page views and navigation
- ✅ Button clicks and interactions
- ✅ Time on page and scroll depth
- ✅ Browser type and screen size
- ❌ **NO personal information** (names, emails, etc.)
- ❌ **NO IP addresses** (handled by Google Analytics)

### **GDPR Compliance:**
- Google Analytics 4 is GDPR compliant
- Visitors can opt-out via browser settings
- No personal data is collected

---

## 🛠️ Troubleshooting

### **Analytics Not Working?**

1. **Check Measurement ID:**
   - Open `frontend/js/analytics.js`
   - Verify `GA4_MEASUREMENT_ID` is set correctly
   - Format should be: `G-XXXXXXXXXX`

2. **Check Console:**
   - Open browser DevTools (F12)
   - Check Console for errors
   - Look for "Analytics initialized" message

3. **Check Network:**
   - Open DevTools → Network tab
   - Look for requests to `google-analytics.com`
   - Should see `collect` requests if working

4. **Test Events:**
   - Click a button
   - Check console for `📊 Event:` log
   - Check Google Analytics Realtime report

---

## 📝 Next Steps

1. ✅ Set up Google Analytics account
2. ✅ Add Measurement ID to `analytics.js`
3. ✅ Deploy to live website
4. ✅ Wait 24-48 hours for data
5. ✅ Check Google Analytics dashboard
6. ✅ Monitor interest indicators
7. ✅ Create custom reports for key metrics

---

## 💡 Pro Tips

1. **Focus on Blocked Access Attempts:**
   - These show the highest interest
   - Visitors trying to access restricted features are very interested

2. **Monitor Button Clicks:**
   - "Launch Web Application" = High interest
   - "Download Excel" = High interest
   - Track these separately

3. **Set Up Weekly Reports:**
   - Review analytics weekly
   - Track trends over time
   - Identify peak interest times

4. **Compare Metrics:**
   - Compare blocked access attempts vs. total visitors
   - Higher ratio = higher interest
   - Track this over time

---

**Last Updated:** November 28, 2025  
**Status:** Ready to Use  
**Next Review:** After first week of tracking

