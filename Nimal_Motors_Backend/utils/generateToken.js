// // utils/generateToken.js
// import jwt from 'jsonwebtoken';

// const generateToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//       type: user.role, // or user.type
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: '1h',
//     }
//   );
// };

// export default generateToken;
