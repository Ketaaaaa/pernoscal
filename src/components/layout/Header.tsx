"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import styles from "./Header.module.css";

const navKeys = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/projects", key: "projects" },
  { href: "/services", key: "services" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <Image
            src="/images/logo/logo-nav-light.png"
            alt="Pernoscal"
            width={160}
            height={40}
            priority
            className={styles.logoLight}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/images/logo/logo-nav-dark.png"
            alt="Pernoscal"
            width={160}
            height={40}
            priority
            className={styles.logoDark}
            style={{ objectFit: "contain" }}
          />
          <span className="srOnly">Pernoscal</span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {navKeys.map(({ href, key }) => (
            <Link key={key} href={href}>
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <ThemeToggle />
          <Button href="/contact" variant="primary" className="hideMobile">
            {tc("getInTouch")}
          </Button>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}>
        <div
          className={styles.drawerPanel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setOpen(false)}
            aria-label="Close">
            <X size={22} />
          </button>
          <nav className={styles.drawerNav} aria-label="Mobile">
            {navKeys.map(({ href, key }) => (
              <Link key={key} href={href} onClick={() => setOpen(false)}>
                {t(key)}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}>
              {tc("getInTouch")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
