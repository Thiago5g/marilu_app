export const cloneObject = (object) => {
    const aux = JSON.stringify(object)
    const newObject = JSON.parse(aux)
    return newObject
}