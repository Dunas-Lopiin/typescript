import { APIResponse, Owner, Account } from '../models';
import { OwnerDataValidator } from '../validators';
import { ExceptionTreatment } from "../utils";
import { OwnerTable } from '../client/dao/postgres/owner_and_account';
import { AccountTable } from '../client/dao/postgres/account';
import { SearchOwner } from '../client/dao/postgres/search_owner';
import { GenerateAccount } from '../utils';

import { v4 } from 'uuid';

class CreateOwnerService{

    private ownerDataValidator = OwnerDataValidator;
    private ownerTable = OwnerTable;
    private accountTable = AccountTable;


    public async execute(owner: Owner): Promise<APIResponse> {

        try{
            let insertOwner;
            const validOwnerData = new this.ownerDataValidator(owner);
            const newAccount = GenerateAccount(owner.cpf);

            if(validOwnerData.errors){
                throw new Error(`400: ${validOwnerData.errors}`);
            }

            validOwnerData.owner.id = v4();
            const searchOwner = await SearchOwner(owner.cpf);
            console.log(searchOwner);
            if(!searchOwner){
                console.log('insertOwner');
                insertOwner = await new this.ownerTable().insert(validOwnerData.owner as Owner, newAccount as Account);
            }
            else{
                insertOwner = await new this.accountTable().insert(newAccount as Account);
                validOwnerData.owner.id = searchOwner;
            }

            if(insertOwner){
                return {
                    data: {owner: validOwnerData.owner,
                    account: newAccount},
                    messages: []
                    
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "an error occurred while creating the owner" ]
            } as APIResponse;

        }
        catch(error){
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while inserting owner on database"
            );
        }        
    }
}

export { CreateOwnerService };