import requestBase from './requestBase'

const priceList = {
    get: async () => {    
        try {
            const result = await requestBase().get('/price-manager')
            const data = result.data            
            if ( data.priceList ) return data.priceList 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    post: async (body) => {    
        try {
            const result = await requestBase().post('/price-manager', body)
            const data = result.data            
            if ( data.priceList ) return data.priceList 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    put: async (body) => {    
        try {
            const result = await requestBase().put('/price-manager', body )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    }
}

export default priceList