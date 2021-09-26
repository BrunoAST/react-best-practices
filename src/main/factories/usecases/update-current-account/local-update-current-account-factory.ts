import { UpdateCurrentAccount } from "../../../../domain/usecases/update-current-account";
import { LocalUpdateCurrentAccount } from "../../../../data/usecases/update-current-account/local-update-current-account";
import { makeLocalStorageAdapter } from "../../cache/local-storage-adapter-factory";

export function makeLocalUpdateCurrentAccount(): UpdateCurrentAccount {
    return new LocalUpdateCurrentAccount(makeLocalStorageAdapter());
}
