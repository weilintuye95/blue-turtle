.PHONY: up up-dev migrate clean build build-no-cache down

up:
	docker-compose --profile prod up -d

up-dev:
	docker-compose --profile dev up -d

migrate:
	docker-compose run migrate

down:
	docker-compose down --remove-orphans -v

build:
	docker-compose build

build-no-cache:
	docker-compose build --no-cache

clean:
	docker-compose down -v --remove-orphans
	docker system prune -f


# # # Default target: start the app in production mode
# # .PHONY: up
# # up:
# # 	docker-compose up -d

# # # Target to start the app in development mode
# # .PHONY: dev
# # dev:
# # 	docker-compose up -d db
# # 	docker-compose run --service-ports app npm run dev



# .PHONY: up up-dev migrate clean build down

# up:
#     @docker-compose up -d

# up-dev:
#     @docker-compose up -d app-dev

# migrate:
#     @docker-compose run migrate

# down:
# 	docker-compose down

# # Target to build the Docker images
# build:
# 	docker-compose build

# # Target to remove Docker containers and volumes
# clean:
# 	docker-compose down -v
# 	docker system prune -f
