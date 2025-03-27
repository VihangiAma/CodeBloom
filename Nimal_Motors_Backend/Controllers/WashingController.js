import WashingSection from "../Models/WashingSection.js";

// Create Booking
export function createBooking(req, res) {
  try {
    const newBooking = new WashingSection(req.body);
    newBooking.save();
    res.status(201).json({ message: "Booking Created", data: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Bookings
export function getAllBookings(req, res) {
  try {
    const bookings = WashingSection.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Booking Status
export function updateBooking(req, res){
  try {
    const { id } = req.params;
    const updatedBooking = WashingSection.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Booking Updated", data: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Booking
export function deleteBooking(req, res){
  try {
    const { id } = req.params;
    WashingSection.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
