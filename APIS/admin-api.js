const exp=require("express")
const Admin = require("../models/admin.js")
//const Product = require("../models/Products.js")
require("dotenv").config()
const adminapiObj=exp()
const bcrypt=require("bcrypt")
const errHandler=require("express-async-handler")
const jsonwebtoken=require("jsonwebtoken")

const userModel=require("../models/users.js")
adminapiObj.use(exp.json())
module.exports=adminapiObj
adminapiObj.post("/checkpasswordasync",errHandler(async (req,res)=>{
   let dobj=req.body
    let userFromDb= await Admin.findOne({"adminname":dobj.adminname})
    if(!userFromDb){
        res.send({message:"invalid Admin username"})
    }

    else if(!userFromDb || (dobj.password!=userFromDb.password))
    {
    res.send({message:"invalid credentials"})
    }
    else{
        
        let signedToken= await jsonwebtoken.sign({adminname:dobj.adminname},process.env.SECRET,{expiresIn:500})
        res.send({message:"login success",token:signedToken,username:dobj.adminname})
    }
}))
