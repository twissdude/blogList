const jwt = require('jsonwebtoken');
const User = require('../Models/user');


const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    try{
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (decodedToken.id) {
      request.user = await User.findById(decodedToken.id);
    }

   } catch (error) {
    return response.status(401).json({ error: 'token invalid'});
   }
    
  } else {
    return response.status(401).json({error: 'token missing'});
  }
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
