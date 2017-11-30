// Return string from Date
export default (value) => {
    const date = new Date(value)
    return date.toLocaleDateString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
}