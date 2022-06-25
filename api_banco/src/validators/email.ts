class EmailValidator{

    public email: string;
    public errors: string;

    private regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;

    public constructor(email: string){
        this.errors = '';
        this.email = this.validation(email);
    }

    private validation(email:string): string{

        if(email.length === 0){
            this.errors += 'email:email required|';
            return '';
        }

        if(!this.regex.test(email)){
            this.errors += 'email:this email is invalid|';
            return '';
        }

        return email.trim();
    }
}

export {EmailValidator};