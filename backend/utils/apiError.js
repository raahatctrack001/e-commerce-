class apiError extends Error{
    constructor(statusCode, message, errors = [], stack = ""){
        super(message);
        this.statusCode = statusCode || 500;
        this.message = message || "Internal Server Error";
        this.error = errors;
        this.success = false;
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default apiError;