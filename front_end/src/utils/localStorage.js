const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  SEARCH_HISTORY: 'searchHistory',
};

export function getItem(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function saveSession(token, user) {
  setItem(STORAGE_KEYS.TOKEN, token);
  setItem(STORAGE_KEYS.USER, user);
}

export function getSession() {
  return {
    token: getItem(STORAGE_KEYS.TOKEN),
    user: getItem(STORAGE_KEYS.USER),
  };
}

export function clearSession() {
  removeItem(STORAGE_KEYS.TOKEN);
  removeItem(STORAGE_KEYS.USER);
}

export function addSearchToHistory(query) {
  if (!query || !query.trim()) return;
  const history = getItem(STORAGE_KEYS.SEARCH_HISTORY) || [];
  const entry = {
    query: query.trim(),
    date: new Date().toISOString().split('T')[0],
  };
  const filtered = history.filter((h) => h.query !== query.trim());
  filtered.unshift(entry);
  const trimmed = filtered.slice(0, 10);
  setItem(STORAGE_KEYS.SEARCH_HISTORY, trimmed);
}

export function getSearchHistory() {
  return getItem(STORAGE_KEYS.SEARCH_HISTORY) || [];
}

export function clearSearchHistory() {
  removeItem(STORAGE_KEYS.SEARCH_HISTORY);
}
