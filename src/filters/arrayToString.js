// Return array as string with a , and space separator
export default (value) => {

    // Solo traduce si el arreglo no está vacío
    if (typeof value[0] !== 'undefined') {
        return value.join(", ") + ""
    }
    
}