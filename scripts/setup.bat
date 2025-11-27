@echo off
REM AISCR Global PMO - Setup Script (Windows)

echo 🔧 AISCR Global PMO - Project Setup
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

REM Install dependencies
echo 📦 Installing Python dependencies...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
echo ✅ Dependencies installed
echo.

REM Generate project files
echo 📊 Generating project files...
python create_pmo_system.py
python create_word_templates.py
python create_zip.py
echo ✅ Project files generated
echo.

echo ✅ Setup complete!
echo.
echo To start the server, run:
echo   scripts\start-server.bat
echo.

pause

