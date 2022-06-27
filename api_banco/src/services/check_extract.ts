import { APIResponse, Extract } from '../models';
import { ExtractDataValidator } from '../validators';
import { ExceptionTreatment } from "../utils";
import { CheckExtract } from '../client/dao/postgres/extract';


class SearchExtractService{

    private extractDataValidator = ExtractDataValidator;
    private extractTable = CheckExtract;

    public async execute(extract: Extract): Promise<APIResponse> {

        try{
            const validExtractData = new this.extractDataValidator(extract);

            if(validExtractData.errors){
                throw new Error(`400: ${validExtractData.errors}`);
            }

            const searchExtract = await this.extractTable(extract.ownerCpf, extract.password, extract.agency, extract.agencyDigit, extract.account, extract.accountDigit);
            console.log(searchExtract);

            if(searchExtract){
                return {
                    data: searchExtract,
                    messages: []
                    
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "an error occurred while searching for the extract" ]
            } as APIResponse;

        }
        catch(error){
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while searching for the extract2"
            );
        }        
    }
}

export { SearchExtractService };