class AgencyDigitValidator{

    public agencyDigit: string;
    public errors: string;

    constructor(agencyDigit: string){
        this.errors = '';
        this.agencyDigit = this.validation(agencyDigit);
    }

    private validation(agencyDigit: string): string {
        if(!agencyDigit){
            this.errors += 'agency digit: agency digit required|';
            return '';
        }

        if(agencyDigit.trim().length !== 1){
            this.errors += 'agency digit: agency digit is a single number|';
            return '';
        }
        if(!agencyDigit.trim){
            this.errors += 'agency digit: the agency digit cannot be only spaces|';
            return '';
        }

        return agencyDigit.trim();
    }
}

export {AgencyDigitValidator};