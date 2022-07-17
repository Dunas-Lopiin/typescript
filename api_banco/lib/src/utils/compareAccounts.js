"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareAccounts = void 0;
function compareAccounts(cpf1, cpf2, account1, account2, accountD1, accountD2, agency1, agency2, agencyD1, agencyD2) {
    let cpfs = false;
    let accounts = false;
    let accountsD = false;
    let agencies = false;
    let agenciesD = false;
    if (cpf1 === cpf2) {
        cpfs = true;
    }
    if (account1 === account2) {
        accounts = true;
    }
    if (accountD1 === accountD2) {
        accountsD = true;
    }
    if (agency1 === agency2) {
        agencies = true;
    }
    if (agencyD1 === agencyD2) {
        agenciesD = true;
    }
    if (cpfs && accounts && accountsD && agencies && agenciesD) {
        return true;
    }
    return false;
}
exports.compareAccounts = compareAccounts;
