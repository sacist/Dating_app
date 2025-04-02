const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const  refreshAccessToken  = require('./refresh-access-websocket');
const JWTKEY = process.env.JWT_KEY;

const socketAuthMiddleware = async (socket, next) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');

  let accessToken = cookies.accessToken;

  try {
    if (!accessToken) {
      const refreshedToken = await refreshAccessToken(socket);
      if (!refreshedToken) {
        return next(new Error('Authentication error: Token is missing'));
      }
      accessToken = refreshedToken;
    }

    const decoded = jwt.verify(accessToken, JWTKEY);
    socket.userId = decoded.user_id;
    socket.nickname = refreshedToken
    next();
  } catch (e) {
    const refreshedToken = await refreshAccessToken(socket);
    if (!refreshedToken) {
      return next(new Error('Authentication error: Invalid token'));
    }

    try {
      const decoded = jwt.verify(refreshedToken, JWTKEY);
      socket.userId = decoded.user_id;
      next();
    } catch (error) {
      console.log(error);
      
      return next(new Error('Authentication error: Token verification failed'));
    }
  }
};

module.exports = socketAuthMiddleware;