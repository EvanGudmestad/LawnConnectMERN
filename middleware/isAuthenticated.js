import {auth} from '../auth.js';


export async function isAuthenticated(req,res,next){
  try{
    console.log("Checking authentication middleware");
    const session = await auth.api.getSession({headers: req.headers});
    console.log(`Session: ${JSON.stringify(session)}`);
    if(!session){
      return res.status(401).json({
        error:"Unauthorized",
        message:"You must be logged in to access this resource"
      })
    }

    req.user = session.user;
    req.session = session.session;
    next();
  }catch(err){
   return res.status(401).json({
    error:"Unauthorized",
    message:"Invalid or expired session"
   })
  }
}