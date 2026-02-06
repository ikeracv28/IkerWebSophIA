
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { translations } from "../locales/translations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useScrollNavigation from "../hooks/useScrollNavigation";

export default function Demo() {
    useScrollNavigation(null, '/faq');

    const [lang, setLang] = useState("es");
    const [formStatus, setFormStatus] = useState('idle');
    const [statusMsg, setStatusMsg] = useState('');

    const t = translations[lang];

    useEffect(() => {
        const savedLang = localStorage.getItem('sophia-lang');
        if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
            setLang(savedLang);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sophia-lang', lang);
    }, [lang]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) return;

        setFormStatus('sending');

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const institution = form.institution.value.trim();
        const type = form.type.value;
        const message = form.message.value.trim();

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, institution, type, message })
            });

            if (response.ok) {
                setFormStatus('success');
                setStatusMsg(lang === 'es' ? '¡Solicitud recibida! Te contactaremos pronto.' : 'Request received! We will contact you soon.');
                form.reset();
            } else {
                throw new Error('Error al enviar');
            }
        } catch (error) {
            setFormStatus('error');
            setStatusMsg(lang === 'es' ? 'Error. Por favor inténtalo de nuevo.' : 'Error. Please try again.');
        } finally {
            if (formStatus === 'success') {
                setTimeout(() => setFormStatus('idle'), 5000);
            }
        }
    };

    return (
        <>
            <Head>
                <title>{lang === 'es' ? 'Solicitar Demo - SophIA' : 'Request Demo - SophIA'}</title>
                <meta name="description" content={t.meta.description} />
                <link rel="icon" href="/logos/sophia.png" type="image/png" />
            </Head>

            <div className={styles.page}>
                <Navbar t={t} lang={lang} setLang={setLang} />

                <main className={styles.shell} style={{ paddingTop: '100px', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
                    <div className={styles.demoLayout}>
                        {/* Left Side: Value Props */}
                        <div className={styles.demoContent}>
                            <span className={styles.heroTagDot} style={{ display: 'inline-block', marginBottom: '16px' }} />
                            <h1 className={styles.demoTitle}>
                                {lang === 'es' ? 'Únete a la revolución educativa' : 'Join the educational revolution'}
                            </h1>
                            <p className={styles.demoSubtitle}>
                                {lang === 'es'
                                    ? 'Descubre cómo SophIA puede ahorrarte horas de corrección cada semana y mejorar el feedback para tus alumnos.'
                                    : 'Discover how SophIA can save you hours of grading every week and improve feedback for your students.'}
                            </p>

                            <div className={styles.demoStats}>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>10h+</span>
                                    <span className={styles.statLabel}>{lang === 'es' ? 'Ahorradas/semana' : 'Saved/week'}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>100%</span>
                                    <span className={styles.statLabel}>{lang === 'es' ? 'Control docente' : 'Teacher control'}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statNumber}>24/7</span>
                                    <span className={styles.statLabel}>{lang === 'es' ? 'Disponibilidad' : 'Availability'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className={styles.demoFormWrapper}>
                            <h2 className={styles.demoSectionTitle}>
                                {t.contact.title}
                            </h2>
                            <div className={styles.demoFormCard}>
                                <form className={styles.contactForm} onSubmit={handleSubmit}>
                                    <div className={styles.formRow}>
                                        <input type="text" name="name" placeholder={t.contact.form.name} className={styles.input} required />
                                        <input type="email" name="email" placeholder={t.contact.form.email} className={styles.input} required />
                                    </div>
                                    <div className={styles.formRow}>
                                        <select name="type" className={styles.select} required defaultValue="">
                                            <option value="" disabled>{t.contact.form.type}</option>
                                            <option value="docente">{t.contact.form.typeOptions.teacher}</option>
                                            <option value="centro">{t.contact.form.typeOptions.center}</option>
                                            <option value="otro">{t.contact.form.typeOptions.other}</option>
                                        </select>
                                        <input type="text" name="institution" placeholder={t.contact.form.institution} className={styles.input} />
                                    </div>
                                    <textarea name="message" placeholder={t.contact.form.message} className={styles.textarea} style={{ minHeight: '100px' }} />

                                    <div className={styles.formActions}>
                                        <button type="submit" className={styles.submitBtn} disabled={formStatus === 'sending' || formStatus === 'success'}
                                            style={formStatus === 'success' ? { backgroundColor: '#10b981', color: 'white' } : { width: '100%' }}>
                                            {formStatus === 'sending'
                                                ? (lang === 'es' ? 'Enviando...' : 'Sending...')
                                                : (formStatus === 'success' ? (lang === 'es' ? '¡Enviado!' : 'Sent!') : t.contact.form.submit)}
                                        </button>
                                        {statusMsg && (
                                            <span style={{ color: formStatus === 'error' ? '#ef4444' : '#10b981', fontSize: '0.9rem', marginTop: '5px' }}>
                                                {statusMsg}
                                            </span>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer t={t} />
            </div>
        </>
    );
}
