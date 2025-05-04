// import mongoose from "mongoose";

// const appointmentSchema = new mongoose.Schema({
//   customerName: { type: String, required: true },
//   address: { type: String, required: true },
//   phone: { type: String, required: true },
//   vehicleNumber: { type: String, required: true },
//   vehicleType: { type: String, required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   status: {
//     type: String,
//     enum: ['Pending', 'Approved', 'Rejected'],
//     default: 'Pending'
//   }
// }, { timestamps: true });

// export default mongoose.model('Appointment', appointmentSchema);

import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const connection = mongoose.connection;
const AutoIncrement = AutoIncrementFactory(mongoose);

// Define schema
const appointmentSchema = new mongoose.Schema({
  serviceID: { type: Number }, // For auto-increment
  displayID: { type: String, unique: true }, // SS001 etc.
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  contact: {
    phone: { type: String, required: true, unique: true },
    email: { type: String }
  },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

// Apply auto-increment plugin
appointmentSchema.plugin(AutoIncrement, {
  inc_field: 'serviceID',
  id: 'appointment_service_seq', // sequence name
  start_seq: 1
});



export default mongoose.model('Appointment', appointmentSchema);
