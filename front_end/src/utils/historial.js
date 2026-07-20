export const guardarHistorial = (mensaje) => {

    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    const hora = new Date().toLocaleTimeString();

    historial.push(`[${hora}] ${mensaje}`);

    localStorage.setItem("historial", JSON.stringify(historial));

};