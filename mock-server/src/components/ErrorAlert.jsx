// mock-server/src/components/ErrorAlert.jsx
export default function ErrorAlert({ codigo }) {
    let mensaje = "Error inesperado";

    if (codigo === 400) mensaje = "Solicitud inválida.";
    if (codigo === 401) mensaje = "Credenciales inválidas.";
    if (codigo === 404) mensaje = "Recurso no encontrado.";
    if (codigo === 500) mensaje = "Error interno del servidor.";

    return (
    <div style={{ color: "red", fontWeight: "bold", margin: "10px 0" }}>
        ⚠️ {mensaje}
    </div>
    );
}
