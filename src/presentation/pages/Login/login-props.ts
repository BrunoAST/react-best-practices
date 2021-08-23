import {Validation} from "../../protocols/validation";
import {Authentication} from "../../../domain/usecases/authentication";
import {SaveAccessToken} from "../../../domain/usecases/save-access-token";

export type Props = {
    validation: Validation;
    authentication: Authentication;
    saveAccessToken: SaveAccessToken
}
