import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');
import bcrypt from 'bcrypt';

async function CheckBalance(cpf: string, password:string, agency: string, agency_digit: string, account: string, account_digit:string){
   
    const clientSelect = new Client();
        
    try{
        console.log('search');
        await clientSelect.connect();
        console.log('conectado ao banco');

        const selectBalanceQuery = `
        SELECT * FROM public.accounts
        WHERE
            owner_cpf=$1 and 
            agency=$2 and 
            agency_digit=$3 and
            account=$4 and
            account_digit=$5
        `;
        const check = await clientSelect.query(selectBalanceQuery, [cpf, agency, agency_digit, account, account_digit]);
        let balance = check.rows[0];
        const compare = bcrypt.compareSync(password, balance.password);
        await clientSelect.end();
        console.log(compare)
        if (compare){
            return balance;
        }
        return false
    }
    catch (error){
        await clientSelect.end();
        return false;
    }
}

export { CheckBalance };