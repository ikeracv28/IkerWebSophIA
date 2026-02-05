
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { translations } from "../locales/translations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import useScrollNavigation from "../hooks/useScrollNavigation";

export default function HowItWorksPage() {
    useScrollNavigation('/about', '/features');

    const [lang, setLang] = useState("es");
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

    return (
        <>
            <Head>
                <title>{t.nav.how} - SophIA</title>
                <meta name="description" content={t.meta.description} />
                <link rel="icon" href="/logos/sophia.png" type="image/png" />
            </Head>

            <div className={styles.page}>
                <Navbar t={t} lang={lang} setLang={setLang} />

                <main className={styles.shell} style={{ paddingTop: '80px', minHeight: '80vh' }}>
                    <HowItWorks t={t} />
                </main>

                <Footer t={t} />
            </div>
        </>
    );
}
