// Hash router — multi-page without a framework. Pure + testable.
export interface Route {
  path: string;
  params: Record<string, string>;
}

export function parseHash(hash: string): Route {
  const h = (hash || '').replace(/^#\/?/, '/');
  const [pathPart, queryPart] = h.split('?') as [string, string | undefined];
  const segments = pathPart.split('/').filter((s) => s !== '');
  const params: Record<string, string> = {};
  for (const [key, val] of new URLSearchParams(queryPart ?? '')) params[key] = val;
  return { path: '/' + segments.join('/'), params };
}

export function navigate(path: string): void {
  window.location.hash = '#/' + path.replace(/^\/+/, '');
}

export function createRouter(routes: Record<string, (route: Route) => void>): () => void {
  const handle = () => {
    const route = parseHash(window.location.hash);
    const handler = routes[route.path];
    if (handler) handler(route);
  };
  window.addEventListener('hashchange', handle);
  handle();
  return () => window.removeEventListener('hashchange', handle);
}