import { AccountModel } from 'domain/models/account-model';

type AutenticationParams = {
    email: string;
    password: string;
}

export interface Authentication {
    auth(params: AutenticationParams): Promise<AccountModel>;
}
