import {Account} from '../models';
import {v4} from 'uuid';

class GenerateAccount{

    public account: Partial<Account>;



    public constructor(account: Account){
        this.account = this.creation(account);
    }

    private creation(account: Account): Partial<Account>{

/* account.id = v4();
    account.ownerCpf = req.body.ownerCpf;
    account.password = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
    account.agency = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
    account.agencyDigit = String(Math.floor(Math.random() * (9 - 0) + 0));
    account.account = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
    account.accountDigit = String(Math.floor(Math.random() * (9 - 0) + 0));
    account.balance = String(Math.floor(Math.random() * (9000 - 0) + 0)); */

        const accountId = v4();
        const password = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
        const agency = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
        const agencyDigit = String(Math.floor(Math.random() * (9 - 0) + 0));
        const newAccount = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
        const accountDigit = String(Math.floor(Math.random() * (9 - 0) + 0));
        const balance = String(Math.floor(Math.random() * (9000 - 0) + 0));;

        const accountData: Partial<Account> = {
            id: accountId,
            password: password,
            account: newAccount,
            accountDigit: accountDigit,
            agency: agency,
            agencyDigit: agencyDigit,
            balance: balance
        }


        return accountData;
    }
}

export { GenerateAccount };    
