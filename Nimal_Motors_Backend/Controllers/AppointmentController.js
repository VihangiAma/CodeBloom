
import Appointment from "../Models/Appointment.js";
import nodemailer from "nodemailer";


// const transporter = nodemailer.createTransport({
//   host: "smtp.example.com", // e.g. smtp.gmail.com
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "dulanjaneeanurudddhika123@gmail.com",
//     pass: "cdxp evpg xwoj xsep",
//   },
// });

const transporter = nodemailer.createTransport({
  host: "gmail", 
  auth: {
    user: "dulanjaneeanurudddhika123@gmail.com",
    pass: "cdxp evpg xwoj xsep",
  },
});



// // Test email sending route

//   const mailOptions = {
//     from: '"Motor Garage" <dulanjaneeanuruddhika123@.com>', // sender address
//     to:user.email,                      
//     subject: "Test Email from Motor Garage Backend",
//     text: "Hello! This is a test email to verify SMTP configuration.",
//   }
//  try {
//    // Send test email
//     await transporter.sendMail(mailOptions);
//     console.log("Test email sent successfully!");
//   } catch (error) {
//     console.error("Error sending test email:", error);
//     console.error("Failed to send test email. Please check your SMTP configuration.");

//   }

 

export const createAppointment = async (req, res) => {
  const { contact, vehicleNumber, serviceDate, time } = req.body;

  try {
    // Check if the same phone or vehicle number already has an appointment on the same date
    const existingDetails = await Appointment.findOne({
      serviceDate,
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

    // ✅ Correctly check date+time combination
    const slotTaken = await Appointment.findOne({ serviceDate, time });
    if (slotTaken) {
      return res.status(400).json({
        error: "This time slot is already booked. Please choose another time.",
      });
    }

    // Save appointment
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();

    // Generate displayID like SS001
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

// // Update an appointment by serviceID
// export const updateAppointment = async (req, res) => {
//   try {
//     const updatedAppointment = await Appointment.findOneAndUpdate(
//       { serviceID: Number(req.params.id) },
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedAppointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }
//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

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

    // Send email notification on status change
    if (req.body.status === "Approved" || req.body.status === "Rejected") {
      const mailOptions = {
        from: '"Motor Garage" <dulanjaneeanuruddhika123@.com>',
        to: updatedAppointment.contact.email, // customer email
        subject: `Your Appointment ${updatedAppointment.displayID} is ${req.body.status}`,
        text: `Dear ${updatedAppointment.customerName},

Your appointment scheduled on ${updatedAppointment.serviceDate.toDateString()} at ${updatedAppointment.time} for your vehicle (${updatedAppointment.vehicleNumber}) has been ${req.body.status.toLowerCase()}.

Thank you for choosing our service.

Best regards,
Motor Garage Team`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Notification email sent successfully");
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
      }
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


