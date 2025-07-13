// // Routers/history.js
// import express from 'express';
// import jwt from 'jsonwebtoken';
// import CompletedTask from '../Models/CompletedTask.js';
// import Users from '../Models/userModel.js';

// const router = express.Router();

// // JWT middleware for premium customers
// const authenticatePremium = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
//     const user = await Users.findOne({ userId: decoded.userId });

//     if (!user || user.type !== 'premiumCustomer') {
//       return res.status(403).json({ message: 'Access restricted to premium customers' });
//     }

//     req.user = {
//       userId: user.userId,
//       fullName: user.fullName.trim(), // Ensure consistent trimming
//       type: user.type,
//     };

//     next();
//   } catch (err) {
//     console.error('JWT Error:', err);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Fetch completed service history
// router.get('/completed', authenticatePremium, async (req, res) => {
//   try {
//     const fullName = req.user.fullName;
//     console.log('Authenticated user fullName:', fullName);

//     const history = await CompletedTask.find({
//       customerName: { $regex: new RegExp(fullName.split(' ').map(part => `(?=.*${part})`).join(''), 'i') }, // Match any part of name
//       status: 'Completed',
//     });

//     console.log('Query result:', history);
//     if (history.length === 0) {
//       console.log('No completed tasks found for:', fullName);
//       const tasksByUserId = await CompletedTask.find({ userId: req.user.userId, status: 'Completed' });
//       console.log('Tasks by userId:', tasksByUserId);
//     }
//     res.json(history);
//   } catch (err) {
//     console.error('Error fetching history:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Save completed task (called from post-save hooks in other files)
// const saveCompletedTask = async (doc, department) => {
//   if (doc.status !== 'Completed') {
//     console.log('Skipping non-completed task:', doc.displayID || doc._id);
//     return;
//   }

//   const lastTask = await CompletedTask.findOne().sort({ serviceID: -1 });
//   const nextServiceID = lastTask ? lastTask.serviceID + 1 : 1;
//   const displayID = doc.displayID || `${department.slice(0, 2).toUpperCase()}${String(nextServiceID).padStart(3, '0')}`;

//   const taskData = {
//     userId: doc.userId || 'UNKNOWN_USER',
//     department: department.toLowerCase(),
//     serviceID: nextServiceID,
//     displayID: displayID,
//     customerName: doc.customerName.trim(),
//     vehicleType: doc.vehicleType || 'Unknown',
//     vehicleNumber: doc.vehicleNumber || 'Unknown',
//     serviceDate: doc.serviceDate ? new Date(doc.serviceDate) : new Date(),
//     presentMeter: doc.presentMeter || 0,
//     contact: {
//       phone: doc.contact?.phone || 'No phone',
//       email: doc.contact?.email || '',
//     },
//     status: 'Completed',
//     createdAt: doc.createdAt || new Date(),
//   };

//   console.log('Attempting to save task data:', taskData);
//   try {
//     const saved = await CompletedTask.findOneAndUpdate(
//       { serviceID: taskData.serviceID, department: taskData.department },
//       taskData,
//       { upsert: true, new: true }
//     );
//     console.log('Completed task saved successfully:', saved.displayID);
//   } catch (err) {
//     console.error('Error saving completed task:', err.message, 'Data:', taskData);
//   }
// };

// // Export saveCompletedTask for use in other files' post-save hooks
// export { saveCompletedTask, authenticatePremium };


// export default router;
import express from "express";
import { verifyToken } from "../MiddleWare/auth.js";
import Appointment from "../Models/Appointment.js";
import ElectricalSection from "../Models/ElectricalSection.js";
import BodyShopSection from "../Models/BodyShopSection.js"
import MechanicalSection from "../Models/MechanicalSection.js";



const router = express.Router();

router.get("/mypremiumbookings", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;

    const mechanical = await MechanicalSection.find({ "contact.email": email });
    const electrical = await ElectricalSection.find({ "contact.email": email });
    const bodyshop = await BodyShopSection.find({ "contact.email": email });
    const appointments = await Appointment.find({ "contact.email": email });

    const allBookings = [
      ...mechanical.map((doc) => ({ type: "MechanicalSection", ...doc._doc })),
      ...electrical.map((doc) => ({ type: "ElectricalSection", ...doc._doc })),
      ...bodyshop.map((doc) => ({ type: "BodyshopSection", ...doc._doc })),
      ...appointments.map((doc) => ({ type: "AppointmentSection", ...doc._doc })),
    ];

    res.status(200).json(allBookings);
  } catch (err) {
    console.error("Fetch failed", err);
    res.status(500).json({ message: "Failed to fetch premium booking data." });
  }
});

export default router;
