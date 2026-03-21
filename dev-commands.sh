#!/bin/bash

# qSpirit.Guide Development Commands
# Use these shortcuts for common development tasks

echo "qSpirit.Guide - Available Commands"
echo "================================"
echo ""
echo "Development:"
echo "  npm run dev              - Start Astro dev server"
echo "  npm run workers:dev      - Start Cloudflare Workers locally"
echo ""
echo "Building:"
echo "  npm run build            - Build Astro project"
echo ""
echo "Code Quality:"
echo "  npm run format           - Format code with Prettier"
echo "  npm run lint             - Lint code with ESLint"
echo ""
echo "Deployment:"
echo "  npm run workers:deploy   - Deploy to Cloudflare Workers"
echo ""
echo "Database:"
echo "  wrangler d1 list         - List D1 databases"
echo "  wrangler d1 info {id}    - Get database info"
echo "  wrangler d1 migrations   - Manage migrations"
echo ""
echo "KV Store:"
echo "  wrangler kv:namespace list  - List KV namespaces"
echo ""
echo "Setup First Time:"
echo "  npm install              - Install dependencies"
echo "  wrangler login          - Login to Cloudflare account"
echo "  wrangler d1 create      - Create D1 database"
echo "  wrangler kv:namespace create SESSION_STORE"
echo ""

# Optional: Uncomment to run actual commands
# if [ "$1" == "dev" ]; then npm run dev; fi
# if [ "$1" == "workers" ]; then npm run workers:dev; fi
# if [ "$1" == "build" ]; then npm run build; fi
