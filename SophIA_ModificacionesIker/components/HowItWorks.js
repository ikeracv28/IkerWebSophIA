
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function HowItWorks({ t }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const revealClass = `${styles.reveal} ${mounted ? styles.revealVisible : ''}`;

    // UI Mockup SVGs matching the reference design
    const illustrations = [
        // 1. Upload Interface
        <svg key="1" viewBox="0 0 400 300" className={styles.timelineIcon} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-hidden="true">
            <defs>
                <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            {/* Main Card */}
            <rect x="40" y="30" width="320" height="240" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.15)" strokeWidth="1" />

            {/* Drag Drop Zone */}
            <rect x="65" y="60" width="270" height="80" rx="12" fill="rgba(255,255,255,0.01)" stroke="rgba(93,208,255,0.15)" strokeWidth="1.5" strokeDasharray="6 6" />
            <text x="200" y="95" fill="rgba(255,255,255,0.4)" fontSize="12" textAnchor="middle" fontFamily="sans-serif">Arrastra archivos aquí o haz clic</text>
            <path d="M200 108 L200 125 M193 115 L200 108 L207 115" stroke="rgba(93,208,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Uploading File Item */}
            <rect x="65" y="160" width="270" height="60" rx="12" fill="rgba(10, 15, 26, 0.6)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            {/* File Icon */}
            <rect x="80" y="175" width="24" height="30" rx="4" fill="rgba(93,208,255,0.1)" />
            <path d="M92 180 L92 200" stroke="#5dd0ff" strokeWidth="2" strokeLinecap="round" />

            {/* File Info */}
            <text x="115" y="186" fill="white" fontSize="13" fontWeight="600" fontFamily="sans-serif">document.pdf</text>
            <text x="115" y="202" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="sans-serif">2.4 MB</text>

            {/* Progress Bar */}
            <text x="310" y="195" fill="#5dd0ff" fontSize="11" fontFamily="sans-serif" textAnchor="end">65%</text>
            <rect x="115" y="208" width="200" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
            <rect x="115" y="208" width="130" height="4" rx="2" fill="#5dd0ff" filter="url(#glow1)" />
        </svg>,

        // 2. Criteria Configuration
        <svg key="2" viewBox="0 0 400 300" className={styles.timelineIcon} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-hidden="true">
            <rect x="40" y="25" width="320" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.15)" strokeWidth="1" />

            {/* Header */}
            <text x="65" y="60" fill="#a78bfa" fontSize="14" fontWeight="600" fontFamily="sans-serif" letterSpacing="0.5">Criterios de evaluación</text>

            {/* List Items */}
            <g transform="translate(65, 85)">
                {/* Item 1 */}
                <rect x="0" y="0" width="270" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" />
                <text x="15" y="25" fill="rgba(230,230,230,0.9)" fontSize="13" fontFamily="sans-serif">Claridad de respuesta</text>
                <circle cx="250" cy="20" r="8" fill="none" stroke="#5dd0ff" strokeWidth="2" />
                <circle cx="250" cy="20" r="4" fill="#5dd0ff" />

                {/* Item 2 */}
                <rect x="0" y="50" width="270" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" />
                <text x="15" y="75" fill="rgba(230,230,230,0.9)" fontSize="13" fontFamily="sans-serif">Uso de ejemplos</text>
                <circle cx="250" cy="70" r="8" fill="none" stroke="#5dd0ff" strokeWidth="2" />
                <circle cx="250" cy="70" r="4" fill="#5dd0ff" />

                {/* Item 3 */}
                <rect x="0" y="100" width="270" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" />
                <text x="15" y="125" fill="rgba(230,230,230,0.9)" fontSize="13" fontFamily="sans-serif">Ortografía y gramática</text>
                <circle cx="250" cy="120" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            </g>

            {/* Footer Weighting */}
            <g transform="translate(65, 245)">
                <text x="0" y="5" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="sans-serif">Ponderación total: 100%</text>
                <rect x="120" y="-4" width="150" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
                <rect x="120" y="-4" width="100" height="8" rx="4" fill="#a78bfa" />
            </g>
        </svg>,

        // 3. Feedback
        <svg key="3" viewBox="0 0 400 300" className={styles.timelineIcon} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-hidden="true">
            <rect x="35" y="25" width="330" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.15)" strokeWidth="1" />

            {/* Header: Student Name & Score */}
            <rect x="55" y="45" width="290" height="50" rx="10" fill="linear-gradient(90deg, rgba(93,208,255,0.1), transparent)" stroke="rgba(93,208,255,0.2)" strokeWidth="1" />
            <text x="75" y="75" fill="white" fontSize="15" fontWeight="700" fontFamily="sans-serif">Estudiante: Ana García</text>

            {/* Score Badge */}
            <rect x="290" y="55" width="40" height="30" rx="6" fill="#5dd0ff" />
            <text x="310" y="76" fill="#031226" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">8.5</text>

            {/* Feedback Detail List */}
            <g transform="translate(55, 115)">
                {/* Item 1 - Good */}
                <rect x="0" y="0" width="290" height="36" rx="8" fill="rgba(255,255,255,0.04)" />
                <circle cx="20" cy="18" r="8" fill="rgba(93,208,255,0.2)" />
                <path d="M16 18 L19 21 L24 15" stroke="#5dd0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="40" y="22" fill="rgba(255,255,255,0.8)" fontSize="12" fontFamily="sans-serif">Excelente estructura argumentativa</text>

                {/* Item 2 - Improve */}
                <rect x="0" y="45" width="290" height="36" rx="8" fill="rgba(255,255,255,0.04)" />
                <circle cx="20" cy="63" r="8" fill="rgba(167,139,250,0.2)" />
                <text x="20" y="68" fill="#a78bfa" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="serif">!</text>
                <text x="40" y="67" fill="rgba(255,255,255,0.8)" fontSize="12" fontFamily="sans-serif">Podría incluir más ejemplos prácticos</text>

                {/* Item 3 - Good */}
                <rect x="0" y="90" width="290" height="36" rx="8" fill="rgba(255,255,255,0.04)" />
                <circle cx="20" cy="108" r="8" fill="rgba(93,208,255,0.2)" />
                <path d="M16 108 L19 111 L24 105" stroke="#5dd0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="40" y="112" fill="rgba(255,255,255,0.8)" fontSize="12" fontFamily="sans-serif">Buena ortografía y presentación</text>
            </g>
        </svg>,

        // 4. Analytics
        <svg key="4" viewBox="0 0 400 300" className={styles.timelineIcon} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-hidden="true">
            <rect x="35" y="25" width="330" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.15)" strokeWidth="1" />

            {/* Header */}
            <text x="55" y="60" fill="#a78bfa" fontSize="15" fontWeight="600" fontFamily="sans-serif">Rendimiento de la clase</text>
            <line x1="55" y1="75" x2="345" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* Stats */}
            <g transform="translate(55, 95)">
                <rect x="0" y="0" width="100" height="40" rx="8" fill="rgba(93,208,255,0.05)" stroke="rgba(93,208,255,0.1)" />
                <text x="10" y="15" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">Promedio general</text>
                <text x="10" y="32" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif">7.8</text>
            </g>

            <g transform="translate(170, 95)">
                <rect x="0" y="0" width="100" height="40" rx="8" fill="rgba(167,139,250,0.05)" stroke="rgba(167,139,250,0.1)" />
                <text x="10" y="15" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">Mejora</text>
                <text x="10" y="32" fill="#a78bfa" fontSize="16" fontWeight="bold" fontFamily="sans-serif">+12%</text>
            </g>

            {/* Chart Area */}
            <g transform="translate(55, 160)">
                <text x="0" y="0" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="sans-serif">Distribución</text>
                {/* Bars */}
                <rect x="10" y="20" width="20" height="60" rx="2" fill="rgba(255,255,255,0.1)" /> {/* Placeholder animation logic if needed, simplify for static */}

                {/* Static bars drawn from bottom up */}
                <rect x="0" y="40" width="20" height="40" rx="3" fill="rgba(255,255,255,0.1)" />
                <rect x="35" y="20" width="20" height="60" rx="3" fill="rgba(93,208,255,0.4)" />
                <rect x="70" y="10" width="20" height="70" rx="3" fill="#5dd0ff" />
                <rect x="105" y="50" width="20" height="30" rx="3" fill="rgba(255,255,255,0.1)" />

                {/* X Axis Labels */}
                <text x="10" y="95" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle">5-6</text>
                <text x="45" y="95" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle">7-8</text>
                <text x="80" y="95" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle">9-10</text>
                <text x="115" y="95" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle">&lt;5</text>
            </g>

            {/* Side Legend */}
            <g transform="translate(200, 180)">
                <circle cx="10" cy="10" r="4" fill="#5dd0ff" />
                <text x="25" y="14" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="sans-serif">89% aprobados</text>

                <circle cx="10" cy="35" r="4" fill="rgba(255,255,255,0.2)" />
                <text x="25" y="39" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="sans-serif">Necesita apoyo</text>
            </g>
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
