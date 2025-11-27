#!/bin/bash
# AISCR Global PMO - NAS Deployment Script
# Deploys to Synology DS1522 NAS at 192.168.1.3:2222

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 AISCR Global PMO - NAS Deployment${NC}"
echo ""

# Configuration
NAS_HOST="192.168.1.3"
NAS_PORT="2222"
NAS_USER="superpulpax"
NAS_PATH="/volume1/web/pmo"
ENVIRONMENT="${1:-staging}"  # staging or production

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

print_step() {
    echo -e "${BLUE}📦 $1${NC}"
}

# Validate environment
if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    print_error "Invalid environment: $ENVIRONMENT"
    echo "Usage: $0 [staging|production]"
    exit 1
fi

# PMO deployment - /volume1/web/pmo/ is the production folder
DEPLOY_PATH="${NAS_PATH}"

print_info "Deployment Path: $DEPLOY_PATH (Production)"
print_info "NAS: ${NAS_USER}@${NAS_HOST}:${NAS_PORT}"
echo ""

# Check prerequisites
print_step "Checking prerequisites..."

# Check SSH
if ! command -v ssh &> /dev/null; then
    print_error "SSH is not installed"
    exit 1
fi
print_success "SSH found"

# Check if SSH key exists (optional, will prompt for password if not)
if [ -f ~/.ssh/id_rsa ] || [ -f ~/.ssh/id_ed25519 ]; then
    print_success "SSH key found"
else
    print_info "No SSH key found - will prompt for password"
fi

# Test NAS connection
print_step "Testing NAS connection..."
if ssh -p $NAS_PORT -o ConnectTimeout=5 -o BatchMode=yes ${NAS_USER}@${NAS_HOST} "echo 'Connection successful'" 2>/dev/null; then
    print_success "NAS connection successful"
else
    print_info "Testing connection (may prompt for password)..."
    if ssh -p $NAS_PORT -o ConnectTimeout=10 ${NAS_USER}@${NAS_HOST} "echo 'Connection successful'" 2>/dev/null; then
        print_success "NAS connection successful"
    else
        print_error "Cannot connect to NAS. Please check:"
        echo "  - NAS is accessible at ${NAS_HOST}:${NAS_PORT}"
        echo "  - SSH is enabled on NAS"
        echo "  - Username is correct: ${NAS_USER}"
        echo "  - Network connectivity"
        exit 1
    fi
fi

# Create deployment directory structure on NAS
print_step "Creating deployment directory on NAS..."
ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << EOF
    mkdir -p ${DEPLOY_PATH}
    mkdir -p ${DEPLOY_PATH}/frontend
    mkdir -p ${DEPLOY_PATH}/frontend/css
    mkdir -p ${DEPLOY_PATH}/frontend/js
    mkdir -p ${DEPLOY_PATH}/frontend/assets
    mkdir -p ${DEPLOY_PATH}/Templates
    mkdir -p ${DEPLOY_PATH}/backups
    echo "Directory structure created"
EOF
print_success "Directory structure ready"

# Build artifacts locally (if needed)
print_step "Building project artifacts..."
if [ -f "create_pmo_system.py" ]; then
    python3 create_pmo_system.py 2>/dev/null || python create_pmo_system.py 2>/dev/null || print_info "Skipping Excel generation"
fi
if [ -f "create_word_templates.py" ]; then
    python3 create_word_templates.py 2>/dev/null || python create_word_templates.py 2>/dev/null || print_info "Skipping Word templates"
fi
print_success "Build complete"

# Create temporary deployment archive
print_step "Creating deployment package..."
TEMP_DIR=$(mktemp -d)
DEPLOY_DIR="${TEMP_DIR}/deploy"

mkdir -p "${DEPLOY_DIR}"

# Copy frontend files
if [ -d "frontend" ]; then
    cp -r frontend/* "${DEPLOY_DIR}/"
    print_success "Frontend files copied"
fi

# Copy root HTML files
for file in landing.html download.html; do
    if [ -f "$file" ]; then
        cp "$file" "${DEPLOY_DIR}/"
    fi
done

# Copy Templates
if [ -d "Templates" ]; then
    cp -r Templates "${DEPLOY_DIR}/"
    print_success "Templates copied"
fi

# Copy generated files (if they exist)
for file in AISCR_PMO_Full_Automated_System.xlsx AISCR_PMO_Complete_System.zip; do
    if [ -f "$file" ]; then
        cp "$file" "${DEPLOY_DIR}/"
    fi
done

print_success "Deployment package created"

# Deploy to NAS using rsync (more efficient than scp)
print_step "Deploying to NAS..."
if command -v rsync &> /dev/null; then
    rsync -avz --delete -e "ssh -p ${NAS_PORT}" \
        "${DEPLOY_DIR}/" \
        ${NAS_USER}@${NAS_HOST}:${DEPLOY_PATH}/
    print_success "Files synced to NAS"
else
    # Fallback to scp
    print_info "Using SCP (rsync not available)..."
    cd "${DEPLOY_DIR}"
    scp -P ${NAS_PORT} -r . ${NAS_USER}@${NAS_HOST}:${DEPLOY_PATH}/
    print_success "Files copied to NAS"
fi

# Set permissions on NAS
print_step "Setting file permissions..."
ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << EOF
    chmod -R 755 ${DEPLOY_PATH}
    chown -R ${NAS_USER}:users ${DEPLOY_PATH} 2>/dev/null || true
    echo "Permissions set"
EOF
print_success "Permissions configured"

# Cleanup
rm -rf "${TEMP_DIR}"
print_success "Temporary files cleaned"

# Get deployment URL
print_step "Deployment Summary"
echo ""
print_success "✅ Deployment complete!"
echo ""
echo -e "${BLUE}📊 Deployment Information:${NC}"
echo "  Environment: $ENVIRONMENT"
echo "  NAS Path: $DEPLOY_PATH"
echo "  Access URL: http://${NAS_HOST}/aiscr-pmo/$ENVIRONMENT/"
echo ""
print_info "Note: Update your web server configuration to serve from the deployment path"
echo ""

