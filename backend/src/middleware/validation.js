const { validationResult } = require("express-validator")

const headerData=["body","params","query"]

const validationFunc=(schema)=>{
    return(req,res,next)=>{
        let errorList=[]
        headerData.forEach((key)=>{
            if (schema[key]){
                const validationResult=schema[key].validate(req[key]);
                if (validationResult.error){
                    errorsList.push(validationResult.error.details);
                }
            }
        })
        if(errorList.length){
            res.json({message:"error",errorsList});
        }
        else{
            next();
        }
    }
}


module.exports={validationFunc}