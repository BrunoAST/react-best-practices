import { GetStorageSpy } from "../../../data/test/mock-cache";
import { mockGetRequest } from "../../../data/test/mock-http";
import { AuthorizeHttpGetClientDecorator } from "./authorize-http-get-client-decorator";

describe("AuthorizeHttpGetClientDecorator", () => {
  test("Should call GetStorage with correct value", () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe("account");
  });
});
