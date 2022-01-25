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
  it("Should call local storage with correct values", () => {
    const { sut } = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<AccountModel>();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });
});
