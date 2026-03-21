import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Extract authorization token from request headers
  const token = context.request.headers.get('authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      // Validate token against SESSION_STORE (KV)
      const userData = await context.locals.sessionStore.get(token);

      if (userData) {
        const user = JSON.parse(userData);
        context.locals.user = user;
      }
    } catch (error) {
      // Log error but continue processing
      console.error('Error validating token:', error);
    }
  }

  return next();
});