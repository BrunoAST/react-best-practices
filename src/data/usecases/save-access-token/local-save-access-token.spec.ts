import faker from "faker";
import {LocalSaveAccessToken} from "./local-save-access-token";
import {SetStorageSpy} from "../../test/mock-set-storage";

type SutTypes = {
    localSaveAccessToken: LocalSaveAccessToken;
    setStorageSpy: SetStorageSpy;
}

const makeSut = (): SutTypes => {
    const setStorageSpy = new SetStorageSpy();
    const localSaveAccessToken = new LocalSaveAccessToken(setStorageSpy);
    return {
        localSaveAccessToken,
        setStorageSpy,
    };
}

describe("LocalSaveAccessToken", () => {
    it("Should call SetStorage with correct value", async () => {
        const {localSaveAccessToken, setStorageSpy} = makeSut();
        const accessToken = faker.datatype.uuid();
        await localSaveAccessToken.save(accessToken);
        expect(setStorageSpy.key).toBe("accessToken");
        expect(setStorageSpy.value).toBe(accessToken);
    });
});
