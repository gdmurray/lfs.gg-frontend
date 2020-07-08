export const handleError = (error) => {
    if (error.hasOwnProperty("response")) {
        return error.response
    }
}
