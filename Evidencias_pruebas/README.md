# Evidencia de Pruebas y Manejo de Errores
Este documento contiene las capturas de pantalla que demuestran el correcto manejo de errores HTTP en la aplicación, junto con la explicación de la lógica implementada en los bloques `catch` para asegurar la estabilidad del sistema.

## 1. Error 401
El error 401 fue el primero en ser revisado, al investigar la causa, se encontró una discrepancia entre los datos del mock-server y el Front-end. El arreglo fue utilzar los datos de mock en Front-end para asegurar los datos ya conservados.

**Error en Consola:**
![Error 401 en Consola](./error_401_consola.png)

**Error en Interfaz:**
![Error 401 en Interfaz](./error_401_interfaz.png)

---

## 2. Error 500
Al comenzar con los datos y el dashboard, aparece el error 500 que indica que la tabla no pudo ser encontrada o no cargo como corresponde, para ello revisando el codigo del dashboard, la discrepancia que ocasiono el error fue un error de linea donde el api/producto estaba mal escrito, lo cual ocasionaba que no cargara como debiese

**Error en Consola:**
![Error 500 en Consola](./error_500_consola.png)

**Error en Interfaz:**
![Error 500 en Interfaz](./error_500_interfaz.png)

---

## 3. Error 404
Al integrar las funciones de eliminación en el CRUD, se simuló y capturó el error 404, durante la trazabilidad, se vio que este error ocurre cuando el Front-end intenta procesar una acción sobre un identificador ID que ya no existe o que fue enviado con un formato incorrecto en la URL. El arreglo consistió en asegurar la correcta del ID /api/productos/.

**Error en Consola:**
![Error 404 en Consola](./error_404_consola.png)

**Error en Interfaz:**
![Error 404 en Interfaz](./error_404_interfaz.png)