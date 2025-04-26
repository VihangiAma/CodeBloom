// Middleware/middleware.js
const middleware = (req, res, next) => {
    console.log("Middleware is running...");
    next(); // Call the next middleware or route handler
};

export default middleware;
