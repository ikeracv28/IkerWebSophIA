import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function About({ t }) {
    // Force visibility on mount
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const revealClass = `${styles.reveal} ${visible ? styles.revealVisible : ''}`;

    // Use relative paths for Next.js Image
    const team = [
        { ...t.about.team[1], img: '/img/guillermo.jpeg', linkedin: 'https://www.linkedin.com/in/guillermo-fer/' },
        { ...t.about.team[2], img: '/img/samuel.jpeg', linkedin: 'https://www.linkedin.com/in/samuel-garcia-dura-6aaa00226/' },
        { ...t.about.team[3], img: '/img/juan.jpeg', linkedin: 'https://www.linkedin.com/in/juan-leal-aliaga/' },
        { ...t.about.team[0], img: '/team/iker.jpg', linkedin: 'https://www.linkedin.com/in/iker-acevedo-donate-a98349336/' }
    ];

    return (
        <section id="about" className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={`${styles.sectionKicker} ${revealClass} ${styles.delay100}`}>{t.about.kicker}</span>
                <h2 className={`${styles.sectionTitle} ${revealClass} ${styles.delay200}`}>{t.about.title}</h2>
                <p className={`${styles.sectionSubtitle} ${revealClass} ${styles.delay300}`}>
                    {t.about.subtitle}
                </p>
            </div>

            <div className={styles.aboutBody}>
                <div className={styles.teamRow}>
                    <div className={styles.teamGrid}>
                        {team.map((member, idx) => (
                            <div key={idx} className={`${styles.featureCard} ${revealClass} ${styles.revealScale}`} style={{ transitionDelay: `${(idx + 1) * 150}ms` }}>
                                <div className={styles.avatarWrap}>
                                    <div className={styles.avatarRing}>
                                        <Image
                                            src={member.img}
                                            alt={member.name}
                                            width={150}
                                            height={150}
                                            className={styles.avatarImg}
                                        />
                                    </div>
                                </div>
                                <h3 className={styles.featureTitle}>{member.name}</h3>
                                <p className={styles.featureDesc}>{member.desc}</p>
                                <div className={styles.teamLinks}>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${member.name}`} className={styles.linkedinLink}>
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.aboutText}>
                    <p>{t.about.text1}</p>
                    <p>{t.about.text2}</p>
                    <p>{t.about.text3}</p>

                    <div className={styles.aboutHighlight} style={{ marginTop: 20 }}>
                        <strong>{t.about.highlight}</strong>
                    </div>
                </div>
            </div>
        </section>
    );
}
