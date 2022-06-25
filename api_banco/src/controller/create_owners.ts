import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { CreateOwnerService, CreateAccountService } from '../services';
import { CreateResponse } from '../utils';

class CreateOwner{

    private ownerService = CreateOwnerService;
    private accountService = CreateAccountService;
    private createResponse = CreateResponse;

    public handle(req: Request, res: Response){

        try{

            const response = new this.ownerService().execute(req.body);
            this.createResponse.success(res, 201, response);

        }
        catch(err){
            this.createResponse.error(res, err as Error);
        }
    }
}

export { CreateOwner };