#!/bin/bash
# Organize paxiit.com website and backups properly
# Moves all scattered backups to paxiit.com/backups/

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📁 Organizing paxiit.com website and backups${NC}"
echo ""

# Configuration
NAS_HOST="192.168.1.3"
NAS_PORT="2222"
NAS_USER="superpulpax"

print_step() {
    echo -e "${BLUE}📦 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Step 1: Verify paxiit.com folder exists
print_step "Verifying paxiit.com structure..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    cd /volume1/web
    
    # Check if paxiit.com folder exists
    if [ ! -d "paxiit.com" ]; then
        echo "❌ ERROR: paxiit.com folder not found!"
        exit 1
    fi
    
    echo "✅ paxiit.com folder found"
    echo "   Location: /volume1/web/paxiit.com"
    echo "   Size: $(du -sh paxiit.com | awk '{print $1}')"
    
    # Check dev symlink
    if [ -L "paxiit.com_dev" ]; then
        echo "✅ paxiit.com_dev symlink found"
        echo "   Points to: $(readlink paxiit.com_dev)"
    fi
EOF

# Step 2: Create backups folder
print_step "Creating backups folder in paxiit.com..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    cd /volume1/web
    
    # Create backups folder
    mkdir -p paxiit.com/backups
    echo "✅ Created paxiit.com/backups folder"
EOF

# Step 3: Move all backup files
print_step "Moving all paxiit.com backup files..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    cd /volume1/web
    
    # Count backups in root
    ROOT_COUNT=$(find . -maxdepth 1 -name "paxiit.com_backup_*.tar.gz" -type f 2>/dev/null | wc -l)
    echo "Found $ROOT_COUNT backup files in root directory"
    
    # Count backups in #recycle
    RECYCLE_COUNT=0
    if [ -d "#recycle" ]; then
        RECYCLE_COUNT=$(find #recycle -name "paxiit.com_backup_*.tar.gz" -type f 2>/dev/null | wc -l)
        echo "Found $RECYCLE_COUNT backup files in #recycle"
    fi
    
    TOTAL=$((ROOT_COUNT + RECYCLE_COUNT))
    echo "Total backup files to move: $TOTAL"
    
    # Move from root
    if [ "$ROOT_COUNT" -gt 0 ]; then
        echo "Moving $ROOT_COUNT files from root to paxiit.com/backups..."
        find . -maxdepth 1 -name "paxiit.com_backup_*.tar.gz" -type f -exec mv {} paxiit.com/backups/ \; 2>/dev/null || true
        echo "✅ Moved files from root"
    fi
    
    # Move from #recycle
    if [ "$RECYCLE_COUNT" -gt 0 ]; then
        echo "Moving $RECYCLE_COUNT files from #recycle to paxiit.com/backups..."
        find #recycle -name "paxiit.com_backup_*.tar.gz" -type f -exec mv {} paxiit.com/backups/ \; 2>/dev/null || true
        echo "✅ Moved files from #recycle"
    fi
    
    # Final count
    FINAL_COUNT=$(ls paxiit.com/backups/paxiit.com_backup_*.tar.gz 2>/dev/null | wc -l)
    echo ""
    echo "✅ Total backups now in paxiit.com/backups/: $FINAL_COUNT"
    
    # Show size
    if [ "$FINAL_COUNT" -gt 0 ]; then
        TOTAL_SIZE=$(du -sh paxiit.com/backups/ | awk '{print $1}')
        echo "Total backup size: $TOTAL_SIZE"
    fi
EOF

print_success "Backups organized!"

# Step 4: Verify
print_step "Verifying organization..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    cd /volume1/web
    
    # Check if any backups still in root
    REMAINING=$(find . -maxdepth 1 -name "paxiit.com_backup_*.tar.gz" -type f 2>/dev/null | wc -l)
    if [ "$REMAINING" -eq 0 ]; then
        echo "✅ No backup files remaining in root directory"
    else
        echo "⚠️  Warning: $REMAINING backup files still in root"
    fi
    
    # Show structure
    echo ""
    echo "📊 paxiit.com structure:"
    echo "   /volume1/web/paxiit.com/"
    echo "   ├── backups/          ← All backups here ($(ls paxiit.com/backups/paxiit.com_backup_*.tar.gz 2>/dev/null | wc -l) files)"
    echo "   ├── frontend/"
    echo "   ├── backend/"
    echo "   └── ..."
    echo ""
    
    # List first few backups
    echo "📋 Sample backups:"
    ls -lh paxiit.com/backups/ | head -5
EOF

print_success "Organization complete!"
echo ""
print_info "✅ paxiit.com PRODUCTION: /volume1/web/paxiit.com/"
print_info "✅ paxiit.com backups: /volume1/web/paxiit.com/backups/"
print_info "✅ paxiit.com_dev: Symlink to dev location"
echo ""

