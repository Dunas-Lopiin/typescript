import { APIResponse, Transfer } from '../models';
import { TransferDataValidator } from '../validators';
import { ExceptionTreatment } from "../utils";
import { TransferTable } from '../client/dao/postgres/transfer';

import { v4 } from 'uuid';

class CreateTransferService{

    private transferDataValidator = TransferDataValidator;
    private transferTable = TransferTable;

    public async execute(transfer: Transfer): Promise<APIResponse> {

        try{
            const validTransferData = new this.transferDataValidator(transfer);

            if(validTransferData.errors){
                throw new Error(`400: ${validTransferData.errors}`);
            }
            validTransferData.transfer.id = v4();

            const makeTransfer = await new this.transferTable().insert(validTransferData.transfer as Transfer);

            if(makeTransfer){
                return {
                    data: makeTransfer,
                    messages: []
                    
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "an error occurred while making the transaction" ]
            } as APIResponse;

        }
        catch(error){
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while making the transaction"
            );
        }         
    }
}

export { CreateTransferService };