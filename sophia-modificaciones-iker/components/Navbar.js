import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Navbar({ t, lang, setLang }) {
    const router = useRouter();

    const isActive = (path) => {
        return router.pathname === path ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;
    };

    return (
        <header className={styles.navbar}>
            <div className={styles.navInner}>
                <Link href="/" className={styles.logo}>
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
                        <Link href="/" className={isActive('/')}>
                            {t.nav.home}
                        </Link>
                        <Link href="/features" className={isActive('/features')}>
                            {t.nav.what}
                        </Link>
                        <Link href="/how-it-works" className={isActive('/how-it-works')}>
                            {t.nav.how}
                        </Link>
                        <Link href="/about" className={isActive('/about')}>
                            {t.nav.about}
                        </Link>
                        <Link href="/faq" className={isActive('/faq')}>
                            {t.nav.faq}
                        </Link>
                        <Link href="/demo" className={isActive('/demo')}>
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
