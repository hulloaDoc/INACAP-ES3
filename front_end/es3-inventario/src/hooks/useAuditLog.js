import { useCallback, useState } from "react";

// Nombre de la llave que permite guardar los datos en el
// localStorage del navegador (asi no se pierde el historial en caso de recargar la pagina).
const BITACORA_KEY = "inv_bitacora";

// Máximo de registros que se guardaran, con la finalidad de no llenar el localStorage con datos innecesarios.
const MAX_ENTRIES = 50;

// funcion axuliar para leer lo que hay guardado en el localStorage
// y lo transforma en string a un arrreglo de objetos (JSON.parse).
function readBitacora() {
  try {
    const raw = localStorage.getItem(BITACORA_KEY);

    // En caso de que haya nada guardado (raw es null), se queda como arreglo vacio
    const parsed = raw ? JSON.parse(raw) : [];

    //se corrobora que efectivamente sea un arreglo
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Si el JSON.parse falla (por ejemplo el dato guardado está corrupto)
    // se limpia esa llave para que no siga tirando error cada vez
    localStorage.removeItem(BITACORA_KEY);
    return [];
  }
}

// Bitácora de auditoría persistida en LocalStorage (Historial de Auditoría del wireframe).
export default function useAuditLog() {
  const [historial, setHistorial] = useState(() => readBitacora());

  const registrar = useCallback((usuario, accion) => {
    const entrada = {
        // se guarda la hora en un fromato chileno de 24 hras.
      timestamp: new Date().toLocaleTimeString('es-CL', { hour12: false }),
      usuario,
      accion,
    };
    setHistorial((prev) => {
        // Se agrega la nueva entrada al inicio del historial y se limita a MAX_ENTRIES
      const actualizado = [entrada, ...prev].slice(0, MAX_ENTRIES);
      // se guarda el historial actualizado en LocalStorage
      // aunque se recargue la pagina.
      localStorage.setItem(BITACORA_KEY, JSON.stringify(actualizado));
      return actualizado;
    });
  }, []);

  return { historial, registrar };
}