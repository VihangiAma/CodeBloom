// Models/CompletedTask.js
import mongoose from 'mongoose';

const completedTaskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  department: {
    type: String,
    enum: ['mechanical', 'bodyshop', 'electrical', 'appointment'],
    required: true,
  },
  serviceID: { type: Number, unique: true },
  displayID: { type: String, unique: true },
  customerName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  presentMeter: {
    type: Number,
    required: true,
    min: 0,
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});

const CompletedTask = mongoose.model('CompletedTask', completedTaskSchema, 'completedtasks');
export default CompletedTask;