class PasswordValidator{

    public password: string;
    public errors: string;

    constructor(password: string){
        this.errors = '';
        this.password = this.validation(password);
    }

    private validation(password: string): string {
        if(!password){
            this.errors += 'password:password required|';
            return '';
        }

        if(password.trim().length < 4){
            this.errors += 'password:password too short|';
            return '';
        }
        if(!parseInt(password)){
            this.errors += 'password:the password should be a number|';
            return '';
        }
        if(!password.trim){
            this.errors += 'password:the password cannot be only spaces|';
            return '';
        }

        return password.trim();
    }
}

export {PasswordValidator};