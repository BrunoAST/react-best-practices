import { Validation } from "../../../protocols/validation";
import { AddAccount } from "../../../../domain/usecases/add-account";
import { UpdateCurrentAccount } from "../../../../domain/usecases/update-current-account";

export type SignUpProps = {
    validation: Validation;
    addAccount: AddAccount;
    updateCurrentAccount: UpdateCurrentAccount;
}
