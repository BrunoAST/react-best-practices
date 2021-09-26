import { Validation } from "../../../protocols/validation";
import { Authentication } from "../../../../domain/usecases/authentication";
import { UpdateCurrentAccount } from "../../../../domain/usecases/update-current-account";

export type LoginProps = {
    validation: Validation;
    authentication: Authentication;
    updateCurrentAccount: UpdateCurrentAccount
}
