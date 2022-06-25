import { APIResponse, Owner } from '../models';
import { OwnerDataValidator } from '../validators';
import { v4 } from 'uuid';

class CreateOwnerService{

    private ownerDataValidator = OwnerDataValidator;

    public execute(owner: Owner): APIResponse{

        const validOwnerData = new this.ownerDataValidator(owner);

        if(validOwnerData.errors){
            throw new Error(`400: ${validOwnerData.errors}`);
        }

        validOwnerData.owner.id = v4();

        return {
            data: validOwnerData.owner,
            messages: []
            
        } as APIResponse;

    }
}

export { CreateOwnerService };