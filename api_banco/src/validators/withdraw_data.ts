import { AccountDigitValidator, PasswordValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, CPFValidator, ValueValidator } from '.';
import { Withdraw } from '../models';

class WithdrawDataValidator{

    public withdraw: Partial<Withdraw>;
    public errors: string;

    private accountValidator = AccountValidator;
    private passwordValidator = PasswordValidator;
    private accountDigitValidator = AccountDigitValidator;
    private agencyValidator = AgencyValidator;
    private agencyDigitValidator = AgencyDigitValidator;
    private cpfValidator = CPFValidator;
    private valueValidator = ValueValidator;

    public constructor(withdraw: Withdraw){
        this.errors = '';
        this.withdraw = this.validation(withdraw);
    }

    private validation(withdraw: Withdraw): Partial<Withdraw>{

        const validAccount = new this.accountValidator(withdraw.account);
        const validPassword = new this.passwordValidator(withdraw.password);
        const validCpf = new this.cpfValidator(withdraw.ownerCpf);
        const validValue = new this.valueValidator(withdraw.value);
        const validAcountDigit = new this.accountDigitValidator(withdraw.accountDigit);
        const validAgency = new this.agencyValidator(withdraw.agency);
        const validAgencyDigit = new this.agencyDigitValidator(withdraw.agencyDigit);
        this.errors = this.errors.concat(`${validAccount.errors}${validPassword.errors}${validCpf.errors}${validValue.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);

        const withdrawData: Partial<Withdraw> = {
            account: validAccount.account,
            password: validPassword.password,
            ownerCpf: validCpf.cpf,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit,
            value: validValue.value
        }

        return withdrawData;
    }
}

export { WithdrawDataValidator };