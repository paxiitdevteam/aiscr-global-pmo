#!/bin/bash
# Clean up backup files from /volume1/web/ directory
# Moves old backups to organized folder

set -e

echo "🧹 Cleaning up backup files on NAS..."
echo ""

# Configuration
NAS_HOST="192.168.1.3"
NAS_PORT="2222"
NAS_USER="superpulpax"
BACKUP_DIR="/volume1/web/backups"
OLD_BACKUP_DIR="${BACKUP_DIR}/old_backups"
WEB_DIR="/volume1/web"

echo "📋 Current backup files:"
ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} "ls -lh ${WEB_DIR}/paxiit.com_backup_*.tar.gz 2>/dev/null | wc -l | xargs echo 'Total backup files:'"

echo ""
read -p "Do you want to: [1] Move all to backups folder, [2] Keep only last 5, [3] Cancel: " choice

case $choice in
    1)
        echo "📦 Moving all backups to ${OLD_BACKUP_DIR}..."
        ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << EOF
            mkdir -p ${OLD_BACKUP_DIR}
            mv ${WEB_DIR}/paxiit.com_backup_*.tar.gz ${OLD_BACKUP_DIR}/ 2>/dev/null || echo "No files to move"
            echo "✅ Backups moved to ${OLD_BACKUP_DIR}"
            ls -lh ${OLD_BACKUP_DIR} | tail -5
EOF
        ;;
    2)
        echo "🗑️  Keeping only last 5 backups, deleting rest..."
        ssh -p $NAS_PORT ${NAS_USER}@${NAS_HOST} << EOF
            cd ${WEB_DIR}
            TOTAL=\$(ls -t paxiit.com_backup_*.tar.gz 2>/dev/null | wc -l)
            if [ "\$TOTAL" -gt 5 ]; then
                ls -t paxiit.com_backup_*.tar.gz | tail -n +6 | xargs rm -f
                echo "✅ Deleted old backups, kept last 5"
            else
                echo "ℹ️  Only \$TOTAL backups found, nothing to delete"
            fi
            ls -lh paxiit.com_backup_*.tar.gz 2>/dev/null | head -5
EOF
        ;;
    3)
        echo "❌ Cancelled"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Cleanup complete!"

