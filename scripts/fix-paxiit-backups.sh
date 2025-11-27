#!/bin/bash
# Fix paxiit.com backup files - Move all scattered backups to organized location

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔧 Fixing paxiit.com backup files organization${NC}"
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

# Step 1: Create organized structure
print_step "Creating paxiit-com backup folder..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    cd /volume1/web
    
    # Create organized folder
    mkdir -p _applications/paxiit-com/backups
    
    echo "✅ Backup folder created"
EOF

# Step 2: Find and move all backup files
print_step "Finding all paxiit.com backup files..."

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
    
    # Count backups in paxiit.com folder
    PAXIIT_COUNT=0
    if [ -d "paxiit.com" ]; then
        PAXIIT_COUNT=$(find paxiit.com -name "*backup*.tar.gz" -type f 2>/dev/null | wc -l)
        echo "Found $PAXIIT_COUNT backup files in paxiit.com folder"
    fi
    
    TOTAL=$((ROOT_COUNT + RECYCLE_COUNT + PAXIIT_COUNT))
    echo "Total backup files found: $TOTAL"
    
    # Move from root
    if [ "$ROOT_COUNT" -gt 0 ]; then
        echo "Moving $ROOT_COUNT files from root..."
        find . -maxdepth 1 -name "paxiit.com_backup_*.tar.gz" -type f -exec mv {} _applications/paxiit-com/backups/ \; 2>/dev/null || true
        echo "✅ Moved files from root"
    fi
    
    # Move from #recycle
    if [ "$RECYCLE_COUNT" -gt 0 ]; then
        echo "Moving $RECYCLE_COUNT files from #recycle..."
        find #recycle -name "paxiit.com_backup_*.tar.gz" -type f -exec mv {} _applications/paxiit-com/backups/ \; 2>/dev/null || true
        echo "✅ Moved files from #recycle"
    fi
    
    # Move from paxiit.com folder
    if [ "$PAXIIT_COUNT" -gt 0 ]; then
        echo "Moving $PAXIIT_COUNT files from paxiit.com folder..."
        find paxiit.com -name "*backup*.tar.gz" -type f -exec mv {} _applications/paxiit-com/backups/ \; 2>/dev/null || true
        echo "✅ Moved files from paxiit.com folder"
    fi
    
    # Final count
    FINAL_COUNT=$(ls _applications/paxiit-com/backups/paxiit.com_backup_*.tar.gz 2>/dev/null | wc -l)
    echo "✅ Total backups now in organized folder: $FINAL_COUNT"
    
    # Show size
    if [ "$FINAL_COUNT" -gt 0 ]; then
        TOTAL_SIZE=$(du -sh _applications/paxiit-com/backups/ | awk '{print $1}')
        echo "Total size: $TOTAL_SIZE"
    fi
EOF

print_success "paxiit.com backups organized!"

# Step 3: Verify
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
    
    # List organized backups
    echo ""
    echo "📊 Organized backups location:"
    ls -lh _applications/paxiit-com/backups/ | head -10
    echo ""
    echo "Total files: $(ls _applications/paxiit-com/backups/paxiit.com_backup_*.tar.gz 2>/dev/null | wc -l)"
EOF

print_success "Verification complete!"
echo ""
print_info "All paxiit.com backups are now in: /volume1/web/_applications/paxiit-com/backups/"
echo ""

