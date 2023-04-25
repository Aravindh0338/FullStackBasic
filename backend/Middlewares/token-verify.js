const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]?req.headers["authorization"]:req.body.headers["authorization"];
  if (bearerHeader) {
    const bearerToken = bearerHeader && bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, "Aravindh12345", (err, decode) => {
      if (err) {
        return res.status(403).send({
          message: "Token is Expired",
        });
      }
      console.log("token",decode)
      req.token = decode;
      next();
    });
  } else {  
    return res.status(401).send({
      message: "Unauthorized user",
    });
  }
};
