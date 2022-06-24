import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, BalanceValidator } from '.';
import { Account } from '../models';

class AccountDataValidator{

    public account: Partial<Account>;
    public errors: string;

    private accountValidator = AccountValidator;
    private accountDigitValidator = AccountDigitValidator;
    private agencyValidator = AgencyValidator;
    private agencyDigitValidator = AgencyDigitValidator;
    private balanceValidator = BalanceValidator;

    public constructor(account: Account){
        this.errors = '';
        this.account = this.validation(account);
    }

    private validation(account: Account): Partial<Account>{

        const validAccount = new this.accountValidator(account.account);
        const validAcountDigit = new this.accountDigitValidator(account.accountDigit);
        const validAgency = new this.agencyValidator(account.agency);
        const validAgencyDigit = new this.agencyDigitValidator(account.agencyDigit);
        const validBalance = new this.balanceValidator(account.balance);

        this.errors = this.errors.concat(`${validAccount.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}${validBalance.errors}`);

        const accountData: Partial<Account> = {
            account: validAccount.account,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit,
            balance: validBalance.balance
        }


        return accountData;
    }
}

export { AccountDataValidator };