const SESSION_KEY = 'inventorySession';
const TOKEN_KEY = 'authToken';

export function readJsonStorage(key, fallbackValue = null) {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Error al leer LocalStorage: ${key}`, error);

    localStorage.removeItem(key);

    return fallbackValue;
  }
}

export function saveSession(session) {
  if (!session?.token || !session?.user) {
    throw new Error('La sesión no posee una estructura válida.');
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(TOKEN_KEY, session.token);
}

export function getSession() {
  const session = readJsonStorage(SESSION_KEY);

  if (
    !session ||
    typeof session !== 'object' ||
    typeof session.token !== 'string' ||
    typeof session.user !== 'object'
  ) {
    return null;
  }

  return session;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
}
const AUDIT_LOG_KEY = 'inventoryAuditLog';

function isValidAuditEntry(entry) {
  return (
    entry &&
    typeof entry === 'object' &&
    typeof entry.id === 'string' &&
    typeof entry.username === 'string' &&
    typeof entry.action === 'string' &&
    typeof entry.productName === 'string' &&
    typeof entry.timestamp === 'string'
  );
}

export function getAuditLog() {
  const entries = readJsonStorage(AUDIT_LOG_KEY, []);

  if (!Array.isArray(entries)) {
    localStorage.removeItem(AUDIT_LOG_KEY);
    return [];
  }

  return entries.filter(isValidAuditEntry);
}

export function addAuditEntry({
  username,
  action,
  productId,
  productName,
}) {
  const entry = {
    id:
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random()}`,
    username: String(username || 'usuario'),
    action: String(action || 'modificó'),
    productId: productId ?? 'sin ID',
    productName: String(productName || 'Producto'),
    timestamp: new Date().toISOString(),
  };

  const updatedEntries = [
    entry,
    ...getAuditLog(),
  ].slice(0, 50);

  localStorage.setItem(
    AUDIT_LOG_KEY,
    JSON.stringify(updatedEntries),
  );

  return updatedEntries;
}

export function clearAuditLog() {
  localStorage.removeItem(AUDIT_LOG_KEY);
  return [];
}