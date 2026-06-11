const CODESPACE = typeof import.meta !== 'undefined' ? (import.meta.env.VITE_CODESPACE_NAME as string | undefined) : undefined;

export const API_HOST = CODESPACE && CODESPACE !== ''
  ? `https://${CODESPACE}-8000.app.github.dev`
  : `http://localhost:8000`;

export const apiUrl = (path: string) => `${API_HOST}/api/${path}`;

export async function fetchList(path: string) {
  const url = apiUrl(path);
  const res = await fetch(url);
  const data = await res.json();
  if (Array.isArray(data)) return data;
  // common pagination shapes
  if (data.items && Array.isArray(data.items)) return data.items;
  if (data.data && Array.isArray(data.data)) return data.data;
  return [] as any[];
}

export default apiUrl;
