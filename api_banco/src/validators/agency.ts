class AgencyValidator{

    public agency: string;
    public errors: string;

    constructor(agency: string){
        this.errors = '';
        this.agency = this.validation(agency);
    }

    private validation(agency: string): string {
        if(!agency){
            this.errors += 'agency:agency required|';
            return '';
        }

        if(agency.trim().length < 3){
            this.errors += 'agency:agency too short|';
            return '';
        }
        if(!agency.trim){
            this.errors += 'agency:the agency number cannot be only spaces|';
            return '';
        }
        if(!parseInt(agency)){
            this.errors += 'agency:the agency should be a number|';
            return '';
        }

        return agency.trim();
    }
}

export {AgencyValidator};