const jwt = require("jsonwebtoken");

export function checktoken(req:any, res:any, next:any) {
  const authHeader = req.headers['authorization']   
  const token = authHeader && authHeader.split(' ')[1]
  try {
   
    jwt.verify(token, "secretKey");
    return next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
 
}

export function checktokens(req:any, res:any, next:any) {
  const authHeader = req.headers['authorization']   
  const token = authHeader && authHeader.split(' ')[1]
  try {
   
    jwt.verify(token, "secretKey");
    res.status(200).json({ message: " token correcto" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
 
}


