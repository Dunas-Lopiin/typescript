import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, BalanceValidator, CPFValidator, PasswordValidator } from '.';
import { Account } from '../models';

class AccountDataValidator{

    public account: Partial<Account>;
    public errors: string;

    private accountValidator = AccountValidator;
    private accountDigitValidator = AccountDigitValidator;
    private agencyValidator = AgencyValidator;
    private agencyDigitValidator = AgencyDigitValidator;
    private balanceValidator = BalanceValidator;
    private cpfValidator = CPFValidator;
    private passwordValidator = PasswordValidator;

    public constructor(account: Account){
        this.errors = '';
        this.account = this.validation(account);
    }

    private validation(account: Account): Partial<Account>{

        const validAccount = new this.accountValidator(account.account);
        const validCpf = new this.cpfValidator(account.ownerCpf);
        const validPassword = new this.passwordValidator(account.password);
        const validAcountDigit = new this.accountDigitValidator(account.accountDigit);
        const validAgency = new this.agencyValidator(account.agency);
        const validAgencyDigit = new this.agencyDigitValidator(account.agencyDigit);
        const validBalance = new this.balanceValidator(account.balance);

        this.errors = this.errors.concat(`${validAccount.errors}${validCpf.errors}${validPassword.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}${validBalance.errors}`);

        const accountData: Partial<Account> = {
            account: validAccount.account,
            ownerCpf: validCpf.cpf,
            password: validPassword.password,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit,
            balance: validBalance.balance
        }


        return accountData;
    }
}

export { AccountDataValidator };