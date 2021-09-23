import React, { memo } from "react";
import Logo from "../Logo/Logo";
import Styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrapper}>
      <div className={Styles.headerWrapper__content}>
        <Logo />
        <div className={Styles.logoutWrapper}>
          <span>Rodrigo</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
