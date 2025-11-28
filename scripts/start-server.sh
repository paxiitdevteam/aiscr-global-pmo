#!/bin/bash
# AISCR Global PMO - Server Startup Script
# Cross-platform compatible server startup

set -e

echo "🚀 Starting AISCR Global PMO Server..."
echo ""

# Check Python version
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Error: Python is not installed"
    echo "Please install Python 3.7+ from https://www.python.org/"
    exit 1
fi

# Determine Python command
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
else
    PYTHON_CMD="python"
fi

# Check Python version
PYTHON_VERSION=$($PYTHON_CMD --version 2>&1 | awk '{print $2}')
echo "✅ Python version: $PYTHON_VERSION"

# Check if dependencies are installed
echo "📦 Checking dependencies..."
if ! $PYTHON_CMD -c "import openpyxl" 2>/dev/null; then
    echo "⚠️  openpyxl not found. Installing dependencies..."
    $PYTHON_CMD -m pip install -q -r requirements.txt
fi

if ! $PYTHON_CMD -c "import docx" 2>/dev/null; then
    echo "⚠️  python-docx not found. Installing dependencies..."
    $PYTHON_CMD -m pip install -q -r requirements.txt
fi

echo "✅ Dependencies checked"
echo ""

# Generate files if they don't exist
if [ ! -f "AISCR_PMO_Full_Automated_System.xlsx" ]; then
    echo "📊 Generating Excel file..."
    $PYTHON_CMD create_pmo_system.py
fi

if [ ! -d "Templates" ] || [ -z "$(ls -A Templates/*.docx 2>/dev/null)" ]; then
    echo "📄 Generating Word templates..."
    $PYTHON_CMD create_word_templates.py
fi

if [ ! -f "AISCR_PMO_Complete_System.zip" ]; then
    echo "📦 Creating ZIP archive..."
    $PYTHON_CMD create_zip.py
fi

echo ""
echo "🌐 Starting web server..."
echo "📍 Server running at: http://localhost:8000"
echo "📍 Landing Page: http://localhost:8000/ (root)"
echo "📍 Dashboard: http://localhost:8000/dashboard"
echo "📍 Downloads: http://localhost:8000/download"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start server
$PYTHON_CMD -m http.server 8000

