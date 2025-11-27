#!/bin/bash
# AISCR Global PMO - Setup Script
# Cross-platform project setup

set -e

echo "🔧 AISCR Global PMO - Project Setup"
echo ""

# Determine Python command
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
    PIP_CMD="pip3"
else
    PYTHON_CMD="python"
    PIP_CMD="pip"
fi

# Check Python
if ! command -v $PYTHON_CMD &> /dev/null; then
    echo "❌ Error: Python is not installed"
    echo "Please install Python 3.7+ from https://www.python.org/"
    exit 1
fi

echo "✅ Python found: $($PYTHON_CMD --version)"
echo ""

# Install Python dependencies
echo "📦 Installing Python dependencies..."
$PIP_CMD install --upgrade pip
$PIP_CMD install -r requirements.txt
echo "✅ Dependencies installed"
echo ""

# Generate project files
echo "📊 Generating project files..."
$PYTHON_CMD create_pmo_system.py
$PYTHON_CMD create_word_templates.py
$PYTHON_CMD create_zip.py
echo "✅ Project files generated"
echo ""

# Make scripts executable (Unix/Linux/Mac)
if [[ "$OSTYPE" != "msys" && "$OSTYPE" != "win32" ]]; then
    chmod +x scripts/*.sh
    echo "✅ Scripts made executable"
    echo ""
fi

echo "✅ Setup complete!"
echo ""
echo "To start the server, run:"
echo "  ./scripts/start-server.sh"
echo "  or"
echo "  bash scripts/start-server.sh"
echo ""

