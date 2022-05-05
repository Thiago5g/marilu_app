import requestBase from './requestBase'

const orderService = {
    get: async (cnpjoucpf) => {    
        try {
            const result = await requestBase().get('/order?id='+cnpjoucpf)
            const data = result.data            
            if ( data.list ) return data.list 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    delete: async (id) => {    
        try {
            const result = await requestBase().delete(`/order/${id}` )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
}

export default orderService