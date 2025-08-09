DOCKER_COMPOSE := docker compose
# envs
BACKEND_ENV   := backend/.env
FRONTEND_ENV  := frontend/.env

# for seeding
DATA_FILE     := backend/data/shortlinks.json
SEED_SCRIPT   := data/generateShortLinks.php
SEED_COUNT    := 100

.PHONY: up down rebuild logs seed reseed envs _seed_if_needed
.DEFAULT_GOAL := up

# create the .env files
$(BACKEND_ENV):
	@echo "Creating $(BACKEND_ENV)"
	@printf "APP_ENV=dev\n" > $(BACKEND_ENV)

$(FRONTEND_ENV):
	@echo "Creating $(FRONTEND_ENV)"
	@printf "VITE_API_URL=/api\n" > $(FRONTEND_ENV)

envs: $(BACKEND_ENV) $(FRONTEND_ENV)
	@echo "✅ Env files ready."

# forcefully reseed - overwrites existing data file
reseed:
	@echo "♻️  Force reseed: removing existing $(DATA_FILE) and reseeding…"
	@rm -f $(DATA_FILE)
	@$(DOCKER_COMPOSE) run --rm backend php $(SEED_SCRIPT) $(SEED_COUNT)
	@echo "✅ Reseeding done."

#
up: envs
	@echo "🚀 Building & starting containers..."
	@$(DOCKER_COMPOSE) up -d --build
	@$(MAKE) _seed_if_needed
	@echo "✅ Environment up at:"
	@echo "   Frontend: http://localhost:3000"
	@echo "   Backend : http://localhost:8080"

down:
	@echo "🛑 Stopping containers..."
	@$(DOCKER_COMPOSE) down

rebuild:
	@echo "🧹 Full rebuild (including volumes)…"
	@$(DOCKER_COMPOSE) down -v
	@$(DOCKER_COMPOSE) up -d --build
	@$(MAKE) _seed_if_needed

logs:
	@$(DOCKER_COMPOSE) logs -f

#  seed on if needed
_seed_if_needed:
	@if [ -s "$(DATA_FILE)" ]; then \
		echo "✅ $(DATA_FILE) exists and is non-empty. Skipping seed."; \
	else \
		echo "🌱 Seeding data (generating $(SEED_COUNT) shortlinks)..."; \
		$(DOCKER_COMPOSE) run --rm backend php $(SEED_SCRIPT) $(SEED_COUNT); \
		echo "✅ Seeding done."; \
	fi

# alias
seed: _seed_if_needed