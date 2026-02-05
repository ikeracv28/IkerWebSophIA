
import styles from '../styles/Home.module.css';

export default function WhatIs({ t }) {
    return (
        <section id="what" className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={`${styles.sectionKicker} ${styles.reveal} ${styles.delay100}`}>{t.what.kicker}</span>
                <h2 className={`${styles.sectionTitle} ${styles.reveal} ${styles.delay200}`}>{t.what.title}</h2>
                <p className={`${styles.sectionSubtitle} ${styles.reveal} ${styles.delay300}`} style={{ fontWeight: 600, color: '#a78bfa', fontSize: '1.25rem', marginTop: '1rem' }}>
                    {t.what.subtitle}
                </p>
            </div>

            <div className={styles.featuresGrid}>
                {t.what.features.map((feature, idx) => (
                    <div key={idx} className={`${styles.featureCard} ${styles.reveal} ${styles.revealScale}`} style={{ transitionDelay: `${(idx + 1) * 100}ms` }}>
                        <div className={styles.featureIcon}>{feature.icon}</div>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDesc}>
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
