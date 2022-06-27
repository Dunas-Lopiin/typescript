import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, CPFValidator, PasswordValidator } from '.';
import { Balance } from '../models';

class BalanceDataValidator{

    public balance: Balance;
    public errors: string;

    private accountValidator = AccountValidator;
    private accountDigitValidator = AccountDigitValidator;
    private agencyValidator = AgencyValidator;
    private agencyDigitValidator = AgencyDigitValidator;
    private cpfValidator = CPFValidator;
    private passwordValidator = PasswordValidator;

    public constructor(balance: Balance){
        this.errors = '';
        this.balance = this.validation(balance);
    }

    private validation(balance: Balance): Balance{

        const validAccount = new this.accountValidator(balance.account);
        const validCpf = new this.cpfValidator(balance.ownerCpf);
        const validPassword = new this.passwordValidator(balance.password);
        const validAcountDigit = new this.accountDigitValidator(balance.accountDigit);
        const validAgency = new this.agencyValidator(balance.agency);
        const validAgencyDigit = new this.agencyDigitValidator(balance.agencyDigit);
        this.errors = this.errors.concat(`${validAccount.errors}${validCpf.errors}${validPassword.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);

        const balanceData: Balance = {
            account: validAccount.account,
            ownerCpf: validCpf.cpf,
            password: validPassword.password,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit
        }

        return balanceData;
    }
}

export { BalanceDataValidator };