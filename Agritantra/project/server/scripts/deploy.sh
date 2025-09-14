#!/bin/bash

# Agritantra Deployment Script
# This script automates the deployment process

set -e

echo "🚀 Starting Agritantra deployment..."

# Configuration
APP_NAME="agritantra"
BACKUP_DIR="/var/backups/$APP_NAME"
LOG_FILE="/var/log/$APP_NAME-deploy.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}❌ $1${NC}" | tee -a $LOG_FILE
    exit 1
}

success() {
    echo -e "${GREEN}✅ $1${NC}" | tee -a $LOG_FILE
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}" | tee -a $LOG_FILE
}

# Check if running as root or with sudo
if [[ $EUID -eq 0 ]]; then
    error "Please don't run this script as root"
fi

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    command -v node >/dev/null 2>&1 || error "Node.js is not installed"
    command -v npm >/dev/null 2>&1 || error "NPM is not installed"
    command -v docker >/dev/null 2>&1 || error "Docker is not installed"
    command -v docker-compose >/dev/null 2>&1 || error "Docker Compose is not installed"
    
    success "Prerequisites check passed"
}

# Backup current deployment
backup_current() {
    if [ -d "/opt/$APP_NAME" ]; then
        log "Creating backup of current deployment..."
        
        sudo mkdir -p $BACKUP_DIR
        BACKUP_NAME="$APP_NAME-backup-$(date +%Y%m%d-%H%M%S)"
        sudo cp -r "/opt/$APP_NAME" "$BACKUP_DIR/$BACKUP_NAME"
        
        success "Backup created: $BACKUP_DIR/$BACKUP_NAME"
    fi
}

# Deploy application
deploy_app() {
    log "Starting application deployment..."
    
    # Create application directory
    sudo mkdir -p "/opt/$APP_NAME"
    
    # Copy application files
    sudo cp -r ./ "/opt/$APP_NAME/"
    cd "/opt/$APP_NAME"
    
    # Set proper permissions
    sudo chown -R $USER:$USER "/opt/$APP_NAME"
    
    # Install dependencies
    log "Installing dependencies..."
    npm install --production
    
    # Build application
    log "Building application..."
    npm run build
    
    success "Application deployed successfully"
}

# Deploy with Docker
deploy_docker() {
    log "Deploying with Docker..."
    
    # Stop existing containers
    docker-compose down --remove-orphans || true
    
    # Build and start containers
    docker-compose up -d --build
    
    # Wait for services to be ready
    log "Waiting for services to start..."
    sleep 30
    
    # Check service health
    if docker-compose ps | grep -q "Up"; then
        success "Docker deployment completed successfully"
    else
        error "Some services failed to start"
    fi
}

# Setup SSL certificates
setup_ssl() {
    if command -v certbot >/dev/null 2>&1; then
        log "Setting up SSL certificates..."
        
        DOMAIN=${1:-localhost}
        
        if [ "$DOMAIN" != "localhost" ]; then
            sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN
            success "SSL certificate configured for $DOMAIN"
        else
            warning "Skipping SSL setup for localhost"
        fi
    else
        warning "Certbot not installed, skipping SSL setup"
    fi
}

# Configure firewall
configure_firewall() {
    log "Configuring firewall..."
    
    if command -v ufw >/dev/null 2>&1; then
        sudo ufw allow 22/tcp    # SSH
        sudo ufw allow 80/tcp    # HTTP
        sudo ufw allow 443/tcp   # HTTPS
        sudo ufw allow 5000/tcp  # API
        sudo ufw allow 8080/tcp  # WebSocket
        sudo ufw --force enable
        
        success "Firewall configured"
    else
        warning "UFW not available, skipping firewall configuration"
    fi
}

# Setup monitoring
setup_monitoring() {
    log "Setting up monitoring..."
    
    # Create systemd service for health monitoring
    cat > /tmp/agritantra-monitor.service << EOF
[Unit]
Description=Agritantra Health Monitor
After=network.target

[Service]
Type=simple
ExecStart=/opt/agritantra/scripts/health-monitor.sh
Restart=always
RestartSec=30
User=$USER

[Install]
WantedBy=multi-user.target
EOF

    sudo mv /tmp/agritantra-monitor.service /etc/systemd/system/
    sudo systemctl daemon-reload
    sudo systemctl enable agritantra-monitor
    sudo systemctl start agritantra-monitor
    
    success "Monitoring service configured"
}

# Main deployment function
main() {
    log "🚀 Agritantra deployment started"
    
    # Parse command line arguments
    DEPLOY_TYPE=${1:-docker}
    DOMAIN=${2:-localhost}
    
    check_prerequisites
    backup_current
    
    case $DEPLOY_TYPE in
        "docker")
            deploy_docker
            ;;
        "native")
            deploy_app
            ;;
        *)
            error "Invalid deployment type. Use 'docker' or 'native'"
            ;;
    esac
    
    configure_firewall
    setup_ssl $DOMAIN
    setup_monitoring
    
    success "🎉 Deployment completed successfully!"
    
    echo ""
    echo "📋 Post-deployment information:"
    echo "   - Application URL: http://$DOMAIN"
    echo "   - API Endpoint: http://$DOMAIN/api"
    echo "   - WebSocket: ws://$DOMAIN:8080"
    echo "   - Logs: $LOG_FILE"
    echo "   - Backup: $BACKUP_DIR"
    echo ""
    echo "🔧 Useful commands:"
    echo "   - Check status: docker-compose ps"
    echo "   - View logs: docker-compose logs -f"
    echo "   - Restart services: docker-compose restart"
    echo ""
    
    # Final health check
    if curl -s http://localhost:5000/health > /dev/null; then
        success "Health check passed - application is running!"
    else
        warning "Health check failed - please check the logs"
    fi
}

# Run main function
main "$@"