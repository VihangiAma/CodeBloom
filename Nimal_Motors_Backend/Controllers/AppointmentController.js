
import Appointment from "../Models/Appointment.js";

export const createAppointment = async (req, res) => {
  const { contact, vehicleNumber, date, time } = req.body;

  try {
    // Check if the same phone or vehicle number already has an appointment on the same date
    const existingDetails = await Appointment.findOne({
      date,
      $or: [
        { "contact.phone": contact.phone },
        { vehicleNumber: vehicleNumber },
      ],
    });

    if (existingDetails) {
      return res.status(400).json({
        error: "This phone number or vehicle is already registered for the selected date.",
      });
    }

    // Check if the selected time slot on the date is already booked
    const slotTaken = await Appointment.findOne({ date, time });
    if (slotTaken) {
      return res.status(400).json({
        error: "This time slot is already booked. Please choose another time.",
      });
    }

    // Proceed to save the appointment
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();

    // Generate displayID like "SS001"
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


