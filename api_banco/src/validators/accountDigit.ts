class AccountDigitValidator{

    public accountDigit: string;
    public errors: string;

    constructor(accountDigit: string){
        this.errors = '';
        this.accountDigit = this.validation(accountDigit);
    }

    private validation(accountDigit: string): string {
        if(!accountDigit){
            this.errors += 'account digit:account digit required|';
            return '';
        }

        if(accountDigit.trim().length !== 1){
            this.errors += 'account digit:account digit is a single number|';
            return '';
        }
        if(!accountDigit.trim){
            this.errors += 'account digit:the account digit cannot be only spaces|';
            return '';
        }
        if(isNaN(parseInt(accountDigit))){
            this.errors += 'account digit:the account digit should be a number|';
            return '';
        }

        return accountDigit.trim();
    }
}

export {AccountDigitValidator};