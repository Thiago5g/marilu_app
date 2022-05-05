import requestBase from './requestBase'

const getProduct = {
    get: async (table) => {
        try {
            const result = await requestBase().get(`/products/${table ? table : ''}`)
            const data = result.data
            if (data.productList) return data.productList
            else { return { error: true } }
        } catch (error) {
            return { error: true }
        }
    },   
}
export default getProduct

