class ValueValidator{
    public errors: string;
    public value: string;

    public constructor(value: string){
        this.errors = '';
        this.value = this.validation(value);
    }

    private validation(value: string): string{
        if(!value){
            this.errors += 'value:value required|';
            return '';
        }
        if(!value.trim()){
            this.errors += 'value:the value cannot be only spaces|';
            return '';
        }

        if(!parseFloat(value)){
            this.errors += 'value:the value should be composed of numbers only|';
            return '';
        }

        if(parseFloat(value) < 0){
            this.errors += 'value:the value should be a positive number|';
            return '';
        }

        return value;
    }
}

export {ValueValidator};