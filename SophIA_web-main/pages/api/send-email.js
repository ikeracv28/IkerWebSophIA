export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, institution, type, message } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!name || !email || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Construir el contenido del correo
    const emailContent = `
Nombre: ${name}
Email: ${email}
Institución: ${institution || 'No especificada'}
Tipo: ${type}

Mensaje:
${message || 'No especificado'}
    `.trim();

    // Usar la API de Resend para enviar el correo
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Sophia Demo <onboarding@resend.dev>',
        to: ['sophiaeducaciondigital@gmail.com'],
        reply_to: email,
        subject: `Solicitud Demo - ${type}`,
        text: emailContent,
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error from Resend:', error);
      throw new Error('Failed to send email');
    }

    const data = await response.json();
    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
