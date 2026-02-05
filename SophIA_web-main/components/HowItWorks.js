
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function HowItWorks({ t }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const revealClass = `${styles.reveal} ${mounted ? styles.revealVisible : ''}`;

    // Reusing the SVGs as static illustrations for each step
    const illustrations = [
        <svg key="1" viewBox="0 0 400 300" className={styles.timelineIcon} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-hidden="true">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5dd0ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
            </defs>
            <rect x="40" y="30" width="320" height="240" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.4)" strokeWidth="2" />
            <rect x="60" y="60" width="280" height="55" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(93,208,255,0.2)" strokeWidth="1.5" />
            <rect x="310" y="70" width="38" height="38" rx="8" fill="url(#grad1)" />
            <path d="M 327 82 L 327 98 M 319 90 L 327 82 L 335 90" stroke="#031226" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="190" y="150" width="150" height="35" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <rect x="190" y="195" width="150" height="6" rx="3" fill="rgba(93,208,255,0.2)" />
            <rect x="190" y="195" width="98" height="6" rx="3" fill="url(#grad1)" />
        </svg>,
        <svg key="2" viewBox="0 0 400 300" className={styles.timelineIcon} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-hidden="true">
            <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5dd0ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
            </defs>
            <rect x="40" y="25" width="320" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.4)" strokeWidth="2" />
            <text x="60" y="58" fill="url(#grad2)" fontSize="18" fontFamily="system-ui" fontWeight="700">Criterios</text>
            <rect x="60" y="75" width="280" height="42" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(93,208,255,0.15)" strokeWidth="1.5" />
            <rect x="60" y="127" width="280" height="42" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(93,208,255,0.15)" strokeWidth="1.5" />
            <rect x="60" y="179" width="280" height="42" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(93,208,255,0.15)" strokeWidth="1.5" />
        </svg>,
        <svg key="3" viewBox="0 0 400 300" className={styles.timelineIcon} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-hidden="true">
            <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5dd0ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
            </defs>
            <rect x="35" y="25" width="330" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.4)" strokeWidth="2" />
            <rect x="55" y="45" width="290" height="48" rx="10" fill="rgba(93,208,255,0.1)" stroke="rgba(93,208,255,0.3)" strokeWidth="1.5" />
            <rect x="315" y="58" width="32" height="24" rx="6" fill="url(#grad3)" />
            <text x="323" y="75" fill="#031226" fontSize="14" fontWeight="800">8.5</text>
            <rect x="55" y="108" width="290" height="36" rx="8" fill="rgba(255,255,255,0.03)" />
            <rect x="55" y="152" width="290" height="36" rx="8" fill="rgba(255,255,255,0.03)" />
            <rect x="55" y="242" width="290" height="28" rx="8" fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" />
        </svg>,
        <svg key="4" viewBox="0 0 400 300" className={styles.timelineIcon} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-hidden="true">
            <defs>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5dd0ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
            </defs>
            <rect x="35" y="25" width="330" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.4)" strokeWidth="2" />
            <rect x="55" y="68" width="290" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
            <rect x="55" y="68" width="218" height="5" rx="2.5" fill="url(#grad4)" />
            <text x="155" y="112" fill="url(#grad4)" fontSize="18" fontWeight="800">7.8</text>
            <rect x="55" y="135" width="130" height="100" rx="10" fill="rgba(93,208,255,0.06)" stroke="rgba(93,208,255,0.2)" strokeWidth="1.5" />
            <rect x="205" y="135" width="140" height="40" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(93,208,255,0.15)" strokeWidth="1.5" />
            <rect x="205" y="185" width="140" height="40" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(167,139,250,0.15)" strokeWidth="1.5" />
        </svg>
    ];

    return (
        <section id="how" className={styles.section} aria-labelledby="how-title">
            <div className={styles.sectionHeader}>
                <span className={`${styles.sectionKicker} ${revealClass} ${styles.delay100}`}>{t.how.kicker}</span>
                <h2 id="how-title" className={`${styles.sectionTitle} ${revealClass} ${styles.delay200}`}>{t.how.title}</h2>
                <p className={`${styles.sectionSubtitle} ${revealClass} ${styles.delay300}`}>
                    {t.how.subtitle}
                </p>
            </div>

            <div className={`${styles.howVideo} ${styles.reveal} ${styles.revealVisible} ${styles.delay400}`}>
                <div className={styles.timeline}>
                    {t.how.steps.map((step, i) => (
                        <div key={i} className={styles.timelineItem}>
                            <div className={styles.timelineMarker} />
                            <div className={styles.timelineContent}>
                                {illustrations[i]}
                                <h3 className={styles.timelineTitle}>{step.title}</h3>
                                <p className={styles.timelineDesc}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
