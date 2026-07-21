import { useEffect, useState } from "react";

export default function Bitacora() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
    try {
        const data = JSON.parse(localStorage.getItem("bitacora")) || [];
        setLogs(data);
    } catch {
      setLogs([]); // si el JSON está corrupto, evita romper la app
    }
    }, []);

    return (
        <div>
        <h3>Bitácora de Auditoría</h3>
        <ul>
        {log.map((log, i) => ( <li key ={i}>{log}</li> /* React escapa el texto automáticamente */ ))} 
        </ul>
        </div>
    );
}
