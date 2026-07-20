# Informe de Uso de Inteligencia Artificial (IA) - INACAP ES3

## Caso 1: Centralización del Manejo de Errores con Axios

* **Contexto:** Se necesitaba interceptar errores de red de forma global para no duplicar código try-catch en cada componente.
* **Prompt Utilizado:**
  > *"Hola, en la rúbrica de INACAP me piden que intercepte los errores de red como 401, 500 y 404 en la consola y los muestre con un cartel flotante rojo en pantalla. No quiero tener que escribir bloques try-catch repetitivos en todas las llamadas de la API de mis componentes porque se volvería muy confuso. ¿Hay alguna forma de interceptar los errores con Axios globalmente y comunicarlo a un componente de alerta de forma sencilla?"*
* **Análisis Crítico:**
  La IA propuso inicialmente usar Context API o Redux para manejar el estado del error globalmente. se prefirió simplificar la arquitectura: en lugar de complejizar el estado de React con contextos adicionales, se optó por usar un **CustomEvent nativo de JavaScript** (`window.dispatchEvent`) lanzado desde el interceptor de Axios y escuchado por un componente simple de toast (`ErrorAlert.jsx`). Esta solución mantiene el código desacoplado, es muy liviana y fácil de comprender y mantener.

---

## Caso 2: Estructura del Tablero Kanban (3 Columnas y LocalStorage)

* **Contexto:** La base de datos del Mock Server solo almacena un estado binario (`completada: true/false`), pero el diseño visual exige 3 columnas (Pendiente, En Proceso, Completada).
* **Prompt Utilizado:**
  > *"Tengo que hacer la Opción B (Team Task Tracker) de la evaluación de INACAP. La pauta me pide mostrar las tareas organizadas en 3 columnas: 'Pendiente', 'En Proceso' y 'Completada'. Sin embargo, al revisar el servidor Mock (`InMemoryDb.js`), noté que las tareas en la base de datos solo tienen la propiedad booleana `completada` (true/false) y no tienen una columna para 'En Proceso'. ¿Cómo puedo implementar las 3 columnas y mover las tareas consumiendo esta API sin modificar el servidor mock, y de qué forma puedo aprovechar LocalStorage para esto como lo pide la rúbrica?"*
* **Análisis Crítico:**
  La solución sugerida de almacenar un arreglo con los IDs de las tareas iniciadas en LocalStorage (`enProcesoIds`) resultó excelente. Permite conservar el estado visual intermedio ("En Proceso") en el lado del cliente sin requerir modificaciones en la base de datos fija del servidor mock. Al combinar este listado local con la propiedad `completada` del servidor, se logra clasificar las tareas en las tres columnas requeridas de manera limpia, además de cumplir de forma práctica con el criterio de evaluación de usar almacenamiento persistente de preferencias de usuario.

---

## Caso 3: Corrección de Conflictos de Variables (Variable Shadowing)

* **Contexto:** Al intentar escribir las funciones CRUD del tablero de tareas de forma manual, surgieron ReferenceErrors por nombres de variables en conflicto y desorden de llaves.
* **Prompt Utilizado:**
  > *"Ya agregué todo el código del tablero en `TaskBoard.jsx` pero me quedó un poco desordenado. Aparte de eso me parece que hay un problema grave con las variables de IDs y las tareas, porque yo declaré mi estado como `tasks` en plural, pero en el código a veces se usa `task` en singular. ¿Me puedes verificar cuál es el error y por qué la consola me da fallas de nombres?"*
* **Análisis Crítico:**
  El análisis de la IA me ayudó a entender el concepto de **sombreado de variables** (*variable shadowing*). En mi código había definido el parámetro de la función `handleMoveTask` como `tasks` (en plural), lo que provocaba que JavaScript ocultara la variable de estado global `tasks` (que tiene la lista completa). Se adoptó la refactorización de cambiar el nombre del parámetro de la función a `task` (en singular). Esto no solo corrigió los errores de ejecución en consola, sino que me enseñó una regla de oro en React: el estado que almacena la lista se nombra en plural, y los parámetros o variables en ciclos independientes deben ir en singular.
