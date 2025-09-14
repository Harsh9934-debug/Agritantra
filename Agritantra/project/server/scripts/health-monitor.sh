#!/bin/bash

# Health monitoring script for Agritantra

APP_NAME="agritantra"
LOG_FILE="/var/log/$APP_NAME-health.log"
ALERT_EMAIL="admin@agritantra.com"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}

send_alert() {
    local message="$1"
    log "ALERT: $message"
    
    # Send email alert (requires mail command)
    if command -v mail >/dev/null 2>&1; then
        echo "$message" | mail -s "Agritantra Health Alert" $ALERT_EMAIL
    fi
    
    # Send to monitoring service
    curl -X POST -H "Content-Type: application/json" \
         -d "{\"message\":\"$message\",\"service\":\"$APP_NAME\"}" \
         "https://monitoring.agritantra.com/alerts" 2>/dev/null || true
}

check_api_health() {
    local response=$(curl -s -w "%{http_code}" http://localhost:5000/health)
    local http_code=${response: -3}
    
    if [ "$http_code" != "200" ]; then
        send_alert "API health check failed. HTTP code: $http_code"
        return 1
    fi
    
    return 0
}

check_websocket() {
    local ws_response=$(curl -s -I http://localhost:8080 | head -n 1)
    
    if [[ ! "$ws_response" =~ "101" ]]; then
        send_alert "WebSocket service is not responding"
        return 1
    fi
    
    return 0
}

check_database() {
    # Check MySQL connection
    mysql -h localhost -u agritantra -ppassword -e "SELECT 1" agritantra 2>/dev/null
    
    if [ $? -ne 0 ]; then
        send_alert "Database connection failed"
        return 1
    fi
    
    return 0
}

check_disk_space() {
    local usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    
    if [ "$usage" -gt 85 ]; then
        send_alert "Disk usage is at ${usage}%"
        return 1
    fi
    
    return 0
}

check_memory() {
    local mem_usage=$(free | grep Mem | awk '{printf "%.2f", $3/$2 * 100.0}')
    
    if (( $(echo "$mem_usage > 90" | bc -l) )); then
        send_alert "Memory usage is at ${mem_usage}%"
        return 1
    fi
    
    return 0
}

check_docker_containers() {
    local unhealthy=$(docker-compose ps --services --filter "status=unhealthy")
    
    if [ -n "$unhealthy" ]; then
        send_alert "Unhealthy containers detected: $unhealthy"
        return 1
    fi
    
    local stopped=$(docker-compose ps --services --filter "status=stopped")
    
    if [ -n "$stopped" ]; then
        send_alert "Stopped containers detected: $stopped"
        return 1
    fi
    
    return 0
}

restart_services() {
    log "Attempting to restart services..."
    
    docker-compose restart
    
    sleep 30
    
    if check_api_health && check_websocket; then
        log "Services restarted successfully"
        return 0
    else
        send_alert "Service restart failed"
        return 1
    fi
}

main() {
    local failed_checks=0
    
    log "Starting health checks..."
    
    # Run all health checks
    check_api_health || ((failed_checks++))
    check_websocket || ((failed_checks++))
    check_database || ((failed_checks++))
    check_disk_space || ((failed_checks++))
    check_memory || ((failed_checks++))
    check_docker_containers || ((failed_checks++))
    
    if [ $failed_checks -eq 0 ]; then
        log "All health checks passed"
    else
        log "$failed_checks health checks failed"
        
        # Attempt auto-recovery for service issues
        if ! check_api_health || ! check_websocket; then
            restart_services
        fi
    fi
    
    # Clean up old logs (keep last 7 days)
    find /var/log -name "$APP_NAME*.log" -mtime +7 -delete 2>/dev/null || true
}

# Run continuously with 5-minute intervals
while true; do
    main
    sleep 300
done