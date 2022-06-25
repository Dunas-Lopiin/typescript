class CPFValidator{
    public errors: string;
    public cpf: string;

    private regex = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm;

    public constructor(cpf: string){
        this.errors = '';
        this.cpf = this.validation(cpf);
    }

    private validation(cpf: string): string{
        
        if(cpf.length === 0){
            this.errors += 'cpf:cpf required|';
            return '';
        }

        if(!this.regex.test(cpf)){
            this.errors += 'cpf:cpf invalid|';
            return '';
        }
        
        return cpf.trim();
    }
}

export {CPFValidator};