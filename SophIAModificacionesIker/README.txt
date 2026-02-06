# SophIA Landing Page / Web

Este proyecto es una página web **minimalista y elegante** desarrollada con **Next.js** para mostrar los productos y servicios de **SophIA**. Está diseñado con un enfoque en la simplicidad y la estética moderna, utilizando un esquema de colores oscuro con acentos en azul.

## Requisitos

Para ejecutar el proyecto localmente, necesitas tener **Node.js** instalado. Si aún no lo tienes, puedes descargarlo desde [nodejs.org](https://nodejs.org/).

### Requisitos:
- **Node.js** (versión recomendada: LTS)
- **npm** (viene instalado con Node.js)

---

## Instalación y Ejecución

### 1. Clonar o descargar el proyecto

- Si descargaste el archivo ZIP, descomprímelo en una carpeta de tu elección.
- Si prefieres clonar el proyecto desde GitHub, ejecuta:
  ```bash
  git clone <url-del-repositorio>
  ```

### 2. Navegar al directorio del proyecto

Abre una terminal y navega a la carpeta del proyecto:

```bash
cd /ruta/a/la/carpeta/del/proyecto
```

### 3. Instalar las dependencias

Una vez que estés dentro de la carpeta del proyecto, ejecuta el siguiente comando para instalar todas las dependencias necesarias para el proyecto:

```bash
npm install
```

Este comando descargará todas las bibliotecas necesarias para ejecutar el proyecto.

### 4. Iniciar el servidor local

Para arrancar el servidor de desarrollo y ver la página en tu navegador, ejecuta el siguiente comando:

```bash
npm run dev
```

Cuando el servidor esté corriendo, deberías ver un mensaje como este en la terminal:

```bash
Local: http://localhost:3000
```

Esto significa que el servidor local está corriendo en el puerto 3000 de tu máquina.

---

## Cómo usar el proyecto

### **Abrir la página web**:

1. Abre tu navegador web y ve a `http://localhost:3000`.
2. Verás la página de inicio con todos los apartados listados.

### **Realizar cambios en el código**:

1. Puedes modificar el contenido de la página y los estilos editando los archivos en:
   - **`pages/index.js`** para modificar el contenido de la landing page.
   - **`styles/globals.css`** para cambiar los estilos globales (por ejemplo, los colores de fondo).
   - **`styles/Home.module.css`** para cambiar los estilos específicos de la landing page.

2. Cuando guardes los cambios en estos archivos, **Next.js actualizará automáticamente la página** en el navegador sin necesidad de recargarla manualmente.

---

## Despliegue

Si deseas desplegar tu sitio web en producción, puedes usar plataformas como **Vercel**, **Netlify** o **GitHub Pages**. Para desplegar en **Vercel**, sigue estos pasos:

1. Regístrate en [Vercel](https://vercel.com).
2. Conecta tu cuenta de GitHub y selecciona tu repositorio.
3. Vercel se encargará automáticamente del despliegue.

---

## Estructura del Proyecto

El proyecto sigue una estructura estándar de Next.js con algunas carpetas clave:

- **`pages/`**: Contiene las páginas del sitio. El archivo principal `index.js` es donde se define la landing page.
- **`styles/`**: Contiene los archivos CSS. `globals.css` tiene los estilos globales y `Home.module.css` contiene los estilos específicos de la landing page.
- **`public/`**: Aquí puedes colocar imágenes y otros archivos estáticos como logos.

## Personalización

Puedes personalizar los siguientes aspectos del proyecto:

- **Texto y contenido**: Puedes modificar el contenido de las secciones como *Quiénes somos*, *Productos*, etc., directamente en los archivos dentro de `pages/` y `components/`.
- **Estilos**: Los estilos globales se encuentran en `styles/globals.css` y los específicos de la página en `styles/Home.module.css`. Si deseas cambiar los colores, la tipografía o el diseño, edita estos archivos.
- **Imágenes y Logos**: Puedes reemplazar las imágenes y los logos en la carpeta `public/` por tus propios archivos.

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
