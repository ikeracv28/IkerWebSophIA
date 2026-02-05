import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Trust({ t }) {
    // Force visibility on mount
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const revealClass = `${styles.reveal} ${visible ? styles.revealVisible : ''}`;

    const trustData = [
        { src: '/logos/uc3m.png', alt: 'Universidad Carlos III de Madrid', href: 'https://www.uc3m.es', inverted: false },
        { src: '/logos/eoi.png', alt: 'Escuela de Organización Industrial', href: 'https://www.eoi.es', inverted: false },
        { src: '/logos/fecoma.png', alt: 'FECOMA', href: 'https://fecoma.org', inverted: false },
        { src: '/logos/santander_x.png', alt: 'Santander X', href: 'https://santanderx.com', inverted: false },
        { src: '/logos/imperial.png', alt: 'Imperial College London', href: 'https://www.imperial.ac.uk', inverted: true },
        { src: '/logos/UCL.png', alt: 'University College London', href: 'https://www.ucl.ac.uk', inverted: true, ucl: true },
    ];

    return (
        <section id="trust" className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={`${styles.sectionKicker} ${revealClass} ${styles.delay100}`}>{t.trust.kicker}</span>
                <h2 className={`${styles.sectionTitle} ${revealClass} ${styles.delay200}`}>{t.trust.title}</h2>
                <p className={`${styles.sectionSubtitle} ${revealClass} ${styles.delay300}`}>
                    {t.trust.subtitle}
                </p>
            </div>

            <div className={`${styles.trustWrapper} ${revealClass} ${styles.revealFade} ${styles.delay400}`}>
                <div className={styles.trustTrack}>
                    {/* duplicar secuencia para bucle continuo */}
                    {trustData.concat(trustData).map((item, i) => (
                        <a
                            key={`${item.src}-${i}`}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${t.trust.visit} ${item.alt}`}
                            className={styles.trustLogoLink}
                            style={{ display: 'block', position: 'relative', width: 160, height: 60, flexShrink: 0, margin: '0 30px' }}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                style={{ objectFit: 'contain', filter: item.inverted ? 'brightness(0) invert(1)' : 'none' }}
                                className={item.ucl ? styles.trustUCL : ''}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
