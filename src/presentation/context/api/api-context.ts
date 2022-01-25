import { createContext } from "react";
import { AccountModel } from "../../../domain/models/account-model";

type Props = {
  setCurrentAccount?: (accountModel: AccountModel) => void;
};

export default createContext<Props>(null);
