import { Request, Response } from 'express';
import { SearchBalanceService } from '../services';
import { CreateResponse } from '../utils';

class SearchBalance{

    private balanceService = SearchBalanceService;
    private createResponse = CreateResponse;

    public async handle(req: Request, res: Response){

        try{
            const response = await new this.balanceService().execute(req.body);
            this.createResponse.success(res, 201, response);
        }
        catch(err){
            this.createResponse.error(res, err as Error);
        }
    }
}

export { SearchBalance };