interface Transfer {
    id: string
    ownerCpf: string
    agency: string
    agencyDigit: string
    account: string
    accountDigit: string
    value: string
    createdAt: string
}

export { Transfer };