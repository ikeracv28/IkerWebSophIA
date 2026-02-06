
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { translations } from "../locales/translations";
import useScrollReveal from "../hooks/useScrollReveal";


// Components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Trust from "../components/Trust";
import useScrollNavigation from "../hooks/useScrollNavigation";

export default function Home() {
  const [lang, setLang] = useState("es");
  const [showSticky, setShowSticky] = useState(false);

  // Animation Hooks
  useScrollReveal();
  useScrollNavigation('/features', null); // Navigate to next page on scroll

  const t = translations[lang];

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('sophia-lang');
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLang(savedLang);
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('sophia-lang', lang);
  }, [lang]);

  // Handle Hash Scrolling
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } catch (e) {
        // ignore
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
          <Trust t={t} />
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
          <a href="/demo" style={{ width: '100%', textDecoration: 'none' }}>
            <button className={styles.primaryBtn} style={{ width: '100%', padding: '12px 20px', fontSize: '1rem', boxShadow: '0 -4px 20px rgba(0,0,0,0.3)' }}>
              {t.hero.requestDemo}
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
