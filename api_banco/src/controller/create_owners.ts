import { Request, Response } from 'express';
import { CreateOwnerService } from '../services';
import { CreateResponse } from '../utils';

class CreateOwner{

    private ownerService = CreateOwnerService;
    private createResponse = CreateResponse;

    public async handle(req: Request, res: Response){

        try{

            const response = await new this.ownerService().execute(req.body);
            this.createResponse.success(res, 201, response);

        }
        catch(err){
            this.createResponse.error(res, err as Error);
        }
    }
}

export { CreateOwner };