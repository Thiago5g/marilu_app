import axios from 'axios'
import requestBase from './requestBase'

const authService = {
    get: async () => {
        try {
            const result = await axios.get(process.env.REACT_APP_API_URL + '/budget')
            const data = result.data
            if (data.list.length > 0) return data.list
            else { return { error: true } }
        } catch (error) {
            return { error: true }
        }
    },
    sigIn: async (body) => {
        try {
            const result = await axios.post(process.env.REACT_APP_API_URL + '/auth/sign_in', body)
            const data = result.data
            if (!data.error) return data
            else { return { error: true, data } }
        } catch (error) {
            const parseError = {
                401: 'Email ou senha está incorreto',
                500: 'Servidor está fora. Por favor contate o setor responsável'
            }
            return { error: true, message: parseError[error.response.status] }
        }
    },
    check: async () => {
        try {
            const result = await requestBase().post('/check-session')
            const { data } = result
            if (data.validated) return data.validated
            else { return { error: true } }
        } catch (error) {
            return { error: true }
        }
    }
}

export default authService