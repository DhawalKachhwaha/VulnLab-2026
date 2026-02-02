FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# --- CONFIGURATION ---
# Updated credentials
ENV DB_USER=vulnlab
ENV DB_PASS=StrongPassword123!
ENV DB_NAME=vulnlab
# FIX: Force IPv4 to prevent the ::1 connection error
ENV DB_HOST=127.0.0.1 

# 1. Install Dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    mysql-server \
    nodejs \
    npm \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2. Copy Project Files
COPY . /app

# 3. Install Node Dependencies
RUN cd Backend && npm install

# 4. Configure Nginx
RUN rm /etc/nginx/sites-enabled/default && \
    cp /app/Deploy/nginx.conf /etc/nginx/sites-available/vulnlab && \
    ln -s /etc/nginx/sites-available/vulnlab /etc/nginx/sites-enabled/vulnlab

RUN chmod -R 755 /app/Frontend

# 5. Permissioning
RUN chmod +x /app/entrypoint.sh

EXPOSE 80

CMD ["/app/entrypoint.sh"]
