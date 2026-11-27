import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import TextSizeControl, { type TextSizeProps } from "./TextSizeControl";
import styles from "./Navbar.module.css";
import shieldLogo from "../assets/shield.svg";

interface NavbarProps extends TextSizeProps {
  backTo?: string;
  backLabel?: string;
  children?: ReactNode;
  className?: string;
}

export default function Navbar({
  backTo,
  backLabel = "Takaisin aiheisiin",
  children,
  className = "",
  ...textSizeProps
}: NavbarProps) {
  return (
    <nav className={`${styles.nav} ${className}`} aria-label="Päänavigaatio">
      <Link to="/" className={styles.brand}>
        <img
          className={styles.brandLogo}
          src={shieldLogo}
          alt=""
          width="48"
          height="48"
        />
        <span>Turvassa Verkossa</span>
      </Link>
      <div className="nav-actions">
        {backTo && (
          <Link to={backTo}>
            <span aria-hidden="true">←&nbsp;</span>
            {backLabel}
          </Link>
        )}
        <TextSizeControl {...textSizeProps} />
        {children}
      </div>
    </nav>
  );
}
