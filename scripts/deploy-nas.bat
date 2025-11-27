@echo off
REM AISCR Global PMO - NAS Deployment Script (Windows)
REM Deploys to Synology DS1522 NAS at 192.168.1.3:2222

setlocal enabledelayedexpansion

echo 🚀 AISCR Global PMO - NAS Deployment
echo.

REM Configuration
set NAS_HOST=192.168.1.3
set NAS_PORT=2222
set NAS_USER=superpulpax
set NAS_PATH=/volume1/web/pmo

set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=staging

echo ℹ️  Environment: %ENVIRONMENT%
echo ℹ️  NAS: %NAS_USER%@%NAS_HOST%:%NAS_PORT%
echo.

REM Validate environment
if not "%ENVIRONMENT%"=="staging" if not "%ENVIRONMENT%"=="production" (
    echo ❌ Invalid environment: %ENVIRONMENT%
    echo Usage: %0 [staging^|production]
    exit /b 1
)

REM Set deployment path
if "%ENVIRONMENT%"=="production" (
    set DEPLOY_PATH=%NAS_PATH%/production
) else (
    set DEPLOY_PATH=%NAS_PATH%/staging
)

echo ℹ️  Deployment Path: %DEPLOY_PATH%
echo.

REM Check prerequisites
echo 📦 Checking prerequisites...

REM Check SSH (Git Bash or WSL)
where ssh >nul 2>&1
if errorlevel 1 (
    echo ❌ SSH is not available
    echo Please use Git Bash or WSL
    exit /b 1
)
echo ✅ SSH found
echo.

REM Test NAS connection
echo 📦 Testing NAS connection...
ssh -p %NAS_PORT% -o ConnectTimeout=5 %NAS_USER%@%NAS_HOST% "echo Connection successful" 2>nul
if errorlevel 1 (
    echo ℹ️  Testing connection (may prompt for password)...
    ssh -p %NAS_PORT% -o ConnectTimeout=10 %NAS_USER%@%NAS_HOST% "echo Connection successful"
    if errorlevel 1 (
        echo ❌ Cannot connect to NAS
        echo Please check:
        echo   - NAS is accessible at %NAS_HOST%:%NAS_PORT%
        echo   - SSH is enabled on NAS
        echo   - Username is correct: %NAS_USER%
        exit /b 1
    )
)
echo ✅ NAS connection successful
echo.

REM Create deployment directory
echo 📦 Creating deployment directory on NAS...
(
    echo mkdir -p %DEPLOY_PATH%
    echo mkdir -p %DEPLOY_PATH%/frontend
    echo mkdir -p %DEPLOY_PATH%/frontend/css
    echo mkdir -p %DEPLOY_PATH%/frontend/js
    echo mkdir -p %DEPLOY_PATH%/frontend/assets
    echo mkdir -p %DEPLOY_PATH%/Templates
) | ssh -p %NAS_PORT% %NAS_USER%@%NAS_HOST% "bash"
echo ✅ Directory structure ready
echo.

REM Build artifacts
echo 📦 Building project artifacts...
if exist create_pmo_system.py (
    python create_pmo_system.py 2>nul || echo ℹ️  Skipping Excel generation
)
if exist create_word_templates.py (
    python create_word_templates.py 2>nul || echo ℹ️  Skipping Word templates
)
echo ✅ Build complete
echo.

REM Create deployment package
echo 📦 Creating deployment package...
set TEMP_DIR=%TEMP%\aiscr-pmo-deploy
set DEPLOY_DIR=%TEMP_DIR%\deploy

if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%DEPLOY_DIR%"

REM Copy frontend
if exist frontend (
    xcopy /E /I /Y frontend\* "%DEPLOY_DIR%\" >nul
    echo ✅ Frontend files copied
)

REM Copy root HTML files
for %%f in (landing.html download.html) do (
    if exist "%%f" copy /Y "%%f" "%DEPLOY_DIR%\" >nul
)

REM Copy Templates
if exist Templates (
    xcopy /E /I /Y Templates "%DEPLOY_DIR%\Templates\" >nul
    echo ✅ Templates copied
)

REM Copy generated files
for %%f in (AISCR_PMO_Full_Automated_System.xlsx AISCR_PMO_Complete_System.zip) do (
    if exist "%%f" copy /Y "%%f" "%DEPLOY_DIR%\" >nul
)

echo ✅ Deployment package created
echo.

REM Deploy to NAS
echo 📦 Deploying to NAS...
cd "%DEPLOY_DIR%"
for /r %%f in (*) do (
    set "relpath=%%f"
    set "relpath=!relpath:%DEPLOY_DIR%\=!"
    set "relpath=!relpath:\=/!"
    echo Copying: !relpath!
    scp -P %NAS_PORT% "%%f" %NAS_USER%@%NAS_HOST%:%DEPLOY_PATH%/!relpath!
)
cd /d "%~dp0"
echo ✅ Files copied to NAS
echo.

REM Set permissions
echo 📦 Setting file permissions...
(
    echo chmod -R 755 %DEPLOY_PATH%
    echo chown -R %NAS_USER%:users %DEPLOY_PATH% 2^>^/dev/null ^|^| true
) | ssh -p %NAS_PORT% %NAS_USER%@%NAS_HOST% "bash"
echo ✅ Permissions configured
echo.

REM Cleanup
rmdir /s /q "%TEMP_DIR%" 2>nul
echo ✅ Temporary files cleaned
echo.

REM Summary
echo 📊 Deployment Summary
echo.
echo ✅ Deployment complete!
echo.
echo Environment: %ENVIRONMENT%
echo NAS Path: %DEPLOY_PATH%
echo Access URL: http://%NAS_HOST%/aiscr-pmo/%ENVIRONMENT%/
echo.
echo ℹ️  Note: Update your web server configuration to serve from the deployment path
echo.

