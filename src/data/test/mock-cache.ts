import { GetStorage } from "data/protocols/cache/get-storage";
import faker from "faker";

export class GetStorageSpy implements GetStorage {
  public key: string;
  public value: any = faker.random.objectElement();

  get(key: string): any {
    this.key = key;
    return this.value;
  }
}
