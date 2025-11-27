#!/bin/bash
# Setup PMO directory structure on NAS
# Creates /volume1/web/pmo/ with production, staging, and backups folders

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📁 Setting up PMO directory structure${NC}"
echo ""

# Configuration
NAS_HOST="192.168.1.3"
NAS_PORT="2222"
NAS_USER="superpulpax"
PMO_PATH="/volume1/web/pmo"

print_step() {
    echo -e "${BLUE}📦 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Create directory structure
print_step "Creating PMO directory structure..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << EOF
    # Create main PMO directory
    mkdir -p ${PMO_PATH}
    
    # Create production structure
    mkdir -p ${PMO_PATH}/production
    mkdir -p ${PMO_PATH}/production/frontend/{css,js,assets}
    mkdir -p ${PMO_PATH}/production/Templates
    
    # Create staging structure
    mkdir -p ${PMO_PATH}/staging
    mkdir -p ${PMO_PATH}/staging/frontend/{css,js,assets}
    mkdir -p ${PMO_PATH}/staging/Templates
    
    # Create backups folder
    mkdir -p ${PMO_PATH}/backups
    
    echo "✅ Directory structure created"
EOF

print_success "Directory structure created"

# Set permissions
print_step "Setting permissions..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << EOF
    chmod -R 755 ${PMO_PATH}
    chown -R ${NAS_USER}:users ${PMO_PATH}
    echo "✅ Permissions set"
EOF

print_success "Permissions set"

# Verify
print_step "Verifying structure..."

ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << EOF
    echo "📊 PMO Directory Structure:"
    echo ""
    tree -L 3 ${PMO_PATH} 2>/dev/null || find ${PMO_PATH} -type d | sort
    echo ""
    echo "✅ Structure verified"
EOF

print_success "PMO directory setup complete!"
echo ""
echo -e "${GREEN}📍 PMO Location: ${PMO_PATH}${NC}"
echo -e "${GREEN}📁 Production: ${PMO_PATH}/production${NC}"
echo -e "${GREEN}📁 Staging: ${PMO_PATH}/staging${NC}"
echo -e "${GREEN}📁 Backups: ${PMO_PATH}/backups${NC}"
echo ""

