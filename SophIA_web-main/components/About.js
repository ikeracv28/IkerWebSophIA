
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function About({ t }) {
    // Usar rutas relativas para Next.js Image
    const team = [
        { ...t.about.team[0], img: '/img/guillermo.jpeg', linkedin: 'https://www.linkedin.com/in/guillermo-fer/' },
        { ...t.about.team[1], img: '/img/samuel.jpeg', linkedin: 'https://www.linkedin.com/in/samuel-garcia-dura-6aaa00226/' },
        { ...t.about.team[2], img: '/img/juan.jpeg', linkedin: 'https://www.linkedin.com/in/juan-leal-aliaga/' }
    ];

    return (
        <section id="about" className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={`${styles.sectionKicker} ${styles.reveal} ${styles.delay100}`}>{t.about.kicker}</span>
                <h2 className={`${styles.sectionTitle} ${styles.reveal} ${styles.delay200}`}>{t.about.title}</h2>
                <p className={`${styles.sectionSubtitle} ${styles.reveal} ${styles.delay300}`}>
                    {t.about.subtitle}
                </p>
            </div>

            <div className={styles.aboutBody}>
                <div className={styles.teamRow}>
                    <div className={styles.featuresGrid}>
                        {team.map((member, idx) => (
                            <div key={idx} className={`${styles.featureCard} ${styles.reveal} ${styles.revealScale}`} style={{ transitionDelay: `${(idx + 1) * 150}ms` }}>
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
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.9h5V24H0V8.9zM8.5 8.9h4.8v2.05h.07c.67-1.27 2.31-2.61 4.75-2.61 5.08 0 6.02 3.33 6.02 7.66V24h-5V16.6c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.82 1.9-2.82 3.88V24h-5V8.9z" /></svg>
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
