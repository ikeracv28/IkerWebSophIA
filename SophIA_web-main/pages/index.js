
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { translations } from "../locales/translations";
import useScrollReveal from "../hooks/useScrollReveal";
// useMouseTrail removed for performance/clean design choice

// Componentes
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhatIs from "../components/WhatIs";
import HowItWorks from "../components/HowItWorks";
import About from "../components/About";
import Trust from "../components/Trust";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [lang, setLang] = useState("es");
  const [showSticky, setShowSticky] = useState(false);

  // Animation Hooks
  useScrollReveal();

  const t = translations[lang];

  // Cargar preferencia de idioma guardada al montar
  useEffect(() => {
    const savedLang = localStorage.getItem('sophia-lang');
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLang(savedLang);
    }
  }, []);

  // Guardar preferencia de idioma cuando cambia
  useEffect(() => {
    localStorage.setItem('sophia-lang', lang);
  }, [lang]);

  // Manejar Desplazamiento por Hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } catch (e) {
        // ignorar
      }
      const id = setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 50);
      return () => clearTimeout(id);
    }
    return undefined;
  }, []);

  // Sticky CTA Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="icon" href="/logos/sophia.png" type="image/png" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sophia.education/" />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:image" content="https://sophia.education/logos/sophia.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sophia.education/" />
        <meta property="twitter:title" content={t.meta.title} />
        <meta property="twitter:description" content={t.meta.description} />
        <meta property="twitter:image" content="https://sophia.education/logos/sophia.png" />
      </Head>

      <div className={styles.page}>
        <Navbar t={t} lang={lang} setLang={setLang} />

        <main className={styles.shell}>
          <Hero t={t} />
          <WhatIs t={t} />
          <HowItWorks t={t} />
          <About t={t} />
          <Trust t={t} />
          <FAQ t={t} />
          <Contact t={t} lang={lang} />
        </main>

        <Footer t={t} />

        {/* Sticky Mobile CTA */}
        <div
          className={styles.stickyCta}
          style={{
            transform: showSticky ? 'translateY(0)' : 'translateY(100px)',
            opacity: showSticky ? 1 : 0
          }}
        >
          <a href="#contact" style={{ width: '100%', textDecoration: 'none' }}>
            <button className={styles.primaryBtn} style={{ width: '100%', padding: '12px 20px', fontSize: '1rem', boxShadow: '0 -4px 20px rgba(0,0,0,0.3)' }}>
              {t.hero.requestDemo}
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
