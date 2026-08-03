# Evidencias de Pruebas
## Error 401 - Unauthorized

Se ingresaron credenciales incorrectas en el formulario de inicio de sesión para provocar una respuesta HTTP 401.

**Resultado:**
 La API respondió con código 401.
 La interfaz mostró el mensaje "Usuario o contraseña incorrectos".
 Se registró el error en la consola del navegador.

Archivos:
 error_401_interfaz.png
 error_401_consola.png

---

## Error 404 - Not Found

Se modificó temporalmente la petición de obtención de productos para consultar el recurso `/api/productos/9999`, el cual no existe.

**Resultado:**
 La API respondió con código 404.
 El componente `ErrorAlert` mostró el mensaje "No fue posible cargar los productos".
 El error quedó registrado en la consola del navegador.

Archivos:
 error_404_interfaz.png
 error_404_consola.png

---

## Error 500 - Internal Server Error

Se utilizó la consulta `/api/productos?error=500` para simular un error interno del servidor.

**Resultado:**
 La API respondió con código 500.
 El componente `ErrorAlert` mostró el mensaje "No fue posible cargar los productos".
 La aplicación continuó funcionando sin bloquearse.
El error quedó registrado en la consola del navegador.

Archivos:
error_500_interfaz.png
error_500_consola.png