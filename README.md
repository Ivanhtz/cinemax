# Cinemax

![Logo de Cinemax](./src//assets/img/icono.ico)

Cinemax es una aplicación Angular que permite a los usuarios navegar y buscar películas, obteniendo información detallada sobre ellas, también tienen una sección de blog, donde podrán leer artículos relacionados con el cine, permitiéndoles, escribir comentarios y poder comunicarse con otros usuarios, convirtiendo esta App en una red social enfocada en el cine. Esta aplicación aprovecha la potencia del framework Angular para proporcionar una experiencia de usuario fluida.

## Características

- Explorar una amplia colección de películas.
- Filtra películas por género.
- Ver información detallada sobre cada película.
- Explora un blog de noticias, con mucha información sobre el cine.
- Permite mandar comentarios, lo que permíte la comunicación entre usuarios.
- Descubrir películas populares y en tendencia.
- Cuenta con una Base de Datos en formato JSON dentro de la carpeta DB
- Diseño responsivo para una visualización óptima en diferentes dispositivos.

## Primeros pasos

Para comenzar con Cinemax, sigue estos pasos:

1. Clona el repositorio:

2. Navega al directorio del proyecto:

3. Instala las dependencias: (npm install)

4. Inicia la aplicación: (npm server)

5. Navega hasta la carpeta DB (la encontraras en la raiz de la app)

6. Levanta la base de datos (json-server-auth db.json)

7. Abre tu navegador y visita `http://localhost:4200` para acceder a Cinemax.

## Dependencias

Cinemax depende de las siguientes librerías:

- Angular - versión 16.0.1
- Angular CLI - versión 16.0.1
- Bootstrap - versión 5.3.0
- Angular Material - versión 16.0.2
- JSON Server Auth - versión 2.0.1

Asegúrate de tener estas dependencias instaladas antes de ejecutar la aplicación.

## Configuración

Para configurar Cinemax, es posible que debas modificar ciertos ajustes. El archivo de configuración se encuentra en `src/app/config/config.ts`. En este archivo, puedes personalizar opciones como claves de API, puntos finales u otras configuraciones específicas de la aplicación.

## Uso de la API

Cinemax utiliza una Base de datos interna, dentro del proyecto, donde se van registrando los datos, en un archivo con formato JSON, asegúrate de acceder al interior de la carpeta llamada DB en la raíz de la aplicación y levantar la base de datos con el comando json-server-auth db.json

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir a Cinemax, sigue estas pautas:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección de errores.
3. Realiza tus cambios con mensajes descriptivos en los commits.
4. Sube tus cambios a tu fork.
5. Envía una pull request a la rama `main` del repositorio original.

Asegúrate de que tu código cumpla con el estilo de codificación existente e incluya la documentación adecuada y una cobertura de pruebas apropiada.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más información.

## Agradecimientos

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Bootstrap](https://getbootstrap.com/)
- [JSON Server Auth](https://www.npmjs.com/package/json-server-auth)

## Autores

Si tienes alguna pregunta, sugerencia o problema, no dudes en contactarnos a 
- [Iván Pizarroso](https://github.com/Ivanhtz).
- [Pablo Torrecilla](https://github.com/pabloTorrecilla).
- [José Antonio Del Rey Martínez](https://github.com/Janto7).

---

