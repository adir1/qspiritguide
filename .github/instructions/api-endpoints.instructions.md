---
description: Use when editing functions/ API endpoints - follow Cloudflare Workers patterns with TypeScript. Include request/response interfaces, error handling, and D1/KV integration.
applyTo: "functions/**/*.ts"
---

# API Endpoint Guidelines

When editing files in the `functions/` directory, follow these patterns:

## Structure

1. **Interfaces First**: Define request and response types using TypeScript interfaces
2. **Error Handling**: Wrap logic in try-catch with proper HTTP status codes
3. **Logging**: Use console for debugging (visible in Wrangler logs)
4. **Type Safety**: Always type the `env` parameter with specific bindings

## Template

```typescript
interface RequestPayload {
  // Define expected input shape
}

interface ResponsePayload {
  success: boolean;
  data?: any;
  error?: string;
  timestamp?: string;
}

export async function handler(
  request: Request,
  env: {
    DB: D1Database;
    SESSION_STORE: KVNamespace;
  }
): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const payload: RequestPayload = await request.json();
    
    // Validate input
    if (!payload.required_field) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required field' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Process request
    // ...

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Handler error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

## Best Practices

- Use `prepared statements` for D1 queries to prevent SQL injection
- Set appropriate `TTL` when storing data in KV
- Extract client IP from `CF-Connecting-IP` header
- Validate all user input before processing
- Log security-relevant events (failed logins, rate limits, etc.)
- Return appropriate HTTP status codes (200, 400, 401, 403, 404, 500)
