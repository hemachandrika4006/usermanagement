//create mini-express(Separate Router) app
const exp = require("express");
const productApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");

const bryptjs = require("bcryptjs");

productApp.use(exp.json());

productApp.get("/get-products",expressAsyncHandler(async (request, response) => {

  const productCollection = request.app.get("productCollection");

 let products=await productCollection .find().toArray()
 response.status(200).send({message:"product",payload:products})
}));




//get user by id
productApp.get("/get-product/:id", expressAsyncHandler(async (request, response) => {

    const productCollection = request.app.get("productCollection");

    //get ID from url
    let productId=(+request.params.id)

    let products= await productCollection.findOne({id:productId})
   
      response.status(200).send({message:"product",payload:products})
    
}));







//create user
productApp.post(
  "/product-signup",
  expressAsyncHandler(async (request, response) => {
    //get userCollectionObj
    const productCollectionObj = request.app.get("productCollection");

    //get newUser from request
    const newproduct = request.body;

    //check for duplicate user by username
    let productOfDB = await productCollectionObj.findOne({
      username: newproduct.username,
    });
    //if user already existed, send res to clint as "User already existed"
    if (productOfDB != null) {
      response.status(200).send({ message: "product already existed" });
    }
    //if user not existed
    else {
      //hash the password
      let hashedPassword = await bryptjs.hash(newproduct.password, 5);

      //replace plain pass with hashed password
      newproduct.password = hashedPassword;
      //insert user
      await productCollectionObj.insertOne(newproduct);
      //send res
      response.status(201).send({ message: "product created" });
    }
  })
);

//update product
productApp.put("/update-product", expressAsyncHandler(async (request, response) => {

     //get productCollection
    const productCollection = request.app.get("productCollection");
    //get modifiedproduct from req
    let modifiedproduct=request.body;

   let dbRes= await productCollection.updateOne({id:modifiedproduct.id},{$set:{...modifiedproduct}})
    
      response.status(200).send({message:"product modified"})
    
}));







/*delete product by id
productApp.delete("/delete-product/:id",expressAsyncHandler( async (request, response) => {

    //get userCollection
    const productCollection = request.app.get("productCollection");
    //get id from url
    let productId=(+request.params.id)
    let dbRes=await productCollection.deleteOne({id:productId});
    response.status(200).send({message:"product removed"});


}));
*/

productApp.delete("/delete-product/:username",expressAsyncHandler( async (request, response) => {

  //get userCollection
  const productCollection = request.app.get("productCollection");
  //get id from url
  let productId=(request.params.username)
  let dbRes=await productCollection.deleteOne({username:productId});
  response.status(200).send({message:"product removed"});


}));

//export express app
module.exports = productApp;