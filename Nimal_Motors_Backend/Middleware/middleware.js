// Middleware/middleware.js

function middleware(req, res, next) {
    console.log(`Request made to: ${req.url}`);
    next(); // Proceed to the next middleware or route handler
  }
  
  export default middleware; // Export the middleware function
  