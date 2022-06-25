class AccountValidator{

    public account: string;
    public errors: string;

    constructor(account: string){
        this.errors = '';
        this.account = this.validation(account);
    }

    private validation(account: string): string {
        if(!account){
            this.errors += 'account:account required|';
            return '';
        }

        if(account.trim().length < 4){
            this.errors += 'account:account too short|';
            return '';
        }
        if(!account.trim){
            this.errors += 'account:the account number cannot be only spaces|';
            return '';
        }
        if(!parseInt(account)){
            this.errors += 'account:the account should be a number|';
            return '';
        }

        return account.trim();
    }
}

export {AccountValidator};