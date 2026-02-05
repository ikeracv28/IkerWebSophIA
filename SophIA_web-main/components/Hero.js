
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Hero({ t }) {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.liquid} aria-hidden="true" />
            <div className={styles.heroCard}>
                <div className={styles.heroContent}>
                    <div className={`${styles.heroTag} ${styles.reveal} ${styles.revealFade} ${styles.delay100}`}>
                        <span className={styles.heroTagDot} />
                        <span>{t.hero.tag}</span>
                    </div>
                    {/* REFACTOR COPIA: Titular Principal */}
                    <h1 className={`${styles.heroTitle} ${styles.reveal} ${styles.delay200}`}>
                        Corrige ejercicios en minutos, <span>no en horas</span>
                    </h1>
                    <p className={`${styles.heroSubtitle} ${styles.reveal} ${styles.delay300}`}>
                        {t.hero.subtitle}
                    </p>
                    <div className={`${styles.heroActions} ${styles.reveal} ${styles.delay400}`}>
                        <Link href="#how">
                            <button className={styles.secondaryBtn}>
                                {t.hero.howItWorks}
                            </button>
                        </Link>
                        <Link href="#contact">
                            <button className={`${styles.primaryBtn} ${styles.pulse}`}>
                                {/* REFACTOR COPIA: Llamada a la acción (CTA) */}
                                Solicita Demo y Recupera tus 10 Horas Semanales
                            </button>
                        </Link>
                    </div>
                    <div className={`${styles.heroMeta} ${styles.reveal} ${styles.delay500}`}>
                        <span>{t.hero.meta1}</span>
                        <span>{t.hero.meta2}</span>
                        <span>{t.hero.meta3}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
