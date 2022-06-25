class NameValidator{

    public errors: string;
    public name: string;

    public constructor(name: string){
        this.errors = '';
        this.name = this.validation(name);
    }

    private validation(name: string): string {
        if(!name){
            this.errors += 'name:name required|';
            return '';
        }

        if(name.trim().length < 3){
            this.errors += 'name:name too short|';
            return '';
        }

        if(name.length > 60){
            this.errors += 'name:name too long|';
        }

        if(!name.trim()){
            this.errors += 'name:the name cannot be only spaces|';
            return '';
        }

        return name.trim();
    }
}

export {NameValidator};