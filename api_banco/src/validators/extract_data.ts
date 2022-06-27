import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, CPFValidator, PasswordValidator } from '.';
import { Extract } from '../models';

class ExtractDataValidator{

    public extract: Partial<Extract>;
    public errors: string;

    private accountValidator = AccountValidator;
    private accountDigitValidator = AccountDigitValidator;
    private agencyValidator = AgencyValidator;
    private agencyDigitValidator = AgencyDigitValidator;
    private cpfValidator = CPFValidator;
    private passwordValidator = PasswordValidator;

    public constructor(extract: Extract){
        this.errors = '';
        this.extract = this.validation(extract);
    }

    private validation(extract: Extract): Partial<Extract>{

        const validAccount = new this.accountValidator(extract.account);
        const validPassword = new this.passwordValidator(extract.password);
        const validCpf = new this.cpfValidator(extract.ownerCpf);
        const validAcountDigit = new this.accountDigitValidator(extract.accountDigit);
        const validAgency = new this.agencyValidator(extract.agency);
        const validAgencyDigit = new this.agencyDigitValidator(extract.agencyDigit);
        this.errors = this.errors.concat(`${validAccount.errors}${validPassword.errors}${validCpf.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);

        const extractData: Partial<Extract> = {
            account: validAccount.account,
            password: validPassword.password,
            ownerCpf: validCpf.cpf,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit
        }

        return extractData;
    }
}

export { ExtractDataValidator };