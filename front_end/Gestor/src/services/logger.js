// Servicio para manejar la bitácora de auditoría en LocalStorage
export const getLogs = () => {
  const logs = localStorage.getItem('audit_logs');
  return logs ? JSON.parse(logs) : [];
};

export const logTransaction = (username, action) => {
  const currentLogs = getLogs();
  
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
  const newLog = {
    id: Date.now(),
    time: timeString,
    message: `${username || 'admin'} ${action}`
  };

  // Guardamos manteniendo un límite de los últimos 20 registros
  const updatedLogs = [newLog, ...currentLogs].slice(0, 20);
  localStorage.setItem('audit_logs', JSON.stringify(updatedLogs));
};