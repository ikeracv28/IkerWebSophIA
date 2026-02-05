
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Navbar({ t, lang, setLang }) {
    return (
        <header className={styles.navbar}>
            <div className={styles.navInner}>
                <Link href="#home" className={styles.logo}>
                    <div style={{ position: 'relative', width: '32px', height: '32px' }}>
                        <Image
                            src="/logos/sophia.png"
                            alt="SophIA"
                            fill
                            className={styles.logoMark}
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                    <span>SophIA</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <nav className={styles.navLinks}>
                        <Link href="#home" className={styles.navLink}>
                            {t.nav.home}
                        </Link>
                        <Link href="#what" className={styles.navLink}>
                            {t.nav.what}
                        </Link>
                        <Link href="#how" className={styles.navLink}>
                            {t.nav.how}
                        </Link>
                        <Link href="#about" className={styles.navLink}>
                            {t.nav.about}
                        </Link>
                        <Link href="#contact" className={styles.navLink}>
                            {t.nav.contact}
                        </Link>
                    </nav>
                    <div className={styles.langSelector}>
                        <select
                            className={styles.langSelect}
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                        >
                            <option value="es">ES</option>
                            <option value="en">EN</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
}
