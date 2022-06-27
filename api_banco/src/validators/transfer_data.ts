import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, ValueValidator, CPFValidator, PasswordValidator } from '.';
import { Transfer } from '../models';

class TransferDataValidator{

    public transfer: Partial<Transfer>;
    public errors: string;
    
    private cpfValidator = CPFValidator;
    private passwordValidator = PasswordValidator;
    private agencyValidator = AgencyValidator;
    private agencyDigitValidator = AgencyDigitValidator;
    private accountValidator = AccountValidator;
    private accountDigitValidator = AccountDigitValidator;
    private valueValidator = ValueValidator;

    public constructor(transfer: Transfer){
        this.errors = '';
        this.transfer = this.validation(transfer);
    }

    private validation(transfer: Transfer): Partial<Transfer>{
        
        const validOwnerCpf = new this.cpfValidator(transfer.ownerCpf);
        const validOwnerPassword = new this.passwordValidator(transfer.ownerPassword);
        const validOwnerAgency = new this.agencyValidator(transfer.ownerAgency);
        const validOwnerAgencyDigit = new this.agencyDigitValidator(transfer.ownerAgencyDigit);
        const validOwnerAccount = new this.accountValidator(transfer.ownerAccount);
        const validOwnerAcountDigit = new this.accountDigitValidator(transfer.ownerAccountDigit);
        const validTransferCpf = new this.cpfValidator(transfer.ownerCpf);
        const validTransferAgency = new this.agencyValidator(transfer.transferAgency);
        const validTransferAgencyDigit = new this.agencyDigitValidator(transfer.transferAgencyDigit);
        const validTransferAccount = new this.accountValidator(transfer.transferAccount);
        const validAcountDigit = new this.accountDigitValidator(transfer.transferAccountDigit);
        const validValue = new this.valueValidator(transfer.value);

        this.errors = this.errors.concat(`${validOwnerCpf.errors}${validOwnerPassword.errors}${validOwnerAgency.errors}${validOwnerAgencyDigit.errors}${validOwnerAccount.errors}${validOwnerAcountDigit.errors}${validTransferCpf.errors}${validTransferAgency.errors}${validTransferAgencyDigit.errors}${validTransferAccount.errors}${validAcountDigit.errors}${validValue.errors}`);

        const transferData: Partial<Transfer> = {
            ownerCpf: validOwnerCpf.cpf,
            ownerPassword: validOwnerPassword.password,
            ownerAgency: validOwnerAgency.agency,
            ownerAgencyDigit: validOwnerAgencyDigit.agencyDigit,
            ownerAccount: validOwnerAccount.account,
            ownerAccountDigit: validOwnerAcountDigit.accountDigit,
            transferCpf: validTransferCpf.cpf,
            transferAgency: validTransferAgency.agency,
            transferAgencyDigit: validTransferAgencyDigit.agencyDigit,
            transferAccount: validTransferAccount.account,
            transferAccountDigit: validAcountDigit.accountDigit,
            value: validValue.value
        }

        return transferData;
    }
}

export { TransferDataValidator };