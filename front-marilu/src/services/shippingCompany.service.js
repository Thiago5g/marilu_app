import requestBase from './requestBase'

const getShippingCompany = async () => {    
        try {
            const result = await requestBase().get('/shipping-company')
            const data = result.data            
            if ( data.shippingCompanyList ) return data.shippingCompanyList 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }            
        } 
}
export default getShippingCompany