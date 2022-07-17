function compareAccounts(cpf1:string, cpf2:string, account1:string, account2:string, accountD1:string, accountD2:string, agency1:string, agency2:string, agencyD1:string, agencyD2:string){
    let cpfs = false;
    let accounts = false;
    let accountsD = false;
    let agencies = false;
    let agenciesD = false;
    if(cpf1 === cpf2){
        cpfs = true;
    }
    if(account1 === account2){
        accounts = true
    }
    if(accountD1 === accountD2){
        accountsD = true;
    }
    if(agency1 === agency2){
        agencies = true;
    }
    if(agencyD1 === agencyD2){
        agenciesD = true;
    }

    if(cpfs && accounts && accountsD && agencies && agenciesD){
        return true;
    }
    return false
}

export { compareAccounts };    