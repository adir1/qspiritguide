---
description: Use when working on qSpirit.Guide project - Astro front-end with Cloudflare Workers APIs. Covers architecture, BMAD organization, D1/Turnstile/Auth integration, and development patterns.
---

# qSpirit.Guide - Copilot Instructions

This file documents the project architecture, development practices, and integration guidelines for the **qSpirit.Guide** project. It uses the BMAD method for project organization and follows Cloudflare best practices.

## 🏗️ Project Architecture Overview

### Technology Stack
- **Frontend**: Astro (TypeScript, SSR/SSG)
- **Backend**: Cloudflare Workers (serverless)
- **Database**: Cloudflare D1 (SQLite at the edge)
- **Session Store**: Cloudflare KV
- **Security**: Cloudflare Turnstile (CAPTCHA), Worker Auth
- **Deployment**: Cloudflare Pages (frontend) + Cloudflare Workers (API)

### Architectural Principles

1. **Separation of Concerns**: Frontend (Astro), API Layer (Workers), Data Layer (D1/KV)
2. **Type Safety**: TypeScript across all layers
3. **Edge-First**: Leverage Cloudflare's global edge network
4. **Security-First**: Built-in protection with Turnstile and authenticated endpoints
5. **Serverless**: No server maintenance required

## 📋 BMAD Method Integration

The project follows the BMAD (Break down, Map, Adjust, Detail) method:

### Break down (Separation)
- **Frontend**: `src/` directory contains Astro components, pages, and layouts
- **API Layer**: `functions/` directory contains Workers functions
- **Configuration**: `astro.config.mjs`, `wrangler.toml`, `tsconfig.json`
- **Types**: Shared types in `src/env.d.ts`

### Map (Relationships)
- Astro middleware (`src/middleware.ts`) handles authentication and logging
- API endpoints in `functions/` can be called from Astro SSR endpoints
- Bindings for D1 and KV are accessed through `ctx.locals` in Astro or `env` in Workers

### Adjust (Configuration)
- **Astro config**: `astro.config.mjs` - adapter, integrations, build settings
- **Wrangler config**: `wrangler.toml` - D1 bindings, KV bindings, environment variables
- **TypeScript**: `tsconfig.json` - path aliases, strict mode
- **Environment**: `.env` files for secrets (not committed)

### Detail (Implementation)
- Component implementation in `src/components/`
- Page routes in `src/pages/`
- API handlers in `functions/`
- Middleware logic in `src/middleware.ts`

## 🔐 Cloudflare Integrations

### Cloudflare D1 (Database)

**Purpose**: Edge-native SQLite database for persistent data storage.

**Usage Pattern**:
```typescript
// In Astro SSR endpoints or Workers
const db = context.locals.db; // Astro
const db = env.DB; // Workers

// Query example
const result = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
```

**Guidelines**:
- Create migrations in a `migrations/` directory
- Use prepared statements to prevent SQL injection
- Store database ID in `wrangler.toml`
- Initialize schema on first deploy

### Cloudflare Turnstile (CAPTCHA)

**Purpose**: Verifying user interactions without tracking, protecting forms from bot abuse.

**Usage Pattern**:
```typescript
// Client-side: Include Cloudflare Turnstile script
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

// Server-side validation in functions/turnstile.ts
const verification = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY);
```

**Guidelines**:
- Always verify Turnstile tokens server-side (never trust client)
- Store `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in environment variables
- Add Turnstile to forms that handle sensitive operations (registration, password reset)
- Pass client IP from `CF-Connecting-IP` header to verification endpoint

### Cloudflare Workers Authentication

**Purpose**: Securing API endpoints with authenticated requests.

**Usage Pattern**:
```typescript
// In src/middleware.ts
const auth = defineMiddleware(async (context, next) => {
  const token = context.request.headers.get('authorization');
  // Validate token against SESSION_STORE (KV)
  context.locals.user = validatedUser;
  return next();
});
```

**Guidelines**:
- Use Bearer tokens in Authorization header
- Store session tokens in KV with TTL
- Validate tokens on every protected request
- Include user context in `context.locals` for downstream access

### Cloudflare KV (Session Store)

**Purpose**: Fast, global key-value store for sessions and temporary data.

**Usage Pattern**:
```typescript
// Store session
await ctx.locals.sessionStore.put(token, JSON.stringify(user), { expirationTtl: 86400 });

// Retrieve session
const userData = await ctx.locals.sessionStore.get(token);
```

**Guidelines**:
- Set appropriate TTL (Time To Live) for sessions
- Use JSON serialization for complex objects
- Namespace keys to avoid collisions: `session:{token}`, `cache:{key}`
- Clear sessions on logout

## 📁 File Structure & Naming Conventions

### Directory Organization
```
src/
├── pages/              # Astro routes (one file = one route)
├── components/         # Reusable Astro components
├── layouts/            # Page templates
├── middleware.ts       # Auth, logging, request processing
└── env.d.ts           # TypeScript definitions for bindings

functions/
├── auth.ts            # Authentication endpoints
├── turnstile.ts       # CAPTCHA verification
└── [feature].ts       # Feature-specific API handlers

.github/
├── copilot-instructions.md  # This file
└── instructions/            # File-specific instructions (if needed)
```

### Naming Conventions

**Files**:
- Components: PascalCase (e.g., `UserCard.astro`, `LoginForm.astro`)
- Pages: kebab-case (e.g., `login.astro`, `user-profile.astro`)
- Functions: camelCase (e.g., `auth.ts`, `dataValidation.ts`)

**Functions/Methods**:
- Public functions: `camelCase` (e.g., `verifyTurnstile()`, `getUserById()`)
- Handlers: `handle{Action}` pattern (e.g., `handleLogin()`, `handleVerify()`)
- Utilities: `verb{Noun}` pattern (e.g., `validateEmail()`, `formatDate()`)

**Variables**:
- Constants: `UPPER_SNAKE_CASE` (e.g., `TURNSTILE_VERIFY_URL`, `SESSION_TTL`)
- Booleans: `is{Property}` or `has{Property}` (e.g., `isAuthenticated`, `hasError`)
- Data objects: `camelCase` (e.g., `userData`, `apiResponse`)

## 🔄 Development Workflow

### Adding a New Feature

1. **Break down** the feature into API endpoint + frontend components
2. **Map** the data flow: Component → API call → D1 query → Response
3. **Adjust** configuration: Add D1 tables, KV keys, environment variables in `wrangler.toml`
4. **Detail** implementation:
   - Add API handler in `functions/{feature}.ts`
   - Create Astro component in `src/components/`
   - Add page route in `src/pages/` if needed
   - Update middleware if authentication is required

### Adding an API Endpoint

1. Create handler in `functions/{feature}.ts`
2. Export an async function that accepts `(request: Request, env: CloudflareEnv)`
3. Return a `Response` object with appropriate status codes
4. Use TypeScript interfaces for request/response shapes
5. Include proper error handling and logging

**Example**:
```typescript
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function handleGetUsers(request: Request, env: CloudflareEnv): Promise<Response> {
  try {
    const users = await env.DB.prepare('SELECT * FROM users').all();
    return new Response(JSON.stringify({ success: true, data: users }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

### Adding an Astro Component

1. Create `.astro` file in `src/components/`
2. Use frontmatter for TypeScript logic
3. Include JSX in template section
4. Scope styles to component or use global styles
5. Add proper TypeScript interfaces for props

**Example**:
```astro
---
interface Props {
  title: string;
  onSubmit: (data: FormData) => Promise<void>;
}

const { title, onSubmit } = Astro.props;
---

<form>
  <h2>{title}</h2>
  <!-- template -->
</form>

<style scoped>
  form {
    /* component-scoped styles */
  }
</style>
```

## 🔒 Security Best Practices

### Authentication
- Always verify Turnstile tokens before processing sensitive requests
- Use Bearer tokens with secure generation (crypto randomness)
- Implement session expiration with KV TTL
- Validate tokens on every protected endpoint

### Data Protection
- Use prepared statements in D1 to prevent SQL injection
- Sanitize user input before storing in database
- Hash passwords with bcrypt or Argon2 (never store plain text)
- Use HTTPS only for all communication

### API Security
- Implement rate limiting in Workers
- Use CORS headers appropriately
- Validate Content-Type headers
- Log security events for monitoring

## 📚 TypeScript Type Definitions

### Key Interfaces

```typescript
// Cloudflare bindings
interface CloudflareEnv {
  DB: D1Database;
  SESSION_STORE: KVNamespace;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

// Astro locals
declare namespace App {
  interface Locals {
    db: D1Database;
    sessionStore: KVNamespace;
    user?: {
      id: string;
      email: string;
      verified: boolean;
    };
  }
}

// User entity
interface User {
  id: string;
  email: string;
  password_hash: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}
```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All environment variables set in Cloudflare dashboard (TURNSTILE_SECRET_KEY, etc.)
- [ ] D1 database created and migrations applied
- [ ] KV namespace created for SESSION_STORE
- [ ] Turnstile site configured in Cloudflare
- [ ] CORS headers configured if needed
- [ ] Rate limiting policies in place
- [ ] Error logging and monitoring enabled
- [ ] Database backups configured
- [ ] DNS records pointing to Cloudflare

## 📖 Documentation Standards

When documenting code:
- Add JSDoc comments to exported functions
- Document complex logic with inline comments
- Keep comments focused on "why", not "what"
- Update README.md when adding major features
- Document API endpoints in `.github/instructions/` if needed

## 🧪 Testing Guidelines

- Unit test API handlers with various inputs
- Test Turnstile verification with mock tokens
- Test D1 queries with sample data
- Test authentication flow end-to-end
- Use TypeScript strict mode to catch type errors early

## 🔗 Integration Points

### Frontend ↔ API
- Call API endpoints from Astro SSR using `fetch()`
- Include Authorization header with Bearer token
- Handle API errors gracefully with fallbacks

### API ↔ Database
- Use D1 prepared statements
- Include error handling for database failures
- Log database errors for debugging

### API ↔ KV
- Serialize/deserialize JSON for complex objects
- Set appropriate TTL for session data
- Handle KV errors (storage full, invalid keys)

## 🎯 Common Tasks

### Enable Authentication on a Page
1. Add middleware check in `src/middleware.ts`
2. Redirect unauthenticated users to login
3. Include Bearer token in subsequent API calls
4. Validate token in protected functions

### Add a Database Table
1. Create migration SQL file
2. Apply with Wrangler: `wrangler d1 execute` 
3. Update TypeScript types in `src/env.d.ts`
4. Update API handlers to use new table

### Protect a Form with Turnstile
1. Add Turnstile widget HTML to component
2. Call verification endpoint on form submission
3. Only process form if token is valid
4. Display error message if verification fails

## 📞 When to Ask for Help

- Configuring Cloudflare bindings (check wrangler.toml)
- D1 SQL schema design (ask about normalization)
- Security concerns (authentication, data validation)
- Performance optimization (use Cloudflare analytics)
- Deployment issues (check wrangler logs)

---

**Last Updated**: March 21, 2026
**Project**: qSpirit.Guide
**Version**: 0.1.0
