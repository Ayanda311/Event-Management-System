
const requestLogger = (req, res, next) => {
  console.log("----- Incoming Request -----");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Time:", new Date().toLocaleString());
  console.log("----------------------------");

  next();
};

module.exports = requestLogger;
