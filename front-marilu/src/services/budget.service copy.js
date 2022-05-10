import requestBase from './requestBase'

const budgetService = {
    
    get: async (cnpjoucpf) => {
        try {
            const result = await requestBase().get('/budget?id='+cnpjoucpf)
            const data = result.data            
            if ( data.list ) return data.list 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    post: async (body) => {    
        try {
            const result = await requestBase().post('/budget/register', body )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    put: async (payload) => {
        try {
            const result = await requestBase().put(`/budget/`, {payload} )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    delete: async (id) => {    
        try {
            const result = await requestBase().delete(`/budget/${id}` )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    reserve: async (payload) => {    
        try {
            const result = await requestBase().put(`/budget/reserve`, {payload} )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    approve: async (payload) => {    
        try {
            const result = await requestBase().put(`/budget/approve`, {payload} )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    print: async (payload) => {    
        try {
            const result = await requestBase().post(`/budget/print`, {payload} )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
}

export default budgetService