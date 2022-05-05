import requestBase from './requestBase'

const signupClient = {

    post: async (body) => {    
        try {
            const result = await requestBase().post('/signupClient', body )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    put: async (payload) => {
        try {
            const result = await requestBase().put(`/clients/`, {payload} )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },    
}

export default signupClient