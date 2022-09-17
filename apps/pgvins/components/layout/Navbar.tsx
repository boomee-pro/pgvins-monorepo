import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import { BiSearch, BiDoorOpen, BiX, BiMenu } from "react-icons/bi";

import styles from "@styles/navbar.module.scss";
import { useAuth } from "@contexts/AuthContext";
import toast from "react-hot-toast";

type NavbarLink = {
  label: string;
  href: string;
  space?: boolean;
};

const Navbar = () => {
  const router = useRouter();
  const { logout, user, connected } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navElements: Array<NavbarLink> = [
    { label: "Accueil", href: "/" },
    { label: "Nos Vins", href: "/wines" },
    { label: "Notre histoire", href: "/ourstory" },
    { label: "Spacer", href: "", space: true },
    {
      label: connected ? user.details.firstName : "Se connecter",
      href: connected ? "/account" : "/login",
    },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => setSticky(window.scrollY > 25));
  }, [user]);

  return (
    <header
      className={classNames(styles.navbar, sticky && styles.sticky)}
      id="navbar"
    >
      <div className={styles.background} />
      <div className={styles.content}>
        <h3>
          <Link href="/">PG VINS</Link>
        </h3>
        <nav className={classNames(isOpen && styles.open_menu)}>
          {navElements.map(
            (nav) =>
              nav.label && (
                <Link
                  key={nav.label}
                  href={nav.href}
                  className={classNames(
                    router.pathname === nav.href && styles.activeLink
                  )}
                >
                  {nav.space ? " " : nav.label}
                </Link>
              )
          )}
          <div className={styles.icons}>
            <BiSearch size={24} />
            {connected && (
              <BiDoorOpen
                size={24}
                onClick={() =>
                  logout().then(() => toast.success("Déconnexion réussie"))
                }
              />
            )}
          </div>
          <button
            className={styles.nav_btn_close}
            onClick={() => setIsOpen(false)}
          >
            <BiX size={24} />
          </button>
        </nav>
        <button onClick={() => setIsOpen(true)}>
          <BiMenu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
