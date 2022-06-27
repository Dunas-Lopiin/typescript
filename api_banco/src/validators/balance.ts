class BalanceValidator{
    public errors: string;
    public balance: string;

    public constructor(balance: string){
        this.errors = '';
        this.balance = this.validation(balance);
    }

    private validation(balance: string): string{
        if(!balance){
            this.errors += 'balance:balance required|';
            return '';
        }
        if(!balance.trim()){
            this.errors += 'balance:the balance cannot be only spaces|';
            return '';
        }

        if(!parseFloat(balance)){
            this.errors += 'balance:the balance should be composed of numbers only|';
            return '';
        }

        if(parseFloat(balance) < 0){
            this.errors += 'balance:the balance should be a positive number|';
            return '';
        }

        return balance;
    }
}

export {BalanceValidator};