import { LocalUpdateCurrentAccount } from "./local-update-current-account";
import { SetStorageMock } from "../../test/mock-set-storage";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { mockAccountModel } from "../../../domain/test/mock-account";

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
}

describe("LocalUpdateCurrentAccount", () => {
  it("Should call SetStorage with correct value", () => {
    const { sut, setStorageMock } = makeSut();
    const account = mockAccountModel();
    sut.save(account);
    expect(setStorageMock.key).toBe("account");
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });

  it("Should throw if SetStorage throws", () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, "set").mockImplementationOnce(() => { throw new Error() });
    const promise = sut.save(mockAccountModel());
    expect(promise).rejects.toThrow(new Error());
  });

  it("Should throw if accessToken is falsy", () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
