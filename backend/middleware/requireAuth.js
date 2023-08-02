const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //Middleware mostly have the next property as they are the middleware, so they come in between
  //of something to check or execute a function
  //So it has to pass the value to the next step by using "next"

  //When we send the request from the frontend for the api/workouts
  //We have to attach the token of user in the headers
  //here it will check the availibility and validity of the token and then only
  //let the user to access the endpoint
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  //If the token is present in the authorization headers
  //it would be in the form of
  // "Bearer esdfcenrrf123123.23143n4kdskcmd.239432mdf23ewd"
  // So basically Bearer and then a token
  //As we need only token so we will use the split method to get the token only

  const token = authorization.split(" ")[1];

  try {
    //This jwt method will give us a payload which we have passed with the token
    const { _id } = jwt.verify(token, process.env.SECRET);

    //If the id is successfullly extracted then we will create a new field in req object called user
    //and attach the id property to it
    // so the when this middleware passes to the next step
    // req object will have a propery called user which will have the users id

    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
