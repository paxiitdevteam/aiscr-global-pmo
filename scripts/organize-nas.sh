#!/bin/bash
# Organize NAS /volume1/web/ directory structure
# Creates organized folders for each application with dedicated backup folders

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📁 Organizing NAS /volume1/web/ directory structure${NC}"
echo ""

# Configuration
NAS_HOST="192.168.1.3"
NAS_PORT="2222"
NAS_USER="superpulpax"
WEB_ROOT="/volume1/web"

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
print_step "Creating organized directory structure..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    cd /volume1/web
    
    # Create main organization folders
    mkdir -p _applications
    mkdir -p _backups
    mkdir -p _logs
    mkdir -p _temp
    
    # Create application-specific folders with backups
    mkdir -p _applications/pmo/{backups,production,staging}
    mkdir -p _applications/pmo/production/frontend/{css,js,assets}
    mkdir -p _applications/pmo/production/Templates
    mkdir -p _applications/pmo/staging/frontend/{css,js,assets}
    mkdir -p _applications/pmo/staging/Templates
    
    mkdir -p _applications/labs-paxiit/backups
    mkdir -p _applications/paxiit-com/backups
    mkdir -p _applications/admin-paxiit/backups
    mkdir -p _applications/digipaxi/backups
    mkdir -p _applications/corporate-website/backups
    mkdir -p _applications/paxi-studio/backups
    mkdir -p _applications/monitoring/backups
    mkdir -p _applications/api/backups
    mkdir -p _applications/portfolio/backups
    mkdir -p _applications/replypro/backups
    mkdir -p _applications/other/backups
    
    echo "✅ Directory structure created"
EOF

print_success "Directory structure created"

# Step 2: Move backup files
print_step "Organizing backup files..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    cd /volume1/web
    
    # Move paxiit.com backups (from root and #recycle)
    echo "Organizing paxiit.com backups..."
    
    # Count backups in root
    ROOT_BACKUPS=$(ls paxiit.com_backup_*.tar.gz 2>/dev/null | wc -l)
    if [ "$ROOT_BACKUPS" -gt 0 ]; then
        echo "Found $ROOT_BACKUPS backup files in root, moving to paxiit-com/backups..."
        mv paxiit.com_backup_*.tar.gz _applications/paxiit-com/backups/ 2>/dev/null || true
        echo "✅ Moved $ROOT_BACKUPS backup files from root"
    fi
    
    # Move backups from #recycle if any
    if [ -d "#recycle" ]; then
        RECYCLE_BACKUPS=$(find #recycle -name "paxiit.com_backup_*.tar.gz" 2>/dev/null | wc -l)
        if [ "$RECYCLE_BACKUPS" -gt 0 ]; then
            echo "Found $RECYCLE_BACKUPS backup files in #recycle, moving to paxiit-com/backups..."
            find #recycle -name "paxiit.com_backup_*.tar.gz" -exec mv {} _applications/paxiit-com/backups/ \; 2>/dev/null || true
            echo "✅ Moved $RECYCLE_BACKUPS backup files from #recycle"
        fi
    fi
    
    # Verify paxiit.com folder structure
    if [ -d "paxiit.com" ]; then
        echo "paxiit.com folder exists, ensuring backups folder..."
        mkdir -p paxiit.com/backups
        # Move any backups inside paxiit.com folder
        if ls paxiit.com/*backup*.tar.gz 2>/dev/null 1>/dev/null; then
            mv paxiit.com/*backup*.tar.gz _applications/paxiit-com/backups/ 2>/dev/null || true
            echo "✅ Moved backups from paxiit.com folder"
        fi
    fi
    
    TOTAL_MOVED=$(ls _applications/paxiit-com/backups/paxiit.com_backup_*.tar.gz 2>/dev/null | wc -l)
    echo "✅ Total paxiit.com backups organized: $TOTAL_MOVED files"
    
    # Move admin backups
    if [ -d "admin_backup_20250904" ]; then
        echo "Moving admin backups..."
        mv admin_backup_20250904 _applications/admin-paxiit/backups/ 2>/dev/null || true
        echo "✅ Moved admin backups"
    fi
    
    # Move general backups folder
    if [ -d "backups" ] && [ ! -L "backups" ]; then
        echo "Moving general backups..."
        mv backups/* _backups/ 2>/dev/null || true
        rmdir backups 2>/dev/null || true
        echo "✅ Moved general backups"
    fi
    
    echo "✅ Backup files organized"
EOF

print_success "Backup files organized"

# Step 3: Move log files
print_step "Organizing log files..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    cd /volume1/web
    
    # Move log files
    if ls *.log 1> /dev/null 2>&1; then
        echo "Moving log files..."
        mv *.log _logs/ 2>/dev/null || true
        echo "✅ Moved log files"
    fi
    
    echo "✅ Log files organized"
EOF

print_success "Log files organized"

# Step 4: Organize PMO application
print_step "Organizing PMO application..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    cd /volume1/web
    
    # Move PMO files if they exist in labs.paxiit.com
    if [ -d "labs.paxiit.com/aiscr-pmo" ] && [ ! -L "labs.paxiit.com/aiscr-pmo" ]; then
        echo "Moving PMO application files..."
        # Move existing files
        if [ -d "labs.paxiit.com/aiscr-pmo/production" ]; then
            cp -r labs.paxiit.com/aiscr-pmo/production/* _applications/pmo/production/ 2>/dev/null || true
        fi
        if [ -d "labs.paxiit.com/aiscr-pmo/staging" ]; then
            cp -r labs.paxiit.com/aiscr-pmo/staging/* _applications/pmo/staging/ 2>/dev/null || true
        fi
        # Backup old location
        mv labs.paxiit.com/aiscr-pmo labs.paxiit.com/aiscr-pmo.old 2>/dev/null || true
        echo "✅ PMO files moved"
    fi
    
    # Create symlink for reverse proxy (maintains compatibility)
    if [ ! -L "labs.paxiit.com/aiscr-pmo" ]; then
        ln -s /volume1/web/_applications/pmo/production labs.paxiit.com/aiscr-pmo
        echo "✅ Symlink created for reverse proxy"
    fi
    
    echo "✅ PMO structure ready"
EOF

print_success "PMO application organized"

# Step 6: Set permissions
print_step "Setting proper permissions..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << 'EOF'
    chmod -R 755 /volume1/web/_applications
    chown -R superpulpax:users /volume1/web/_applications
    chmod -R 755 /volume1/web/_backups
    chown -R superpulpax:users /volume1/web/_backups
    chmod -R 755 /volume1/web/_logs
    chown -R superpulpax:users /volume1/web/_logs
    echo "✅ Permissions set"
EOF

print_success "Permissions set"

# Summary
echo ""
print_success "✅ NAS organization complete!"
echo ""
echo -e "${BLUE}📊 New Structure:${NC}"
echo ""
echo "/volume1/web/"
echo "├── _applications/          # All applications"
echo "│   ├── pmo/               # PMO Application"
echo "│   │   ├── backups/      # PMO backups"
echo "│   │   ├── production/   # Production files"
echo "│   │   └── staging/      # Staging files"
echo "│   ├── labs-paxiit/      # Labs application"
echo "│   │   └── backups/"
echo "│   ├── paxiit-com/       # Main website"
echo "│   │   └── backups/"
echo "│   └── ... (other apps)"
echo "├── _backups/              # General backups"
echo "├── _logs/                 # All log files"
echo "└── _temp/                 # Temporary files"
echo ""
print_info "PMO production path: /volume1/web/_applications/pmo/production"
print_info "PMO staging path: /volume1/web/_applications/pmo/staging"
print_info "PMO backup path: /volume1/web/_applications/pmo/backups"
print_info "Reverse proxy symlink: /volume1/web/labs.paxiit.com/aiscr-pmo → _applications/pmo/production"
echo ""
print_info "⚠️  IMPORTANT: Update virtual host document root to:"
print_info "   /volume1/web/_applications/pmo/production"
echo ""

