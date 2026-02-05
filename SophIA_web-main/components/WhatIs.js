
import styles from '../styles/Home.module.css';

// Gradient Definitions for reusability
const GradientDefs = () => (
    <svg width="0" height="0" className="hidden">
        <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5DD0FF" />
                <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
        </defs>
    </svg>
);

const Icons = {
    time: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    quality: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v20" opacity="0.4" />
            <path d="M2 12h20" opacity="0.4" />
            <path d="m9 12 2 2 4-4" strokeWidth="2" />
        </svg>
    ),
    control: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    ),
    feedback: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="12" y2="14" />
        </svg>
    ),
    database: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    ),
    speed: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="url(#iconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    )
};

export default function WhatIs({ t }) {
    return (
        <section id="what" className={styles.section}>
            <GradientDefs />
            <div className={styles.sectionHeader}>
                <span className={`${styles.sectionKicker} ${styles.reveal} ${styles.delay100}`}>{t.what.kicker}</span>
                <h2 className={`${styles.sectionTitle} ${styles.reveal} ${styles.delay200}`}>{t.what.title}</h2>
                <p className={`${styles.sectionSubtitle} ${styles.reveal} ${styles.delay300}`} style={{ fontWeight: 600, color: '#a78bfa', fontSize: '1.25rem', marginTop: '1rem' }}>
                    {t.what.subtitle}
                </p>
            </div>

            <div className={styles.featuresGrid}>
                {t.what.features.map((feature, idx) => {
                    const isLarge = idx === 0 || idx === 3 || idx === 5;
                    const IconComponent = Icons[feature.icon] || Icons.time;

                    return (
                        <div
                            key={idx}
                            className={`${styles.featureCard} ${isLarge ? styles.colSpan2 : ''} ${styles.reveal} ${styles.revealScale}`}
                            style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
                        >
                            <div className={styles.featureIcon}>
                                {IconComponent}
                            </div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDesc}>
                                {feature.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
