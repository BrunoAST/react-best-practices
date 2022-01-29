import faker from "faker";
import "jest-localstorage-mock";
import { cleanup } from "@testing-library/react";
import { LocalStorageAdapter } from "./local-storage-adapter";
import { AccountModel } from "../../domain/models/account-model";

type SutTypes = {
  sut: LocalStorageAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new LocalStorageAdapter();
  return {
    sut
  };
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(cleanup);

describe("LocalStorageAdapter", () => {
  test("Should call LocalStorage.setItem with correct values", () => {
    const { sut } = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<AccountModel>();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test("Should call LocalStorage.getItem with correct value", () => {
    const { sut } = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<AccountModel>();
    const getItemSpy = jest.spyOn(localStorage, "getItem").mockReturnValueOnce(JSON.stringify(value));
    const object = sut.get(key);
    expect(object).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
