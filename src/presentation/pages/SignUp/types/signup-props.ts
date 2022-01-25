import { Validation } from "../../../protocols/validation";
import { AddAccount } from "../../../../domain/usecases/add-account";

export type SignUpProps = {
  validation: Validation;
  addAccount: AddAccount;
};
