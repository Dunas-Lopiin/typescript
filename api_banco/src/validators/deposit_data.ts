import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, CPFValidator, ValueValidator } from '.';
import { Deposit } from '../models';

class DepositDataValidator{

    public deposit: Partial<Deposit>;
    public errors: string;

    private accountValidator = AccountValidator;
    private accountDigitValidator = AccountDigitValidator;
    private agencyValidator = AgencyValidator;
    private agencyDigitValidator = AgencyDigitValidator;
    private cpfValidator = CPFValidator;
    private valueValidator = ValueValidator;

    public constructor(deposit: Deposit){
        this.errors = '';
        this.deposit = this.validation(deposit);
    }

    private validation(deposit: Deposit): Partial<Deposit>{

        const validAccount = new this.accountValidator(deposit.account);
        const validCpf = new this.cpfValidator(deposit.ownerCpf);
        const validValue = new this.valueValidator(deposit.value);
        const validAcountDigit = new this.accountDigitValidator(deposit.accountDigit);
        const validAgency = new this.agencyValidator(deposit.agency);
        const validAgencyDigit = new this.agencyDigitValidator(deposit.agencyDigit);
        this.errors = this.errors.concat(`${validAccount.errors}${validCpf.errors}${validValue.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);

        const depositData: Partial<Deposit> = {
            account: validAccount.account,
            ownerCpf: validCpf.cpf,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit,
            value: validValue.value
        }

        return depositData;
    }
}

export { DepositDataValidator };