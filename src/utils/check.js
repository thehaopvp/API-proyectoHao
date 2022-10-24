const jwt = require("jsonwebtoken");

export function checktoken(req, res, next) {
  const authHeader = req.headers['authorization']   
  const token = authHeader && authHeader.split(' ')[1]
  try {
   
    jwt.verify(token, "secretKey");
    return next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
 
}
