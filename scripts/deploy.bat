@echo off
REM AISCR Global PMO - Standard Deployment Script (Windows)
REM Cross-platform deployment automation

setlocal enabledelayedexpansion

echo 🚀 AISCR Global PMO - Deployment Script
echo.

REM Configuration
set DEPLOY_PLATFORM=%1
if "%DEPLOY_PLATFORM%"=="" set DEPLOY_PLATFORM=netlify

set ENVIRONMENT=%2
if "%ENVIRONMENT%"=="" set ENVIRONMENT=production

echo ℹ️  Deployment Platform: %DEPLOY_PLATFORM%
echo ℹ️  Environment: %ENVIRONMENT%
echo.

REM Check prerequisites
echo ℹ️  Checking prerequisites...

REM Check Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed
    exit /b 1
)
echo ✅ Git found

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed
    exit /b 1
)
echo ✅ Python found
echo.

REM Build step
echo ℹ️  Building project...
python create_pmo_system.py
python create_word_templates.py
python create_zip.py
echo ✅ Build complete
echo.

REM Deployment
if "%DEPLOY_PLATFORM%"=="netlify" (
    echo ℹ️  Deploying to Netlify...
    
    REM Check Netlify CLI
    netlify --version >nul 2>&1
    if errorlevel 1 (
        echo ℹ️  Installing Netlify CLI...
        npm install -g netlify-cli
    )
    
    if "%ENVIRONMENT%"=="production" (
        netlify deploy --prod --dir=.
    ) else (
        netlify deploy --dir=.
    )
    echo ✅ Deployed to Netlify
    
) else if "%DEPLOY_PLATFORM%"=="nas" (
    echo ℹ️  Deploying to NAS...
    
    REM Check if NAS deployment script exists
    if exist scripts\deploy-nas.sh (
        bash scripts/deploy-nas.sh %ENVIRONMENT%
    ) else (
        echo ❌ NAS deployment script not found
        exit /b 1
    )
    echo ✅ Deployed to NAS
    
) else if "%DEPLOY_PLATFORM%"=="manual" (
    echo ℹ️  Preparing files for manual deployment...
    echo Files ready in current directory
    echo Upload the following to your web server:
    echo   - frontend/
    echo   - landing.html
    echo   - download.html
    echo   - Templates/
    echo ✅ Files ready for manual deployment
    
) else (
    echo ❌ Unknown deployment platform: %DEPLOY_PLATFORM%
    echo Supported platforms: netlify, nas, manual
    exit /b 1
)

echo.
echo ✅ Deployment complete!

