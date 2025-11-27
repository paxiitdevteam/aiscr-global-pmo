@echo off
REM AISCR Global PMO - Server Startup Script (Windows)
REM Cross-platform compatible server startup

echo 🚀 Starting AISCR Global PMO Server...
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Python is not installed
    echo Please install Python 3.7+ from https://www.python.org/
    pause
    exit /b 1
)

echo ✅ Python found
echo.

REM Check dependencies
echo 📦 Checking dependencies...
python -c "import openpyxl" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Installing dependencies...
    python -m pip install -q -r requirements.txt
)

python -c "import docx" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Installing dependencies...
    python -m pip install -q -r requirements.txt
)

echo ✅ Dependencies checked
echo.

REM Generate files if needed
if not exist "AISCR_PMO_Full_Automated_System.xlsx" (
    echo 📊 Generating Excel file...
    python create_pmo_system.py
)

if not exist "Templates\*.docx" (
    echo 📄 Generating Word templates...
    python create_word_templates.py
)

if not exist "AISCR_PMO_Complete_System.zip" (
    echo 📦 Creating ZIP archive...
    python create_zip.py
)

echo.
echo 🌐 Starting web server...
echo 📍 Server running at: http://localhost:8000
echo 📍 Landing Page: http://localhost:8000/landing.html
echo 📍 Dashboard: http://localhost:8000/frontend/index.html
echo 📍 Downloads: http://localhost:8000/download.html
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start server
python -m http.server 8000

