export default asyncHandler = (requestHandler)=>{
    
    return (_, req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next))
            .catch((error)=>{
                next(error);
            })
    }
}