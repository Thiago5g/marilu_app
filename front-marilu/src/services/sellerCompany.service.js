import requestBase from './requestBase'

export const getSellerCompany = async () => {    
        try {
            const result = await requestBase().get('/seller-company')
            const data = result.data            
            if ( data.sellerCompanyList ) return data.sellerCompanyList 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }            
        } 
}

export const getAssistentSellerCompany = async () => {    
    try {
        const result = await requestBase().get('/assistent-seller-company')
        const data = result.data            
        if ( data.assistentSellerCompanyList ) return data.assistentSellerCompanyList 
        else { return { error: true}}            
    } catch(error) {
        return { error: true }            
    } 
}