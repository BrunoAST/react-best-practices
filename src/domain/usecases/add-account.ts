import { AccountModel } from 'domain/models/account-model';

/*
  Type alias
  The namespace must have the same name as the interface, inside the alias we can define the 
  type used to represent the interface. If in the future we want to change the type of the interface,
  we just need to update the alias. All the code that uses the interface will be automatically updated
  with the new type.
  Normally, when we implement the interface we also need to call its types.
  To access the type alias we call the name of the interface followed by the type name.
*/
export namespace AddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }

  export type Model = AccountModel;
}

export interface AddAccount {
  add(params: AddAccount.Params): Promise<AddAccount.Model>;
}
