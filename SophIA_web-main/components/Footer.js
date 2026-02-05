
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Footer({ t }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerBrand}>
                    <div className={styles.footerLogo}>
                        <div className={styles.footerBrandRow}>
                            <div style={{ position: 'relative', width: '32px', height: '32px' }}>
                                <Image src="/logos/sophia.png" alt="SophIA" fill className={styles.footerLogoImg} style={{ objectFit: 'contain' }} />
                            </div>
                            <span className={{ marginLeft: '8px' }}>SophIA</span>
                        </div>
                    </div>
                    <p className={styles.footerTagline}>
                        {t.footer.tagline}
                    </p>
                    <div className={styles.footerContactActions}>
                        <a href="https://www.linkedin.com/company/sophiaeduca/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn SophIA" className={styles.linkedinLink}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.9h5V24H0V8.9zM8.5 8.9h4.8v2.05h.07c.67-1.27 2.31-2.61 4.75-2.61 5.08 0 6.02 3.33 6.02 7.66V24h-5V16.6c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.82 1.9-2.82 3.88V24h-5V8.9z" /></svg>
                        </a>
                        <a href="mailto:sophiaeducaciondigital@gmail.com" className={styles.footerEmail}>sophiaeducaciondigital@gmail.com</a>
                    </div>
                </div>
                <div className={styles.footerLinks}>
                    <div className={styles.footerColumn}>
                        <h4>{t.footer.product}</h4>
                        <Link href="#what">{t.nav.what}</Link>
                        <Link href="#how">{t.nav.how}</Link>
                    </div>
                    <div className={styles.footerColumn}>
                        <h4>{t.footer.company}</h4>
                        <Link href="#about">{t.nav.about}</Link>
                        <Link href="#contact">{t.nav.contact}</Link>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <span>© {new Date().getFullYear()} SophIA. {t.footer.rights}</span>
            </div>
        </footer>
    );
}
