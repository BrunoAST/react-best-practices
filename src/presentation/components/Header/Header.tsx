import React, { memo, useContext } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../Logo/Logo";
import Styles from "./header.module.scss";
import ApiContext from "../../context/api/api-context";
import { ROUTES } from "../../../main/Router/constants/routes.const";

const Header: React.FC = () => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    setCurrentAccount(null);
    history.replace(ROUTES.LOGIN);
  }

  return (
    <header className={Styles.headerWrapper}>
      <div className={Styles.headerWrapper__content}>
        <Logo />
        <div className={Styles.logoutWrapper}>
          <span>Rodrigo</span>
          <a data-testid="logout" href="#" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
