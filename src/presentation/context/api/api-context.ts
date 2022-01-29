import { createContext } from "react";
import { AccountModel } from "../../../domain/models/account-model";

type Props = {
  setCurrentAccount?: (accountModel: AccountModel) => void;
  getCurrentAccount?: () => AccountModel;
};

export default createContext<Props>(null);
