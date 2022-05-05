const getRoles = () => {

    let storage = localStorage.getItem('userData')
    if (storage) {
        storage = JSON.parse(storage)
        const { permissions } = storage
        return permissions
    }
    return null
}

export const isHaveRole = (role) => {

    const roles = getRoles()
    if (roles !== null) {
        const parsedRoles = roles.find(item => item.toLowerCase() === role.toLowerCase());
        return !!parsedRoles
    }
    return null
}

export const getOnlyNumbers = (str) => {
    str = String(str)
    let res = str.replace(/\D/g, "")
    return res
}

export const maskMoney = (numeros) => {
    numeros = String(numeros)
    numeros = numeros.replace(/\D/g, "");
    numeros = numeros.replace(/(\d+)(\d{2})/, "$1,$2");
    numeros = numeros.replace(/(\d+)(\d{3})(,\d{2})/, "$1.$2$3");
    numeros = numeros.replace(/(\d+)(\d{3})(\.\d{3},\d{2})/, "$1.$2$3");
    numeros = numeros.replace(/(\d+)(\d{3})(\.\d{3}\.\d{3},\d{2})/, "$1.$2$3");
    return numeros;
}

export default getRoles