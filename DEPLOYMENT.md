# Deployment Guide

This guide covers deploying the AISCR Global PMO application to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

1. **Sign up/Login to Netlify**
   - Go to https://www.netlify.com
   - Sign up or login

2. **Deploy via Git**
   - Connect your GitHub repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Click "Deploy site"

3. **Manual Deploy**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login
   netlify login
   
   # Deploy
   netlify deploy --prod
   ```

4. **Set Environment Variables** (if needed)
   - Go to Site settings > Environment variables
   - Add any required secrets

**Netlify Features:**
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Continuous deployment from Git
- ✅ Branch previews
- ✅ Form handling (if needed)
- ✅ Free tier available

---

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Production Deploy**
   ```bash
   vercel --prod
   ```

**Vercel Features:**
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Free tier available

---

### Option 3: GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select source branch (usually `main`)
   - Select folder (`/root` or `/docs`)

2. **Update base paths** (if needed)
   - Update all relative paths in HTML files
   - Or use base tag in HTML

3. **Access your site**
   - URL: `https://yourusername.github.io/repository-name/`

**GitHub Pages Features:**
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Integrated with GitHub

---

### Option 4: AWS S3 + CloudFront

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://aiscr-pmo-app
   ```

2. **Upload files**
   ```bash
   aws s3 sync . s3://aiscr-pmo-app --exclude "*.git/*" --exclude "*.py"
   ```

3. **Configure CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure caching

---

### Option 5: Azure Static Web Apps

1. **Install Azure CLI**
   ```bash
   az login
   ```

2. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name aiscr-pmo \
     --resource-group your-resource-group \
     --location "East US 2"
   ```

3. **Deploy**
   - Connect to GitHub repository
   - Azure will auto-deploy on push

---

## 🔧 Pre-Deployment Checklist

- [ ] Test all functionality locally
- [ ] Update all absolute paths to relative paths
- [ ] Check all external CDN links (Font Awesome, Chart.js, etc.)
- [ ] Verify all images/assets load correctly
- [ ] Test on multiple browsers
- [ ] Test responsive design on mobile
- [ ] Update API endpoints (if any) to production URLs
- [ ] Set up environment variables
- [ ] Configure custom domain (if needed)
- [ ] Set up SSL certificate (usually automatic)

---

## 📝 Environment Variables

If you need environment variables, set them in your hosting platform:

**Netlify:**
- Site settings > Environment variables

**Vercel:**
- Project settings > Environment Variables

**Example variables:**
```
API_URL=https://api.aiscr-pmo.com
POWER_BI_URL=https://app.powerbi.com/...
TABLEAU_URL=https://your-tableau-server.com/...
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Already Configured)

The repository includes `.github/workflows/ci-cd.yml` which:
- Validates code on push
- Builds artifacts
- Deploys to staging (develop branch)
- Deploys to production (main branch)

### Manual Deployment

```bash
# Build
npm run build

# Deploy (example for Netlify)
netlify deploy --prod
```

---

## 🌐 Custom Domain Setup

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Follow DNS configuration instructions

### Vercel
1. Go to Project settings > Domains
2. Add your domain
3. Configure DNS records

---

## 📊 Monitoring & Analytics

Consider adding:
- Google Analytics
- Sentry (error tracking)
- Uptime monitoring
- Performance monitoring

---

## 🔒 Security Considerations

- ✅ HTTPS enabled (automatic on most platforms)
- ✅ Security headers configured (in netlify.toml)
- ✅ No sensitive data in frontend code
- ✅ CORS configured (if using APIs)

---

## 🆘 Troubleshooting

### Issue: Assets not loading
**Solution:** Check relative paths, ensure all files are uploaded

### Issue: 404 errors
**Solution:** Configure redirects in platform settings

### Issue: CORS errors
**Solution:** Configure CORS headers in hosting platform

### Issue: Slow loading
**Solution:** Enable CDN, optimize images, enable caching

---

## 📞 Support

For deployment issues, check:
- Platform documentation
- GitHub Issues
- Development team

---

**Last Updated:** 2025

