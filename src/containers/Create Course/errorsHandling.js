export function errorsHandle(errorsOBJ) {
    
    function titleError(state) {
        let newErrorsOBJ = {
            ...errorsOBJ,
            title : [state]
        }    
        return newErrorsOBJ;
    }
    
    return {
        titleError : titleError
    }
}