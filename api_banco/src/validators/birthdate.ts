class BirthdateValidator{
    public birthdate: string;
    public errors: string;

    public constructor(birthdate: string){
        this.errors = '';
        this.birthdate = this.validation(birthdate);
    }

    private validation(birthdate: string): string {
        if(!birthdate){
            this.errors += 'birthdate:birthdate required|';
            return '';
        }

        if(!new Date(birthdate).getTime()){
            this.errors += 'birthdate:invalid date|';
            return '';
        }
        if(birthdate.length < 10){
            this.errors += 'birthdate:date too short|';
            return '';
        }

        return birthdate.trim();
    }
}

export {BirthdateValidator};