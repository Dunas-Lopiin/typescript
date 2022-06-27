import { APIResponse, Balance } from '../models';
import { BalanceDataValidator } from '../validators';
import { ExceptionTreatment } from "../utils";
import { CheckBalance } from '../client/dao/postgres/balance';


class SearchBalanceService{

    private balanceDataValidator = BalanceDataValidator;
    private balanceTable = CheckBalance;

    public async execute(balance: Balance): Promise<APIResponse> {

        try{
            const validBalanceData = new this.balanceDataValidator(balance);

            if(validBalanceData.errors){
                throw new Error(`400: ${validBalanceData.errors}`);
            }

            const searchBalance = await this.balanceTable(balance.ownerCpf, balance.password, balance.agency, balance.agencyDigit, balance.account, balance.accountDigit);
            console.log(searchBalance);

            if(searchBalance){
                return {
                    data: searchBalance,
                    messages: []
                    
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "an error occurred while searching for the account" ]
            } as APIResponse;

        }
        catch(error){
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while searching for the account"
            );
        }        
    }
}

export { SearchBalanceService };