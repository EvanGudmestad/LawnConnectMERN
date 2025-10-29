import { ObjectId } from "mongodb";

const validId = (paramName) => {
 
  return (req,res,next) => {
    try{
      console.log(`value of paramName is ${paramName}`);
    req[paramName] = new ObjectId(req.params[paramName]);  //req.id 
    return next();
    }catch(err){
      return res.status(400).json({error:`${paramName} is not a valid ObjectId`});
  }
}
}

export { validId }