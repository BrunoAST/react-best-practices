import { setCurrentAccountAdapter, getCurrentAccountAdapter } from "../current-account-adapter";
import { mockAccountModel } from "../../../domain/test/mock-account";
import { LocalStorageAdapter } from "../../../infra/cache/local-storage-adapter";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";

jest.mock("../../../infra/cache/local-storage-adapter");

describe("CurrentAccountAdapter", () => {
  test("Should call LocalStorageAdapter.set with correct values", () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, "set");
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith("account", account);
  });

  test("Should call LocalStorageAdapter.get with correct values", () => {
    const account = mockAccountModel();
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, "get").mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith("account")
    expect(result).toEqual(account);
  });

  test("Should throw UnexpectedError", () => {
    expect(() => {
      setCurrentAccountAdapter(undefined);
    }).toThrow(new UnexpectedError());
  });
});