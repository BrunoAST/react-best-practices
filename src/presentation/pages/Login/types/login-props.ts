import { Validation } from "../../../protocols/validation";
import { Authentication } from "../../../../domain/usecases/authentication";

export type LoginProps = {
    validation: Validation;
    authentication: Authentication;
}
