module.exports = (object) => {
    const aux = JSON.stringify(object)
    const newObject = JSON.parse(aux)
    return newObject
}