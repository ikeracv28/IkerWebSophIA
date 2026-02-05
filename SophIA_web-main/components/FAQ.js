import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function FAQ({ t }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className={styles.section} style={{ paddingBottom: '60px' }}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionKicker}>{t.faq.kicker}</span>
                <h2 className={styles.sectionTitle}>{t.faq.title}</h2>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                {t.faq.items.map((item, idx) => (
                    <div
                        key={idx}
                        style={{
                            marginBottom: '16px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            background: activeIndex === idx ? 'rgba(255,255,255,0.03)' : 'transparent',
                            transition: 'all 0.3s ease',
                            overflow: 'hidden'
                        }}
                    >
                        <button
                            onClick={() => toggleAccordion(idx)}
                            style={{
                                width: '100%',
                                padding: '24px', // Increased padding for breathing room
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start', // Align to top in case of multi-line text
                                gap: '16px', // Clear gap between text and icon
                                background: 'none',
                                border: 'none',
                                color: 'var(--fg)',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textAlign: 'left',
                                lineHeight: '1.4' // Better line height for multi-line questions
                            }}
                        >
                            <span style={{ flex: 1 }}>{item.q}</span>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '2px', // Slight optical adjustment for top alignment
                                transform: activeIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                                opacity: 0.7,
                                flexShrink: 0 // Prevent icon from shrinking
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </span>
                        </button>
                        <div
                            style={{
                                height: activeIndex === idx ? 'auto' : '0',
                                overflow: 'hidden',
                                opacity: activeIndex === idx ? 1 : 0,
                                transition: 'all 0.3s ease',
                                borderTop: activeIndex === idx ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent'
                            }}
                        >
                            <div style={{ padding: '24px', color: 'var(--muted)', lineHeight: '1.6' }}>
                                {item.a}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
