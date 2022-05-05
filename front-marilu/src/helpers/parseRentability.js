const parseRentability = (product, client) => {

    const { commission, customedio, quantity } = product
    const price = String(product.price).replace(',', '.')
    const { estado: stateClient, contrib } = client

    const statesObject = {
        AC: 16,
        AL: 17,
        AP: 17,
        AM: 17,
        BA: 17,
        CE: 17,
        DF: 17,
        ES: 16,
        GO: 16,
        MA: 17,
        MT: 16,
        MS: 16,
        MG: 17,
        PA: 16,
        PB: 17,
        PR: 17,
        PE: 17,
        PI: 17,
        RR: 16,
        RO: 16.5,
        RJ: 19,
        RN: 17,
        RS: 17,
        SC: 8,
        SP: 17,
        SE: 17,
        TO: 17
    }

    let PerICMS = contrib === '1' ? 3 / 100 : statesObject[stateClient.toUpperCase()] / 100
    let PerCofi = 7.60 / 100
    let PerPis = 1.65 / 100
    let PerDespADm = 5 / 100
    let PerComiss = commission / 100

    let nVendTot = price * quantity

    let ValICMS = nVendTot * PerICMS
    let ValCof = nVendTot * PerCofi
    let ValPis = nVendTot * PerPis

    let ReceitaLiquida = nVendTot - (ValICMS + ValCof + ValPis)
    let CustoMerVend = quantity * customedio

    let ValComiss = nVendTot * PerComiss
    let ValDespADm = nVendTot * PerDespADm

    let LucroIrCs = ReceitaLiquida - (CustoMerVend + ValComiss + ValDespADm)

    // let LucroIrCsUnit = LucroIrCs / quantity

    // let PerLucroBrut = (LucroIrCs / nVendTot) * 100

    let ValIRPJCSLL = LucroIrCs * 0.34

    let ValLucroLiq = LucroIrCs - ValIRPJCSLL

    let PerLucroLiq = (ValLucroLiq / ReceitaLiquida) * 100

    product.rentability = PerLucroLiq
    product.valLucroliq = ValLucroLiq

    return product
}

export default parseRentability