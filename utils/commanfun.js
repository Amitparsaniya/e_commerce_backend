

export const success = (res,msg,statusCode=200,data)=>{
    let result ={}

    if(msg){
        result.message = msg
        result.statusCode = statusCode
    }

    if(data){
        result.data=data
    }

    return res.status(statusCode).json(result)

}

export const failure  = (res,msg,statusCode=400,data)=>{
    let result ={}

    if(msg){
        result.message = msg
        result.statusCode =statusCode
    }

    if(data){
        result.data = data
    }

    return res.status(statusCode).json(result)
}