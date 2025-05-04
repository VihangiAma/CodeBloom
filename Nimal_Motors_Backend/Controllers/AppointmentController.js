// import Appointment from "../Models/Appointment.js";

// // Create appointment
// export async function createAppointment(req, res) {
//   try {
//     const { date, time } = req.body;

//     // Check if there's already a booking at the same date and time
//     const existingAppointment = await Appointment.findOne({ date, time });
//     if (existingAppointment) {
//       return res.status(400).json({ error: "This time slot is already booked. Please choose another." });
//     }

//     // If no existing appointment, proceed to save
//     const appointment = new Appointment(req.body);
//     await appointment.save();
//     res.status(201).json(appointment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

// // Get all appointments
// export async function getAppointments(req, res) {
//   try {
//     const appointments = await Appointment.find();
//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Update appointment status (Approve or Reject)
// export async function updateAppointment(req, res) {
//   try {
//     const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(appointment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

// // Delete appointment
// export async function deleteAppointment(req, res) {
//   try {
//     await Appointment.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Appointment deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


import Appointment from "../Models/Appointment.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();

    // Generate displayID like "SS001" after serviceID is set
    savedAppointment.displayID = `SS${String(savedAppointment.serviceID).padStart(3, "0")}`;
    await savedAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single appointment by MongoDB _id
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an appointment by serviceID
export const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { serviceID: Number(req.params.id) },
      { $set: req.body },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an appointment by serviceID
export const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findOneAndDelete({
      serviceID: Number(req.params.id)
    });
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
