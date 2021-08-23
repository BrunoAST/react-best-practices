import {Validation} from "../../../protocols/validation";
import {AddAccount} from "../../../../domain/usecases/add-account";
import {SaveAccessToken} from "../../../../domain/usecases/save-access-token";

export type SignUpProps = {
    validation: Validation;
    addAccount: AddAccount;
    saveAccessToken: SaveAccessToken;
}
