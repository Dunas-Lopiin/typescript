import { Request, Response } from 'express';
import { SearchExtractService } from '../services';
import { CreateResponse } from '../utils';

class SearchExtract{

    private extractService = SearchExtractService;
    private createResponse = CreateResponse;

    public async handle(req: Request, res: Response){

        try{
            const response = await new this.extractService().execute(req.body);
            this.createResponse.success(res, 201, response);
        }
        catch(err){
            this.createResponse.error(res, err as Error);
        }
    }
}

export { SearchExtract };