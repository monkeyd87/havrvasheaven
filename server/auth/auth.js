const jwt = require('jsonwebtoken')

const secretKey = 'super-secret'


 function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
      
        if (token == null) {
          return res.status(401).json({message:'unauthorized'}); // Unauthorized
        }
      
        jwt.verify(token, secretKey, (err, user) => {
          if (err) {
          
            return res.status(403).json({message:'forbiddent'}); // Forbidden
          }
          console.log(user)
          req.user = user;
          next();
        });
      }

      module.exports = authenticateToken
