const STORAGE_KEY = "turvassa-verkossa.visitor-id";
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let visitorId: string | undefined;

export function getVisitorId(): string {
  if (visitorId) return visitorId;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && UUID_V4.test(stored)) {
      visitorId = stored;
      return stored;
    }
  } catch {
    // Storage may be disabled. Keep the identifier for this page session.
  }

  visitorId = crypto.randomUUID();
  try {
    localStorage.setItem(STORAGE_KEY, visitorId);
  } catch {
    // The site remains usable without persistent browser storage.
  }
  return visitorId;
}
