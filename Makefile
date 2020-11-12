TOP_DIR=.
README=$(TOP_DIR)/README.md

VERSION=$(strip $(shell cat version))

build:
	@echo "Building the software..."
	@cd docs && yarn
	@yarn build
	@cp -r docs/public build/d

build-netlify: build patch-netlify

patch-netlify:
	@echo "Patching index.html for netlify"
	@sed -i -e "s#/api/env#/.netlify/functions/app/api/env#g" build/index.html

deploy-aliyun:
	@echo "Deploying the software..."
	@git pull origin master
	@make build
	@pm2 restart did-connect

init: install dep
	@echo "Initializing the repo..."

github-action-init: dep
	@echo "Initializing the repo..."
	@sudo npm install -g @abtnode/cli

install:
	@echo "Install software required for this repo..."
	@npm install -g yarn @abtnode/cli

dep:
	@echo "Install dependencies required for this repo..."
	@yarn

fonts:
	@rm -rf public/did-logo && mkdir -p public/did-logo/fonts
	@cp -r node_modules/@arcblock/did-logo/fonts public/did-logo
	@cp -r node_modules/@arcblock/did-logo/style.css public/did-logo/

pre-build: install dep fonts
	@echo "Running scripts before the build..."

post-build:
	@echo "Running scripts after the build is done..."

all: pre-build build post-build

test:
	@echo "Running test suites..."

lint:
	@echo "Linting the software..."

doc:
	@echo "Building the documenation..."

setenv:
	@echo "Setup .env file..."
	@echo "SKIP_PREFLIGHT_CHECK=true" > .env

precommit: dep lint doc test

github-action-test: setenv dep lint doc test

clean:
	@echo "Cleaning the build..."
	@rm -rf build
	@rm -rf api/dist
	@rm -rf docs/public

watch:
	@make build
	@echo "Watching templates and slides changes..."
	@fswatch -o src/ | xargs -n1 -I{} make build

run:
	@echo "Running the software..."
	@DEBUG=@arcblock/* yarn start

include .makefiles/*.mk

.PHONY: build init install dep pre-build post-build all test doc precommit github-action-test clean watch run bump-version create-pr
