import {SaveAccessToken} from "../../../domain/usecases/save-access-token";
import {SetStorage} from "../../protocols/cache/set-storage";
import {UnexpectedError} from "../../../domain/errors/unexpected-error";

export class LocalSaveAccessToken implements SaveAccessToken {
    constructor(private readonly setStorage: SetStorage) {
    }

    async save(accessToken: string): Promise<void> {
        if (!accessToken) {
            throw new UnexpectedError();
        }
        await this.setStorage.set("accessToken", accessToken);
    }
}
