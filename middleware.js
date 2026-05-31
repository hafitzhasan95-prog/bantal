export const config = {
  matcher: ['/monitorprofit'],
};

const CREDENTIALS = {
  user: 'admin',
  pass: 'zivistore2026',
};

export default function middleware(req) {
  const auth = req.headers.get('authorization') || '';
  const [scheme, encoded] = auth.split(' ');

  if (scheme === 'Basic' && encoded) {
    const decoded = atob(encoded);
    const colonIdx = decoded.indexOf(':');
    const user = decoded.slice(0, colonIdx);
    const pass = decoded.slice(colonIdx + 1);

    if (user === CREDENTIALS.user && pass === CREDENTIALS.pass) {
      return; // allow
    }
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Profit Monitor — Private"',
    },
  });
}
