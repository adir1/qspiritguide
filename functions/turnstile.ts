/**
 * Cloudflare Turnstile verification endpoint
 * Validates CAPTCHA tokens from client-side Turnstile widget
 */

interface TurnstileVerifyRequest {
  token: string;
  remoteip?: string;
}

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
  score?: number;
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(
  token: string,
  secret: string,
  remoteip?: string
): Promise<TurnstileResponse> {
  const data = {
    secret,
    response: token,
    ...(remoteip && { remoteip }),
  };

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Turnstile API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return {
      success: false,
      error_codes: ['verification-failed'],
    };
  }
}

export async function handleTurnstileVerification(
  request: Request,
  env: { TURNSTILE_SECRET_KEY: string }
): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body: TurnstileVerifyRequest = await request.json();
    const clientIP = request.headers.get('CF-Connecting-IP') || undefined;

    const result = await verifyTurnstile(body.token, env.TURNSTILE_SECRET_KEY, clientIP);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Turnstile handler error:', error);
    return new Response(
      JSON.stringify({ success: false, error_codes: ['server-error'] }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
