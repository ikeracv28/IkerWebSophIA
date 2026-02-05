# Configuración del Formulario de Contacto

El formulario de contacto ahora envía correos electrónicos directamente usando la API de Resend.

## Configuración necesaria:

1. **Obtener una clave API de Resend:**
   - Ve a [https://resend.com](https://resend.com)
   - Crea una cuenta gratuita
   - Ve a "API Keys" en el dashboard
   - Crea una nueva API key

2. **Configurar la variable de entorno:**
   - Abre el archivo `.env.local` en la raíz del proyecto
   - Reemplaza `tu_clave_api_aqui` con tu clave API de Resend:
     ```
     RESEND_API_KEY=re_tu_clave_api_real
     ```

3. **Verificar el dominio (opcional pero recomendado):**
   - En Resend, puedes verificar tu propio dominio para enviar desde tu email
   - Sin verificar, los correos se enviarán desde `onboarding@resend.dev`
   - Con dominio verificado, puedes usar algo como `noreply@tudominio.com`

4. **Reiniciar el servidor de desarrollo:**
   - Después de añadir la clave API, reinicia el servidor:
     ```bash
     npm run dev
     ```

## Cómo funciona:

- Cuando un usuario completa el formulario y hace clic en "Solicitar Demo", el formulario envía los datos a `/api/send-email`
- El servidor procesa la solicitud y envía un correo a `mariofdzbusto@gmail.com`
- El correo incluye todos los datos del formulario y el campo "reply-to" se configura con el email del usuario
- El usuario recibe un mensaje de confirmación cuando el correo se envía exitosamente

## Plan gratuito de Resend:

- 100 correos por día
- 3,000 correos por mes
- Ideal para demos y pequeñas aplicaciones

## Solución alternativa (sin servicio externo):

Si no quieres usar Resend, puedes usar servicios como:
- **EmailJS** (100 correos/mes gratis)
- **SendGrid** (100 correos/día gratis)
- **Mailgun** (5,000 correos/mes gratis los primeros 3 meses)

O configurar tu propio servidor SMTP con Nodemailer.

# Configuración del Formulario de Contacto

El formulario de contacto ahora envía correos electrónicos directamente usando la API de Resend.

## Configuración necesaria:

1. **Obtener una clave API de Resend:**
   - Ve a [https://resend.com](https://resend.com)
   - Crea una cuenta gratuita
   - Ve a "API Keys" en el dashboard
   - Crea una nueva API key

2. **Configurar la variable de entorno:**
   - Abre el archivo `.env.local` en la raíz del proyecto
   - Reemplaza `tu_clave_api_aqui` con tu clave API de Resend:
     ```
     RESEND_API_KEY=re_tu_clave_api_real
     ```

3. **Verificar el dominio (opcional pero recomendado):**
   - En Resend, puedes verificar tu propio dominio para enviar desde tu email
   - Sin verificar, los correos se enviarán desde `onboarding@resend.dev`
   - Con dominio verificado, puedes usar algo como `noreply@tudominio.com`

4. **Reiniciar el servidor de desarrollo:**
   - Después de añadir la clave API, reinicia el servidor:
     ```bash
     npm run dev
     ```

## Cómo funciona:

- Cuando un usuario completa el formulario y hace clic en "Solicitar Demo", el formulario envía los datos a `/api/send-email`
- El servidor procesa la solicitud y envía un correo a `mariofdzbusto@gmail.com`
- El correo incluye todos los datos del formulario y el campo "reply-to" se configura con el email del usuario
- El usuario recibe un mensaje de confirmación cuando el correo se envía exitosamente

## Plan gratuito de Resend:

- 100 correos por día
- 3,000 correos por mes
- Ideal para demos y pequeñas aplicaciones

## Solución alternativa (sin servicio externo):

Si no quieres usar Resend, puedes usar servicios como:
- **EmailJS** (100 correos/mes gratis)
- **SendGrid** (100 correos/día gratis)
- **Mailgun** (5,000 correos/mes gratis los primeros 3 meses)

O configurar tu propio servidor SMTP con Nodemailer.
