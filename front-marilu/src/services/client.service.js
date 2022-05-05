import requestBase from './requestBase'

const getClient = async () => {    
        try {
            const result = await requestBase().get('/clients')
            const data = result.data
            if ( data.clientList ) return data.clientList 
            else { return { error: true}}
        } catch(error) {
            return { error: true }
        } 
}
export default getClient