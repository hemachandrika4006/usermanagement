//create mini-express(Separate Router) app
const exp = require("express");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken")
const bcryptjs = require("bcryptjs");
const verifytoken=require("./middleware/verifytoken")



userApp.use(exp.json());

userApp.get("/get-users",expressAsyncHandler(async (request, response) => {

  const userCollection = request.app.get("userCollection");

 let users=await userCollection .find().toArray()
 response.status(200).send({message:"user",payload:users})
}));




/*get user by id
userApp.get("/get-user/:id", expressAsyncHandler(async (request, response) => {

    const userCollection = request.app.get("userCollection");

    //get ID from url
    let userId=(+request.params.id)

    let users= await userCollection.findOne({id:userId})
   
      response.status(200).send({message:"user",payload:users})
    
}));
*/

//get user by username

userApp.get("/get-user/:username", expressAsyncHandler(async (request, response) => {

  const userCollection = request.app.get("userCollection");

  //get ID from url
  let userId=(request.params.username)

  const users= await userCollection.findOne({username:userId})
  if(users==null){
    response.status(200).send({message:"user not found"})
  }
  else{
    delete users.password;
    response.status(200).send({message:"user",payload:users})
  }
}));




//create user
userApp.post(
  "/register",
  expressAsyncHandler(async (request, response) => {
    //get userCollectionObj
    const userCollectionObj = request.app.get("userCollection");

    //get newUser from request
    const newuser = request.body;
        //console.log(newuser)
    //check for duplicate user by username
    let  userOfDB = await userCollectionObj.findOne({
      username: newuser.username
    });
    //if user already existed, send res to clint as "User already existed"
    if (userOfDB != null) {
      response.status(200).send({ message: "user already existed" });
    }
    //if user not existed
    else {
      //hash the password and select range from 1 to 10 it hashes those many times
      let hashedPassword = await bcryptjs.hash(newuser.password, 5);

      //replace plain pass with hashed password
      newuser.password = hashedPassword;
      //insert user
      await userCollectionObj.insertOne(newuser);
      //send res
      response.status(201).send({ message: "user created" });
    }
  })
);

//update user
userApp.put("/update-user", expressAsyncHandler(async (request, response) => {

     //get userCollection
    const userCollection = request.app.get("userCollection");
    //get modifieduser from req
    let modifieduser=request.body;

   let dbRes= await userCollection.updateOne({id:modifieduser.id},{$set:{...modifieduser}})
    
      response.status(200).send({message:"user modified"})
    
}));







/*delete user by id

userApp.delete("/delete-user/:id",expressAsyncHandler( async (request, response) => {

    //get userCollection
    const userCollection = request.app.get("userCollection");
    //get id from url
    let userId=(+request.params.id)
    let dbRes=await userCollection.deleteOne({id:userId});
    response.status(200).send({message:"user removed"});


}));*/






// delete user by username
userApp.delete("/delete-user/:username",expressAsyncHandler( async (request, response) => {

  //get userCollection
  const userCollection = request.app.get("userCollection");
  //get user from url
  let usernamefromUrl=request.params.username;
  const dbRes=await userCollection.deleteOne({username:usernamefromUrl});
    response.status(200).send({message:"user removed"});


}));





//user login

userApp.post("/login",expressAsyncHandler( async (request, response)=>{
    //get userCollection
   
    const userCollectionObj = request.app.get("userCollection");
    //get modifieduser from req
    let usercredobj=request.body;
    // verify username
    let userOfDB=await userCollectionObj.findOne({username:usercredobj.username});
  // if username is invalid
    if (userOfDB=== null) {
      response.status(200).send({ message: "invalid username" });
    }
//if username is valid
    else{
      //verify password
      let isequal=await bcryptjs.compare(usercredobj.password,userOfDB.password);
      //if password doesnot match
      if(isequal===false){
        response.status(200).send({message:"invalid password"})
      }
      else{
        // if passwords  matched
//creating token and sending message,token to save,and user details to kbow which user is using

        let jwtoken=jwt.sign({username:userOfDB.username},'abcdef',{expiresIn:50});

        // not sending password 
        delete userOfDB.password
        response.status(200).send({message:"success",token:jwtoken,user:userOfDB})
      }
    }
    
}))

userApp.get("/test",verifytoken,(request,response)=>{
  response.send({message:"reply from private route"})
})




//export express app
module.exports = userApp;