const exp = require("express");
const app = exp();
//assign port number
app.listen(5000, () => console.log("server listening on port 5000..."));

//connect react app
const path=require("path");

app.use(exp.static(path.join(__dirname,'./build')))

//Get mongo client
const mclient=require("mongodb").MongoClient;

//connect to MongoDB server
mclient.connect("mongodb://127.0.0.1:27017") //"mongodb://127.0.0.1"//mongodb://localhost/27017
.then((dbRef)=>{
  //get database obj
  let dbObj=dbRef.db("db3")
  
  const userCollection=dbObj.collection("userscollection")
  const productCollection=dbObj.collection("productscollection")

  //share collections objects to APIs
  app.set("userCollection",userCollection)
  app.set("productCollection",productCollection)

  console.log("Connected to DB successfully")
})
.catch(err=>console.log("database connection err is ",err))


const userApp = require("./Apis/usersApi")


const productApp = require("./Apis/productsApi");


//forward request to productApi when url path starts with /product-api
app.use("/user-api", userApp);
app.use("/product-api", productApp);

{/*}
//page refresh
app.use("/*",(request,response,next)=>{
response.sendFile(path.join(__dirname,'./build/index.html'),err=>{
  if(err){
    next(err)
  }
})
})

*/}
//create a middleware to handle invalid path
const invalidPathHandlingMiddleware = (request, response, next) => {
  response.send({ message: "Invalid path" });
};

app.use(invalidPathHandlingMiddleware);

//create err handling middleware
const errHandler = (error, request, response, next) => {
  response.send({ "error-message": error.message });
};
app.use(errHandler);
