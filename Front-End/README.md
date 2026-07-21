# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


**El uso de IA fue implementada a traves de Gemini, con los conceptos de localstorage**
Para esta parte del codigo fue hecho con lo indicado en las intrucciones del trabajo, buscando un modulo en el cual no tuviera conocimientos plenos, con el codigo entregado se integro al dashboard para implementar la utilidad de los botones de guardado, cargado de preferencias escritas en la rubrica.

**Criterio**:Parte del porque fue mi uso de la IA en este codigo fue porque buscando informacion acerca de la persistencia del localstorage, me encontraba explicaciones mas detalladas para trabajos de mayor escala, con mejores terminos y mayores reposiciones en los codigos, para no llevar a tal escala este trabajo, utilice la IA para que me diese un codigo mas sencillo de lo visto en videos explicativos. Los videos vistos fueron bastante ayuda para comprender mas lo que tiene que ver el "LocalStorage" pero ellos me llevaban a crear codigo mas complejos para trabajos mas grandes que solo algo como un gestor de almacenamientos. 


**Prompt utilizado**: "Quiero ver la parte de persistencia del localstorage con la cual se guarde los tokens, con su uso de CRUD junto a una validación estructurada como se menciona en la rubrica"

Codigo entregado por la IA:

  const guardarPreferencias = () => {
    // Simulamos una preferencia de usuario
    const preferencias = { 
      vista: 'tabla_completa', 
      ultimaModificacion: new Date().toISOString() 
    };
    localStorage.setItem('preferenciasApp', JSON.stringify(preferencias));
    alert('Preferencias guardadas localmente.');
  };

  const cargarPreferencias = () => {
    try {
      const data = localStorage.getItem('preferenciasApp');
      if (data) {
        // Aquí está el JSON.parse validado que exige la rúbrica
        const preferenciasParseadas = JSON.parse(data); 
        console.log("Preferencias cargadas de forma segura:", preferenciasParseadas);
        alert('Preferencias cargadas en consola.');
      } else {
        alert('No hay preferencias guardadas.');
      }
    } catch (error) {
      // Prevención de errores si el JSON está corrupto o manipulado maliciosamente
      console.error("Error de integridad: Datos corruptos en LocalStorage");
      localStorage.removeItem('preferenciasApp'); 
    }
  };

  const borrarPreferencias = () => {
    localStorage.removeItem('preferenciasApp');
    alert('Preferencias borradas del sistema.');
  };