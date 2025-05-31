const jwt = require('jsonwebtoken');
const protect = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth && auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = protect;
