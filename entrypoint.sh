#!/bin/bash
set -e

log_info() { echo -e "\e[34m[INFO]\e[0m $1"; }
log_error() { echo -e "\e[31m[ERROR]\e[0m $1"; }

# 1. Start MySQL
log_info "Starting MySQL..."
service mysql start
sleep 5

# 2. Database Initialization
if [ ! -d "/var/lib/mysql/vulnlab" ]; then
    log_info "Initializing Database..."
    
    # Create Database
    mysql -e "CREATE DATABASE IF NOT EXISTS vulnlab;"
    
    # Create the specific user 'vulnlab' with 'StrongPassword123!'
    # We allow access from localhost (since Node is in the same container)
    log_info "Creating user 'vulnlab'..."
    mysql -e "CREATE USER IF NOT EXISTS 'vulnlab'@'localhost' IDENTIFIED BY 'StrongPassword123!';"
    mysql -e "GRANT ALL PRIVILEGES ON vulnlab.* TO 'vulnlab'@'localhost';"
    mysql -e "FLUSH PRIVILEGES;"

    # Import Schema & Seeds using the NEW user to test permissions
    log_info "Importing Schema..."
    mysql -u vulnlab -pStrongPassword123! vulnlab < /app/Database/schema.sql
    
    log_info "Importing Seeds..."
    mysql -u vulnlab -pStrongPassword123! vulnlab < /app/Database/seed.sql
else
    log_info "Database already initialized."
fi

# 3. Start Nginx
log_info "Starting Nginx..."
service nginx start

# 4. Start Node Backend
log_info "Starting Backend..."
cd /app/Backend
exec npm start
