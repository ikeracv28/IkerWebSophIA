
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image'; // Si usamos imágenes, pero aquí usamos SVGs en línea. ¿Mantenerlos o moverlos? En línea está bien.
import styles from '../styles/Home.module.css';

function VideoSteps({ steps = [] }) {
    const [showMain, setShowMain] = useState(false);
    const [stepIdx, setStepIdx] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const id = setTimeout(() => setShowMain(true), 220);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        if (!showMain || steps.length === 0) return undefined;
        setStepIdx(0);
        intervalRef.current = setInterval(() => {
            setStepIdx((s) => (s + 1) % steps.length);
        }, 8000);

        return () => clearInterval(intervalRef.current);
    }, [showMain, steps]);

    // SVGs movidos aquí para evitar desorden pero mantenidos en línea ya que son dinámicos/personalizados
    const illustrations = [
        <svg key="1" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" className={styles.howPreviewImg} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-label="Vista previa: Subida de archivos">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5dd0ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <rect x="40" y="30" width="320" height="240" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.4)" strokeWidth="2" />
            <rect x="60" y="60" width="280" height="55" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(93,208,255,0.2)" strokeWidth="1.5" />
            <text x="80" y="92" fill="rgba(230,238,248,0.8)" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="500">Arrastra archivos aquí o haz clic</text>
            <rect x="310" y="70" width="38" height="38" rx="8" fill="url(#grad1)" filter="url(#glow)" />
            <path d="M 327 82 L 327 98 M 319 90 L 327 82 L 335 90" stroke="#031226" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="140" cy="165" r="40" fill="rgba(93,208,255,0.12)" stroke="rgba(93,208,255,0.6)" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 140 145 L 140 175 M 128 163 L 140 175 L 152 163" stroke="rgba(93,208,255,1)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="190" y="150" width="150" height="35" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="205" y="167" fill="rgba(230,238,248,0.9)" fontSize="13" fontFamily="system-ui" fontWeight="600">📄 document.pdf</text>
            <text x="205" y="180" fill="rgba(167,139,250,0.7)" fontSize="10">2.4 MB</text>
            <rect x="190" y="195" width="150" height="6" rx="3" fill="rgba(93,208,255,0.2)" />
            <rect x="190" y="195" width="98" height="6" rx="3" fill="url(#grad1)" />
            <text x="190" y="215" fill="rgba(93,208,255,0.9)" fontSize="12" fontWeight="600">Subiendo... 65%</text>
            <circle cx="80" cy="240" r="3" fill="rgba(93,208,255,0.5)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="240" r="3" fill="rgba(167,139,250,0.5)">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="320" cy="240" r="3" fill="rgba(93,208,255,0.5)">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
        </svg>,
        <svg key="2" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" className={styles.howPreviewImg} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-label="Vista previa: Configurar criterios">
            <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5dd0ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <filter id="glow2">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <rect x="40" y="25" width="320" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.4)" strokeWidth="2" />
            <text x="60" y="58" fill="url(#grad2)" fontSize="18" fontFamily="system-ui" fontWeight="700">Criterios de evaluación</text>
            <rect x="60" y="75" width="280" height="42" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(93,208,255,0.15)" strokeWidth="1.5" />
            <text x="78" y="101" fill="rgba(230,238,248,0.85)" fontSize="14" fontFamily="system-ui" fontWeight="500">Claridad de respuesta</text>
            <circle cx="310" cy="96" r="10" fill="rgba(93,208,255,0.15)" stroke="rgba(93,208,255,0.7)" strokeWidth="2.5" />
            <circle cx="310" cy="96" r="5" fill="url(#grad2)" filter="url(#glow2)" />
            <rect x="60" y="127" width="280" height="42" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(93,208,255,0.15)" strokeWidth="1.5" />
            <text x="78" y="153" fill="rgba(230,238,248,0.85)" fontSize="14" fontFamily="system-ui" fontWeight="500">Uso de ejemplos</text>
            <circle cx="310" cy="148" r="10" fill="rgba(93,208,255,0.15)" stroke="rgba(93,208,255,0.7)" strokeWidth="2.5" />
            <circle cx="310" cy="148" r="5" fill="url(#grad2)" filter="url(#glow2)" />
            <rect x="60" y="179" width="280" height="42" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(93,208,255,0.15)" strokeWidth="1.5" />
            <text x="78" y="205" fill="rgba(230,238,248,0.85)" fontSize="14" fontFamily="system-ui" fontWeight="500">Ortografía y gramática</text>
            <circle cx="310" cy="200" r="10" fill="rgba(93,208,255,0.15)" stroke="rgba(93,208,255,0.7)" strokeWidth="2.5" />
            <rect x="60" y="238" width="200" height="25" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(167,139,250,0.2)" strokeWidth="1.5" />
            <text x="78" y="256" fill="rgba(167,139,250,0.9)" fontSize="13" fontWeight="600">⚙️ Ponderación total: 100%</text>
            <rect x="270" y="240" width="70" height="10" rx="5" fill="rgba(255,255,255,0.06)" />
            <rect x="270" y="240" width="70" height="10" rx="5" fill="url(#grad2)" />
        </svg>,
        <svg key="3" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" className={styles.howPreviewImg} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-label="Vista previa: Feedback detallado">
            <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5dd0ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <filter id="glow3">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <rect x="35" y="25" width="330" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.4)" strokeWidth="2" />
            <rect x="55" y="45" width="290" height="48" rx="10" fill="rgba(93,208,255,0.1)" stroke="rgba(93,208,255,0.3)" strokeWidth="1.5" />
            <text x="75" y="73" fill="rgba(230,238,248,0.95)" fontSize="16" fontFamily="system-ui" fontWeight="700">Estudiante: Ana García</text>
            <rect x="315" y="58" width="32" height="24" rx="6" fill="url(#grad3)" filter="url(#glow3)" />
            <text x="323" y="75" fill="#031226" fontSize="14" fontWeight="800">8.5</text>
            <rect x="55" y="108" width="290" height="36" rx="8" fill="rgba(255,255,255,0.03)" />
            <circle cx="73" cy="126" r="7" fill="rgba(93,208,255,0.2)" stroke="rgba(93,208,255,0.8)" strokeWidth="2" />
            <path d="M 70 126 L 72 128 L 76 123" stroke="rgba(93,208,255,1)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="88" y="131" fill="rgba(230,238,248,0.85)" fontSize="12" fontFamily="system-ui">Excelente estructura argumentativa</text>
            <rect x="55" y="152" width="290" height="36" rx="8" fill="rgba(255,255,255,0.03)" />
            <circle cx="73" cy="170" r="7" fill="rgba(167,139,250,0.2)" stroke="rgba(167,139,250,0.8)" strokeWidth="2" />
            <text x="70" y="176" fill="rgba(167,139,250,1)" fontSize="12" fontWeight="800">!</text>
            <text x="88" y="175" fill="rgba(230,238,248,0.85)" fontSize="12" fontFamily="system-ui">Podría incluir más ejemplos prácticos</text>
            <rect x="55" y="196" width="290" height="36" rx="8" fill="rgba(255,255,255,0.03)" />
            <circle cx="73" cy="214" r="7" fill="rgba(93,208,255,0.2)" stroke="rgba(93,208,255,0.8)" strokeWidth="2" />
            <path d="M 70 214 L 72 216 L 76 211" stroke="rgba(93,208,255,1)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="88" y="219" fill="rgba(230,238,248,0.85)" fontSize="12" fontFamily="system-ui">Buena ortografía y presentación</text>
            <rect x="55" y="242" width="290" height="28" rx="8" fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" />
            <text x="65" y="261" fill="rgba(167,139,250,0.95)" fontSize="11" fontFamily="system-ui" fontWeight="600">💡 Recomendación: Amplía con casos de estudio reales</text>
        </svg>,
        <svg key="4" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" className={styles.howPreviewImg} style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0f1420 50%, #141824 100%)' }} aria-label="Vista previa: Analíticas">
            <defs>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5dd0ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <filter id="glow4">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <rect x="35" y="25" width="330" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(93,208,255,0.4)" strokeWidth="2" />
            <text x="55" y="58" fill="url(#grad4)" fontSize="18" fontFamily="system-ui" fontWeight="700">Rendimiento de la clase</text>
            <rect x="55" y="68" width="290" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
            <rect x="55" y="68" width="218" height="5" rx="2.5" fill="url(#grad4)" />
            <rect x="55" y="90" width="140" height="30" rx="8" fill="rgba(93,208,255,0.08)" stroke="rgba(93,208,255,0.25)" strokeWidth="1.5" />
            <text x="70" y="111" fill="rgba(230,238,248,0.8)" fontSize="12" fontFamily="system-ui">Promedio general:</text>
            <text x="155" y="112" fill="url(#grad4)" fontSize="18" fontWeight="800" filter="url(#glow4)">7.8</text>
            <rect x="55" y="135" width="130" height="100" rx="10" fill="rgba(93,208,255,0.06)" stroke="rgba(93,208,255,0.2)" strokeWidth="1.5" />
            <text x="70" y="155" fill="rgba(230,238,248,0.7)" fontSize="11" fontWeight="600">Distribución</text>
            <rect x="70" y="195" width="20" height="28" rx="3" fill="rgba(93,208,255,0.4)" />
            <rect x="95" y="175" width="20" height="48" rx="3" fill="rgba(93,208,255,0.6)" />
            <rect x="120" y="160" width="20" height="63" rx="3" fill="url(#grad4)" filter="url(#glow4)" />
            <rect x="145" y="180" width="20" height="43" rx="3" fill="rgba(167,139,250,0.5)" />
            <text x="68" y="231" fill="rgba(230,238,248,0.5)" fontSize="8">5-6</text>
            <text x="93" y="231" fill="rgba(230,238,248,0.5)" fontSize="8">7-8</text>
            <text x="116" y="231" fill="rgba(230,238,248,0.5)" fontSize="8">9-10</text>
            <text x="145" y="231" fill="rgba(230,238,248,0.5)" fontSize="8">&lt;5</text>
            <rect x="205" y="135" width="140" height="40" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(93,208,255,0.15)" strokeWidth="1.5" />
            <text x="220" y="160" fill="rgba(93,208,255,0.9)" fontSize="13" fontWeight="600">📈 Mejora: +12%</text>
            <rect x="205" y="185" width="140" height="40" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(167,139,250,0.15)" strokeWidth="1.5" />
            <text x="220" y="210" fill="rgba(167,139,250,0.9)" fontSize="13" fontWeight="600">✓ 89% aprobados</text>
            <circle cx="90" cy="255" r="5" fill="rgba(93,208,255,0.6)" />
            <text x="102" y="260" fill="rgba(230,238,248,0.7)" fontSize="10">Alta participación</text>
            <circle cx="235" cy="255" r="5" fill="rgba(167,139,250,0.6)" />
            <text x="247" y="260" fill="rgba(230,238,248,0.7)" fontSize="10">Necesita apoyo</text>
        </svg>
    ];

    return (
        <div className={styles.howVideoContent}>
            <div className={styles.howStepStage}>
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className={`${styles.howStepCard} ${i === stepIdx ? styles.howStepActive : styles.howStepHidden}`}
                        aria-hidden={i !== stepIdx}
                    >
                        <div className={styles.processStep}>
                            <div className={styles.stepNumberLarge}>{step.number}</div>
                            <div className={styles.stepContentLarge}>
                                <h3 className={styles.stepTitleLarge}>{step.title}</h3>
                                <p className={styles.stepDescLarge}>{step.desc}</p>
                            </div>
                        </div>
                        <div className={styles.howStepVisual} aria-hidden>
                            {illustrations[i]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HowItWorks({ t }) {
    const [mounted, setMounted] = useState(false);
    const howRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="how" className={styles.section} aria-labelledby="how-title">
            <div className={styles.sectionHeader}>
                <span className={`${styles.sectionKicker} ${styles.reveal} ${styles.delay100}`}>{t.how.kicker}</span>
                <h2 id="how-title" className={`${styles.sectionTitle} ${styles.reveal} ${styles.delay200}`}>{t.how.title}</h2>
                <p className={`${styles.sectionSubtitle} ${styles.reveal} ${styles.delay300}`}>
                    {t.how.subtitle}
                </p>
            </div>

            {mounted ? (
                <div className={`${styles.howVideo} ${styles.reveal} ${styles.revealVisible} ${styles.delay400}`} ref={howRef}>
                    <div className={styles.howVideoStage}>
                        <VideoSteps steps={t.how.steps} />
                    </div>
                </div>
            ) : (
                <div className={styles.howFallback}>
                    {/* El respaldo también puede usar VideoSteps pero tal vez estático. Por ahora reutilizamos el mismo componente */}
                    <VideoSteps steps={t.how.steps} />
                </div>
            )}
        </section>
    );
}
