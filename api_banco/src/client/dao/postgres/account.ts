import { Account } from "../../../models";
import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');

class AccountTable {
    
    public async insert (account: Account): Promise<boolean>{
        const client = new Client();
  
        try{
            await client.connect();
            console.log('conectado ao banco, pagina account');

            const insertAccountQuery = `
            INSERT INTO public.accounts
                (id, owners_cpf, password, agency, agency_digit, account, account_digit, balance) 
            VALUES 
                ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id
            `;

            const result = await client.query(insertAccountQuery, [
                account.id,
                account.ownerCpf,
                account.password,
                account.agency,
                account.agencyDigit,
                account.account,
                account.accountDigit,
                account.balance
            ]);
            console.log('operação executada')
            await client.end();
    
            if (result.rows.length !== 0){
                return true;
            }

            return false;           
        }
        catch (error){
            
            await client.end();
            throw new Error("503: service temporarily unavailable");
        }      
    }
}

export { AccountTable };