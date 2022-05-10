import requestBase from './requestBase'

const signupUser = {

    post: async (body) => {    
        try {
            const result = await requestBase().post('/signup-user', body )
            const data = result.data            
            if ( !data.error ) return data 
            else { return { error: true}}            
        } catch(error) {
            return { error: true }
        } 
    },
    // put: async (payload) => {
    //     try {
    //         const result = await requestBase().put(`/clients/`, {payload} )
    //         const data = result.data            
    //         if ( !data.error ) return data 
    //         else { return { error: true}}            
    //     } catch(error) {
    //         return { error: true }
    //     } 
    // },    
}

export default signupUser