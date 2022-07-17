import {Account} from '../models';
import {v4} from 'uuid';

function GenerateAccount(cpf: string){

    const accountId = v4();
    const password = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
    const agency = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
    const agencyDigit = String(Math.floor(Math.random() * (9 - 1) + 1));
    const newAccount = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
    const accountDigit = String(Math.floor(Math.random() * (9 - 1) + 1));
    const balance = String(Math.floor(Math.random() * (9000 - 1000) + 1000));;
    const accountData: Partial<Account> = {
        id: accountId,
        ownerCpf: cpf,
        password: password,
        account: newAccount,
        accountDigit: accountDigit,
        agency: agency,
        agencyDigit: agencyDigit,
        balance: balance
    }


    return accountData;
    
}

export { GenerateAccount };    
