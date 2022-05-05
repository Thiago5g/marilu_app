import requestBase from './requestBase'

const getPaymentType = async () => {    
        try {
            const result = await requestBase().get('/paymentsType')
            const data = result.data            
            if ( data.paymentTypeList ) return data.paymentTypeList 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
}
export default getPaymentType