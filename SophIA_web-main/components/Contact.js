
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Contact({ t, lang }) {
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
    const [statusMsg, setStatusMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        // Verificación de validación simple del lado del cliente (HTML5 'required' maneja la mayoría)
        if (!form.checkValidity()) {
            // lógica manejada por el navegador
            return;
        }

        setFormStatus('sending');

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const institution = form.institution.value.trim();
        const type = form.type.value;
        const message = form.message.value.trim();

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    institution,
                    type,
                    message
                })
            });

            if (response.ok) {
                setFormStatus('success');
                setStatusMsg(lang === 'es' ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!');
                form.reset();
            } else {
                throw new Error('Error al enviar');
            }
        } catch (error) {
            setFormStatus('error');
            setStatusMsg(lang === 'es' ? 'Error. Inténtalo de nuevo.' : 'Error. Please try again.');
        } finally {
            // ¿Restablecer estado después de un retraso si es exitoso, o mantener error hasta reintento?
            // El usuario solicitó el mensaje "Demo Solicitada con Éxito".
            if (formStatus === 'success') {
                setTimeout(() => setFormStatus('idle'), 5000); // limpieza opcional
            }
        }
    };

    return (
        <section id="contact" className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionKicker}>{t.contact.kicker}</span>
                <h2 className={styles.sectionTitle}>{t.contact.title}</h2>
                <p className={styles.sectionSubtitle}>
                    {t.contact.subtitle}
                </p>
            </div>

            <div className={styles.contactCard}>
                <p className={styles.contactText}>
                    {t.contact.text}
                </p>

                <form className={styles.contactForm} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            name="name"
                            placeholder={t.contact.form.name}
                            className={styles.input}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder={t.contact.form.email}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formRow}>
                        <select name="type" className={styles.select} required defaultValue="">
                            <option value="" disabled>{t.contact.form.type}</option>
                            <option value="docente">{t.contact.form.typeOptions.teacher}</option>
                            <option value="centro">{t.contact.form.typeOptions.center}</option>
                            <option value="otro">{t.contact.form.typeOptions.other}</option>
                        </select>
                        <input
                            type="text"
                            name="institution"
                            placeholder={t.contact.form.institution}
                            className={styles.input}
                        />
                    </div>
                    <textarea
                        name="message"
                        placeholder={t.contact.form.message}
                        className={styles.textarea}
                    />

                    <div className={styles.formActions} style={{ flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={formStatus === 'sending' || formStatus === 'success'}
                            style={formStatus === 'success' ? { backgroundColor: '#10b981', color: 'white' } : {}}
                        >
                            {formStatus === 'sending'
                                ? (lang === 'es' ? 'Enviando...' : 'Sending...')
                                : (formStatus === 'success' ? (lang === 'es' ? 'Demo Solicitada con Éxito' : 'Request Sent') : t.contact.form.submit)
                            }
                        </button>
                        {/* Mensaje de Retroalimentación */}
                        {statusMsg && (
                            <span style={{ color: formStatus === 'error' ? '#ef4444' : '#10b981', fontSize: '0.9rem', marginTop: '5px' }}>
                                {statusMsg}
                            </span>
                        )}
                    </div>
                </form>
                <div className={styles.contactAlt}>
                    <span className={styles.contactText}>
                        {t.contact.alt}{" "}
                        <a href="mailto:sophiaeducaciondigital@gmail.com" className={styles.mailLink}>
                            sophiaeducaciondigital@gmail.com
                        </a>
                    </span>
                </div>
            </div>
        </section>
    );
}
