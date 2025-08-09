# Project Structure

```bash
├── backend/                        # PHP backend
│   ├── public/                     # Public entry
│   ├── src/                        # Controllers, repositories
│   ├── data/                       # JSON data + generator script
│   ├── composer.json
│   └── Dockerfile
├── frontend/                       # React + Vite frontend
│   ├── src/
│   ├── docker/nginx/nginx.conf     # Nginx config + API proxy
│   └── Dockerfile
├── docker-compose.yml
└── Makefile                        # Optional helper commands
```

# Requirements
* Docker
* Docker Compose

(Optional) `make` if you want to use the Makefile shortcuts

# Run with make
```
# Build and start everything
make up

# Stop containers
make down

# View logs for all services
make logs

# Rebuild images 
make rebuild

# Seed data
make seed
```

# Run without make

```
# Build and start
docker compose up --build

# Stop
docker compose down

# View logs
docker compose logs -f

# Rebuild images
docker compose build --no-cache

# Seed data
docker compose exec backend php data/generateShortLinks.php 100

# Run tests
docker compose exec backend ./vendor/bin/phpunit src

```

# Access the App

Frontend: http://localhost:3000

Backend API: http://localhost:8080