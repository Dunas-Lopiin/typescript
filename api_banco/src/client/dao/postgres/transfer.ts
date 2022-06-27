import { PostgresDB } from ".";
import { Transfer } from "../../../models";
import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');
import { v4 } from 'uuid';

class TransferTable extends PostgresDB{
    
    public async insert (transfer: Transfer): Promise<Object>{
        const client = new Client();
 
        try{
            await client.connect();
            console.log('conectado ao banco transfer');
            const selectOwnerBalanceQuery = `
            SELECT * FROM public.accounts
            WHERE
                owner_cpf=$1 and 
                agency=$2 and 
                agency_digit=$3 and
                account=$4 and
                account_digit=$5 and
                password=$6

            `;
            const check = await client.query(selectOwnerBalanceQuery, [transfer.ownerCpf, transfer.ownerAgency, transfer.ownerAgencyDigit, transfer.ownerAccount, transfer.ownerAccountDigit, transfer.ownerPassword]);
            console.log('conectado ao banco transfer');
            console.log(check.rows);
            let ownerBalance = check.rows[0];
            let ownerId = ownerBalance.id;
            const selectBalanceQuery = `
            SELECT * FROM public.accounts
            WHERE
                owner_cpf=$1 and 
                agency=$2 and 
                agency_digit=$3 and
                account=$4 and
                account_digit=$5
            `;
            const transferCheck = await client.query(selectBalanceQuery, [transfer.transferCpf, transfer.transferAgency, transfer.transferAgencyDigit, transfer.transferAccount, transfer.transferAccountDigit]);
            let transferBalance = transferCheck.rows[0];
            let transferId = transferBalance.id;
            
            if(!transferId || !ownerId){
                return false;
            }

            let ownerAtualBalance = parseFloat(ownerBalance.balance);
            let transferValue = parseFloat(transfer.value);
            
            let fee = 1;
            let newFee = transferValue + fee;
            let newValue = ownerAtualBalance - newFee;
            
            if(newValue >= 0){
                console.log('entrou')
                
                const insertTransferQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_id, value, created_at) 
                VALUES 
                    ( $1, $2, $3, $4, NOW() ) RETURNING id
                `;
    
                const result = await client.query(insertTransferQuery, [
                    transfer.id,
                    ownerId,
                    '3',
                    -transfer.value
                ]);

                console.log(result.rows)
                if (result.rows.length !== 0){
                    console.log("primeiro ok")
                }

                const insertTransferExtract = `
                INSERT INTO public.extracts
                    (id, account_id, operation_id, value, created_at) 
                VALUES 
                    ( $1, $2, $3, $4, NOW() ) RETURNING id
                `;
                const transferTableId = v4();
    
                const depositResult = await client.query(insertTransferExtract, [
                    transferTableId,
                    transferId,
                    '3',
                    transfer.value
                ]);

                console.log(result.rows)
                if (depositResult.rows.length !== 0){
                    console.log("primeiro ok")
                }

                const insertFeeQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_id, value, created_at) 
                VALUES 
                    ( $1, $2, $3, $4, NOW() ) RETURNING id
                `;

                const passFee = String(fee);
                const feeId = v4();
                
                const feeResult = await client.query(insertFeeQuery, [
                    feeId,
                    ownerId,
                    '5',
                    passFee
                ]);

                console.log(feeResult.rows)
                if (feeResult.rows.length !== 0){
                    console.log("segundo ok")
                } 

                const alterBalanceOwner = `
                UPDATE public.accounts SET balance = balance - $1
                WHERE
                    owner_cpf=$2 and 
                    password=$3 and 
                    agency=$4 and 
                    agency_digit=$5 and
                    account=$6 and
                    account_digit=$7
                    RETURNING balance
                `;
                
                const ownerBalance = await client.query(alterBalanceOwner, [
                    newFee,
                    transfer.ownerCpf,
                    transfer.ownerPassword,
                    transfer.ownerAgency,
                    transfer.ownerAgencyDigit,
                    transfer.ownerAccount,
                    transfer.ownerAccountDigit
                ]);

                const alterBalanceTransfer = `
                UPDATE public.accounts SET balance = balance + $1
                WHERE
                    owner_cpf=$2 and 
                    agency=$3 and 
                    agency_digit=$4 and
                    account=$5 and
                    account_digit=$6
                    RETURNING balance
                `;
                
                const transferBalance = await client.query(alterBalanceTransfer, [
                    newFee,
                    transfer.transferCpf,
                    transfer.transferAgency,
                    transfer.transferAgencyDigit,
                    transfer.transferAccount,
                    transfer.transferAccountDigit
                ]);





                const data = {
                    transfer_out: {
                        id: transferId.id,
                        value:transfer.value,
                        cpf: transfer.ownerCpf,
                        agency: transfer.ownerAgency,
                        agencyDigit: transfer.ownerAgencyDigit,
                        account: transfer.ownerAccount,
                        accountDigit: transfer.ownerAccountDigit
                    },
                    transfer_in: {
                        id: transferTableId,
                        cpf: transfer.ownerCpf,
                        agency: transfer.transferAgency,
                        agencyDigit: transfer.transferAgencyDigit,
                        account: transfer.transferAccount,
                        accountDigit: transfer.transferAccountDigit
                    },
                    fee: {
                        id: feeId,
                        value: passFee
                    }
                }

                await client.end();
        
                    return data;     
            }

            return false;           
        }
        catch (error){
            
            await client.end();
            throw new Error("503: service temporarily unavailable");
        }      
    }
}

export { TransferTable };