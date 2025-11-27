# 📝 Step-by-Step: Create GitHub Repository

Follow these exact steps to create your GitHub repository and connect it.

## 🚀 Step 1: Create GitHub Account (If Needed)

1. Go to https://github.com
2. Click "Sign up" (top right)
3. Follow the signup process
4. Verify your email

---

## 📦 Step 2: Create New Repository

1. **Login to GitHub**
   - Go to https://github.com
   - Click "Sign in" if not already logged in

2. **Create Repository**
   - Click the **"+"** icon (top right)
   - Select **"New repository"**

3. **Repository Settings**
   - **Repository name:** `aiscr-global-pmo`
   - **Description:** `AISCR Global PMO - Automated Excel System & Web Application`
   - **Visibility:** 
     - ✅ Choose **Private** (recommended for internal projects)
     - Or **Public** (if you want it open source)
   - **⚠️ IMPORTANT:** 
     - ❌ **DO NOT** check "Add a README file"
     - ❌ **DO NOT** check "Add .gitignore"
     - ❌ **DO NOT** check "Choose a license"
     - (We already have these files!)

4. **Click "Create repository"**

---

## 🔗 Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you instructions. Follow these:

### Option A: Using HTTPS (Recommended for beginners)

```bash
# Copy the repository URL from GitHub (it will look like):
# https://github.com/YOUR-USERNAME/aiscr-global-pmo.git

# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/aiscr-global-pmo.git

# Verify it was added
git remote -v
```

### Option B: Using SSH (If you have SSH keys set up)

```bash
# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin git@github.com:YOUR-USERNAME/aiscr-global-pmo.git

# Verify it was added
git remote -v
```

---

## 📤 Step 4: Push Your Code to GitHub

```bash
# Make sure you're on main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your GitHub password)
  - See "Step 5" below for creating a token

---

## 🔐 Step 5: Create Personal Access Token (If Needed)

If Git asks for a password, you need a Personal Access Token:

1. **Go to GitHub Settings**
   - Click your profile picture (top right)
   - Click **"Settings"**

2. **Create Token**
   - Scroll down to **"Developer settings"** (left sidebar)
   - Click **"Personal access tokens"**
   - Click **"Tokens (classic)"**
   - Click **"Generate new token"** > **"Generate new token (classic)"**

3. **Configure Token**
   - **Note:** `AISCR PMO Development`
   - **Expiration:** Choose your preference (90 days, 1 year, or no expiration)
   - **Scopes:** Check these:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)

4. **Generate and Copy**
   - Click **"Generate token"**
   - **⚠️ IMPORTANT:** Copy the token immediately (you won't see it again!)
   - Save it securely

5. **Use Token**
   - When Git asks for password, paste the token instead

---

## ✅ Step 5: Verify Everything Works

1. **Check GitHub Repository**
   - Go to your repository: `https://github.com/YOUR-USERNAME/aiscr-global-pmo`
   - You should see all your files

2. **Test Push**
   ```bash
   # Make a small change
   echo "# Test" >> test.txt
   git add test.txt
   git commit -m "Test: Verify Git connection"
   git push origin main
   ```

3. **Check GitHub**
   - Refresh your repository page
   - You should see the new commit

---

## 🔄 Step 6: Set Up CI/CD (Optional but Recommended)

### For Netlify Deployment:

1. **Create Netlify Account**
   - Go to https://www.netlify.com
   - Sign up with GitHub (recommended)

2. **Create Site**
   - Click "Add new site" > "Import an existing project"
   - Select your GitHub repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Click "Deploy site"

3. **Get Netlify Tokens**
   - Go to Netlify Dashboard > User settings > Applications
   - Create new access token
   - Copy the token

4. **Add to GitHub Secrets**
   - Go to your GitHub repository
   - Click **Settings** > **Secrets and variables** > **Actions**
   - Click **"New repository secret"**
   - Add:
     - Name: `NETLIFY_AUTH_TOKEN`
     - Value: (paste your Netlify token)
   - Add another:
     - Name: `NETLIFY_SITE_ID`
     - Value: (your Netlify site ID - found in Site settings > General)

5. **Test CI/CD**
   - Make a small change and push
   - Go to GitHub repository > **Actions** tab
   - You should see the workflow running
   - After completion, check Netlify for deployment

---

## 📋 Quick Reference Commands

```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature/your-feature-name

# View remote
git remote -v

# Remove remote (if needed)
git remote remove origin
```

---

## 🆘 Troubleshooting

### Issue: "remote origin already exists"
**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/aiscr-global-pmo.git
```

### Issue: "Authentication failed"
**Solution:**
- Use Personal Access Token instead of password
- Or set up SSH keys

### Issue: "Permission denied"
**Solution:**
- Check repository visibility (private vs public)
- Verify you have access
- Check your GitHub username is correct

### Issue: "Failed to push"
**Solution:**
```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

---

## ✅ Checklist

- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Local repository connected to GitHub
- [ ] Code pushed to GitHub
- [ ] Verified files appear on GitHub
- [ ] CI/CD secrets configured (optional)
- [ ] First deployment successful (optional)

---

## 🎉 You're Done!

Your repository is now:
- ✅ On GitHub
- ✅ Connected to local repository
- ✅ Ready for collaboration
- ✅ Ready for CI/CD
- ✅ Ready for deployment

**Next:** Continue development and push changes regularly!

---

**Need Help?** 
- GitHub Docs: https://docs.github.com
- Git Docs: https://git-scm.com/doc

