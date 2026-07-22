// mock-server/src/utils/logger.js
export function logAction(action) {
    try {
    const logs = JSON.parse(localStorage.getItem("bitacora")) || [];
    const timestamp = new Date().toLocaleTimeString();
    logs.push(`[${timestamp}] ${action}`);
    localStorage.setItem("bitacora", JSON.stringify(logs));
    } catch {
    // si el JSON está corrupto, reinicia la bitácora
    localStorage.setItem("bitacora", JSON.stringify([`[${new Date().toLocaleTimeString()}] ${action}`]));
    }
}
