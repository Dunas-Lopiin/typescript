interface Transfer {
    id: string
    ownerCpf: string
    ownerPassword: string
    ownerAgency: string
    ownerAgencyDigit: string
    ownerAccount: string
    ownerAccountDigit: string
    transferCpf: string
    transferAgency: string
    transferAgencyDigit: string
    transferAccount: string
    transferAccountDigit: string
    value: string
    createdAt: string
}

export { Transfer };