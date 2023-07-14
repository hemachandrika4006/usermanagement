
const jwt=require("jsonwebtoken")
const verifytoken=(request,response,next)=>{
const bearertoken=request.headers.authorization;
if(bearertoken==undefined){
    response.send({message:"unauthorized plz login"});

}
else{
    const token=bearertoken.split(" ")[1]
    try{
        jwt.verify(token,"abcdef")
        next();
    }
    catch(err){
        next(new Error("session expired"));
    }
}
}
module.exports=verifytoken;