# SophIA - IA para Educación Superior

SophIA es un asistente de corrección impulsado por IA diseñado para empoderar a los profesores universitarios, no para reemplazarlos.

Este documento detalla la evolución técnica y filosófica del proyecto, explicando las decisiones críticas tomadas para transformar un prototipo visual en una herramienta profesional de alto rendimiento.

## 🚀 Evolución del Proyecto y Filosofía

Hemos transformado el proyecto desde un concepto inicial cargado de efectos interactivos hacia una herramienta profesional, estable y optimizada. Cada decisión técnica ha buscado dos objetivos: **confianza institucional** y **velocidad extrema**.

### 1. "La IA como Copiloto" (El Por Qué)
Inicialmente, el mensaje era genérico. Pivotamos la filosofía central para establecer explícitamente que **la IA no sustituye al docente**.
- **Cambio de Narrativa**: Reescritura completa de las secciones "Hero" y "Qué es SophIA" para resaltar el "Control del Docente", la "Asistencia" y la "Calidad Pedagógica".
- **Objetivo**: Asegurar al académico que su criterio es insustituible, mientras SophIA se encarga del trabajo repetitivo (ahorrando 7-10 horas/semana).

### 2. Reestructuración y Arquitectura (El Cómo)
El proyecto original sufría de problemas de rendimiento y mantenibilidad debido a una estructura monolítica y efectos innecesarios. Realizamos una **reestructuración completa**:

#### A. Modularización de Componentes
- **Situación Anterior**: Lógica y diseño mezclados en archivos grandes, dificil de mantener.
- **Solución**: Separamos la interfaz en componentes atómicos y reutilizables (`components/Hero.js`, `components/About.js`, `components/Trust.js`, etc.).
- **Beneficio**: Esto no solo limpia el código, sino que permite que React renderice solo lo necesario, mejorando la respuesta de la interfaz.

#### B. Optimización Radical de Rendimiento
- **Eliminación de "Bloatware"**: Eliminamos por completo efectos visuales pesados como `useMouseTrail`, `useFluidTrail` y sistemas de partículas.
    - *Razón*: Estos efectos consumían CPU/batería y daban una sensación "gamer" poco apropiada para una herramienta académica.
- **Optimización de Imágenes**: Migración total de etiquetas `<img>` estándar al componente `<Image>` de Next.js.
    - *Impacto*: Carga diferida (lazy loading) automática, formatos modernos (WebP) y eliminación de saltos de diseño (CLS), resultando en una carga casi instantánea.

#### C. Lógica de Navegación Profesional
- Reescritura del hook `useScrollNavigation.js`. Implementamos "cooldowns" (tiempos de espera) y gestión precisa de eventos de rueda (wheel) para evitar el desplazamiento errático (scroll-jacking), asegurando transiciones suaves pero controladas entre secciones.

### 3. Madurez Visual y UI
Sustituimos ilustraciones abstractas genéricas en la sección "Cómo funciona" por **Maquetas de UI (Mockups) en SVG de Alta Fidelidad**.
- **Cambio**: De iconos genéricos a representaciones exactas de la interfaz (Interfaz de Subida, Configuración de Criterios, Tarjeta de Feedback, Tablero de Analíticas).
- **Implementación**: Código SVG puro inyectado directamente en `HowItWorks.js` para evitar peticiones HTTP adicionales y asegurar una nitidez perfecta en cualquier pantalla.

### 4. Calidad de Código e Internacionalización
- **Soporte Bilingüe Robusto**: Sistema de diccionario `t` centralizado en `locales/translations.js`, permitiendo el cambio instantáneo entre Español e Inglés sin recargas, asegurando que ningún texto (como el "FAQ" que faltaba) se quede sin traducir.

---

## 🏗 Enlace de repositorio de github
https://github.com/ikeracv28/IkerWebSophIA

## 🏗 Enlace de pagina montada en servidor de vercel, para que puedas ver el resultado final
https://iker-web-soph-ia.vercel.app/


## 🏗 Para Empezar

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```


