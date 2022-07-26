import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');
import bcrypt from 'bcrypt';

async function CheckExtract(cpf: string, password:string, agency: string, agency_digit: string, account: string, account_digit:string){
   
    const clientSelect = new Client();
        
    try{
        console.log('searching');
        await clientSelect.connect();
        console.log('conectado ao banco, pagina de extrato');

        const selectBalanceQuery = `
        SELECT * FROM public.accounts
        WHERE
            owners_cpf=$1 and 
            agency=$2 and 
            agency_digit=$3 and
            account=$4 and
            account_digit=$5
        `;

        const check = await clientSelect.query(selectBalanceQuery, [cpf, agency, agency_digit, account, account_digit]);
        console.log(check.rows[0])
        const compare = bcrypt.compareSync(password, check.rows[0].password);
        console.log(compare)
        if(!compare){
            return false;
        }
        
        const id = check.rows[0].id;
        

        const selectExtractQuery = `
        SELECT * FROM public.extracts
        WHERE
            account_id=$1
            ORDER BY created_at DESC
        `;

        const check2 = await clientSelect.query(selectExtractQuery, [id]);
        const extract = check2.rows;
        const accountInfo = {
            cpf: cpf,
            account: account,
            account_digit: account_digit,
            agency: agency,
            agency_digit: agency_digit
        }
       
        await clientSelect.end();
        
        if (check.rows.length !== 0){
            return {account: accountInfo, extract: extract};
        }

        return false;
    }
    catch (error){
        await clientSelect.end();
        return false;
    }
}

export { CheckExtract };